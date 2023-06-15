import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_TAG } from "../features/tag/tagApiSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setIntial } from "../features/loader/loaderSlice";
import ReactPaginate from "react-paginate";
import Spinner from "../components/Spinner";
import { setLoading } from "../features/loader/loaderSlice";
import { clearTags } from "../features/tag/tagSlice";
export const AllTag = () => {
  const { message, isLoading, isSuccess, isError } = useSelector(
    (state) => state.loader
  );
  const { tags, count, numberOfPages } = useSelector((state) => state.tag);

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const fecthData = () => {
    dispatch({
      type: GET_ALL_TAG,
      payload: { pageNumber: currentPage, pageSize: 9, search: "" },
    });
  };

  useEffect(() => {
    fecthData();
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (isError) {
      if (message) {
        toast.error(message);
      }
      dispatch(setIntial());
    }
  }, [isError, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      if (message) {
        toast.success(message);
      }
      dispatch(setIntial());
    }
  }, [isSuccess, dispatch]);

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };
  return (
    <div className="h-full flex-grow relative flex flex-col justify-between">
      <div className="p-4 max-w-4xl">
        <h2 className="mb-3">Tags</h2>
        <p className="text-sm line-clamp-4 mb-4">
          A tag is a keyword or label that categorizes your question with
          other,similar questions. Using the right tags makes it easier for
          others to find and answer your question.
        </p>
        <div className="">
          {isLoading && <Spinner />}
          {!isLoading && tags.length > 0 && (
            <div className=" grid grid-cols-3 gap-5 pb-2">
              {tags.map((tag) => (
                <div
                  className="p-2 border rounded h-[150px] shadow-md"
                  key={tag._id}
                >
                  <Link
                    to={`../question/tag/${tag._id}`}
                    className="px-2 py-1 bg-neutral-200 rounded-sm text-primary text-sm hover:bg-neutral-600 hover:text-white transition-all duration-500 inline-block mb-4"
                  >
                    {tag.name}
                  </Link>
                  <p className="text-sm line-clamp-4 text-neutral-500">
                    {tag.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-full max-w-4xl ">
        {count > 0 && (
          <div className="pagination justify-center py-3 border-t">
            <ReactPaginate
              breakLabel=".."
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
