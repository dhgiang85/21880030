import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { setIntial } from "../features/loader/loaderSlice";
import {
  DELETE_QUESTION_API,
  GET_ALL_USER_QUESTION_API,
} from "../features/question/questionApiSlice";
import SmallQuestion from "../components/SmallQuestion";
import { Link } from "react-router-dom";

const YourQuestion = () => {
  const dispatch = useDispatch();

  const { message, isError, isSuccess } = useSelector((state) => state.loader);
  const { questions, count, numberOfPages } = useSelector(
    (state) => state.question
  );
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };
  const deleteQuestion = (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      dispatch({
        type: DELETE_QUESTION_API,
        payload: { id: questionId },
      });
    }
  };
  const fetchQuestions = () => {
    dispatch({
      type: GET_ALL_USER_QUESTION_API,
      payload: {
        pageNumber: currentPage,
        pageSize: 10,
        search: "",
      },
    });
  };

  useEffect(() => {
    fetchQuestions();
    dispatch(setIntial());
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (message === "Delete question successfully") {
      fetchQuestions(); // Refresh questions after deleting
    }
    dispatch(setIntial());
  }, [message]);
  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      dispatch(setIntial());
    }
    return () => {
      dispatch(setIntial());
    };
  }, [isSuccess, message, dispatch]);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(setIntial());
  }, [isError, message, dispatch]);
  return (
    <div className="h-full flex-grow">
      <div className="border rounded-md max-w-3xl mx-auto">
        <div className="p-3 border-b flex items-center justify-between">
          <div>
            <h2>All Questions</h2>
            <p className="text-neutral-500">{count} items</p>
          </div>
          {count > 0 && (
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
          )}
        </div>
        {questions &&
          questions.length > 0 &&
          questions.map((question) => (
            <div className="border-b flex" key={question._id}>
              <SmallQuestion question={question} />
              <div className="w-24 shrink-0 flex items-center border-l p-4 justify-between">
                <Link
                  to={`/question/edit/${question._id}`}
                  className="hover:text-primary transition-colors"
                >
                  <i className="fa-solid fa-pen-to-square fa-xl"></i>
                </Link>
                <i
                  className="fa-solid fa-trash-can fa-xl hover:text-primary transition-colors cursor-pointer"
                  onClick={() => deleteQuestion(question._id)}
                ></i>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default YourQuestion;
