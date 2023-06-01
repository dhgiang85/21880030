import React, { useEffect } from "react";
import useTitle from "../../hooks/useTitle";
import { useDispatch, useSelector } from "react-redux";
import { ROLES } from "../../constants";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import Spinner from "../../styles/Spinner";
import {
  GET_ALL_USER_API,
  SET_ACTIVE_API,
  SET_ROLE_API,
  DELETE_USER_API,
} from "./userApiSlice";
const UserListPage = () => {
  useTitle("User List | eVoucher");
  const dispatch = useDispatch();
  const { message, isLoading, isSuccess, isError } = useSelector(
    (state) => state.loader
  );
  const { users, count, numberOfPages } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const changeActiveUser = (id, active) => {
    dispatch({
      type: SET_ACTIVE_API,
      payload: {
        id,
        active,
      },
    });
  };
  const changeRoleUser = (id, role) => {
    dispatch({
      type: SET_ROLE_API,
      payload: {
        id,
        role,
      },
    });
  };
  const deleteUser = (id) => {
    dispatch({
      type: DELETE_USER_API,
      payload: id,
    });
  };
  useEffect(() => {
    if (currentPage > numberOfPages) setCurrentPage(currentPage - 1);
    dispatch({
      type: GET_ALL_USER_API,
      payload: {
        pageSize: 10,
        pageNumber: currentPage,
        search: debouncedSearchTerm,
      },
    });
  }, [currentPage, debouncedSearchTerm, numberOfPages, count, dispatch]);
  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };

  return (
    <div className="flex flex-col grow">
      <div className="flex items-center justify-between mb-4 my-2 ">
        <h2>Danh sách người dùng</h2>
        {/* search input  */}
        <div className="relative">
          <input
            type="text"
            className="pl-2 pr-6 py-1 rounded-md border shadow-md border-secondary outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
            placeholder="Tìm kiếm"
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <span className="absolute right-0 top-1/2 -translate-y-1/2 mr-2 text-gray-400">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
        </div>
      </div>
      <div className="shadow-md rounded-lg overflow-hidden relative grow">
        <table className="data-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Active</th>
              <th>---</th>
            </tr>
          </thead>

          <tbody>
            {users &&
              !isLoading &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>{user.fullname}</td>
                  <td>
                    <select
                      defaultValue={user.role}
                      className="py-2 px-3 pr-2 block w-full rounded-md text-sm  outline-none focus:ring-2"
                      onChange={(e) => {
                        changeRoleUser(user._id, e.target.value);
                      }}
                    >
                      {Object.values(ROLES).map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-secondary bg-gray-100 border-gray-300 rounded"
                      defaultChecked={user.active ? true : false}
                      onChange={(e) => {
                        changeActiveUser(user._id, e.target.checked);
                      }}
                    ></input>
                  </td>
                  <td>
                    <span
                      className="text-red-500 cursor-pointer"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Bạn có muốn xóa người dùng này không?"
                          )
                        ) {
                          deleteUser(user._id);
                          dispatch({
                            type: GET_ALL_USER_API,
                            payload: {
                              pageSize: 10,
                              pageNumber: currentPage,
                              search: debouncedSearchTerm,
                            },
                          });
                        }
                      }}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {isLoading && (
          <div className="flex items-center justify-center py-12 w-full">
            <Spinner />
          </div>
        )}
        {count && (
          <div className="pagination justify-end p-2 ">
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={(e) => {
                handlePageClick(e);
              }}
              pageRangeDisplayed={2}
              pageCount={numberOfPages}
              previousLabel="<"
              renderOnZeroPageCount={null}
              activeLinkClassName="active-page"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserListPage;
