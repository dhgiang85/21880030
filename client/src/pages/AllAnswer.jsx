import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SmallAnswer from "../components/SmallAnswer";
import {
  DELETE_ANSWER_API,
  GET_ALL_USER_ANSWER_API,
} from "../features/answer/answerApiSlice";
import { setIntial } from "../features/loader/loaderSlice";
import Spinner from "../components/Spinner";

const AllAnswer = () => {
  const dispatch = useDispatch();

  const { message, isError, isSuccess,isLoading } = useSelector((state) => state.loader);
  const { answers, count, numberOfPages } = useSelector(
    (state) => state.answer
  );
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };
  const deleteAnswer = (id) => {
    if (window.confirm("Are you sure you want to delete this Answer?")) {
      dispatch({
        type: DELETE_ANSWER_API,
        payload: { id: id },
      });
    }
  };
  const fetchAnswers = () => {
    dispatch({
      type: GET_ALL_USER_ANSWER_API,
      payload: {
        pageNumber: currentPage,
        pageSize: 10,
        search: "",
      },
    });
  };

  useEffect(() => {
    fetchAnswers();
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (message === "Delete answer successfully") {
      fetchAnswers(); // Refresh questions after deleting
      dispatch(setIntial());
    }
  }, [message]);
  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      dispatch(setIntial());
    }
  }, [isSuccess, message, dispatch]);
  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(setIntial());
    }
  }, [isError, message, dispatch]);
  
  return (
    <div className="h-full flex-grow">
      <div className="border rounded-md max-w-3xl mx-auto min-h-[250px] relative">
        <div className="p-3 border-b flex items-center justify-between">
          <div>
            <h2>All Answers</h2>
            <p className="text-neutral-500">{count} items</p>
          </div>
   
            <div className="pagination justify-center ">
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
 
        </div>
        {isLoading && <Spinner />}
        {!isLoading &&
          answers.length > 0 &&
          answers.map((answer) => (
            <div className="border-b flex" key={answer._id}>
              <SmallAnswer answer={answer} question={answer?.question} />
              
              {!answer?.isAccepted && (
                <div className="w-24 shrink-0 flex items-center border-l p-4 justify-between">
                  <Link
                    to={`/answer/edit/${answer._id}`}
                    className="hover:text-primary transition-colors"
                  >
                    <i className="fa-solid fa-pen-to-square fa-xl"></i>
                  </Link>
                  <i
                    className="fa-solid fa-trash-can fa-xl hover:text-primary transition-colors cursor-pointer"
                    onClick={() => deleteAnswer(answer._id)}
                  ></i>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllAnswer;
