import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SmallQuestion from "../components/SmallQuestion";
import { setIntial } from "../features/loader/loaderSlice";
import {
  GET_ALL_MARKED_QUESTION_API,
  UNMARK_QUESTION_API,
} from "../features/question/questionApiSlice";
import Spinner from "../components/Spinner";

const AllSave = () => {
  const dispatch = useDispatch();

  const { message, isError, isSuccess, isLoading } = useSelector(
    (state) => state.loader
  );
  const { questions, count, numberOfPages } = useSelector(
    (state) => state.question
  );
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };
  const removeQuestion = (questionId) => {
    if (window.confirm("Are you sure you want to unmark this question?")) {
      dispatch({
        type: UNMARK_QUESTION_API,
        payload: { id: questionId },
      });
    }
  };
  const fetchQuestions = () => {
    dispatch({
      type: GET_ALL_MARKED_QUESTION_API,
      payload: {
        pageNumber: currentPage,
        pageSize: 10,
        search: "",
      },
    });
  };

  useEffect(() => {
    fetchQuestions();
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (message === "Unmarked question successfully") {
      fetchQuestions();
      dispatch(setIntial());
    }
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
      dispatch(setIntial());
    }
  }, [isError, message, dispatch]);
  return (
    <div className="h-full flex-grow">
      <div className="border rounded-md max-w-3xl mx-auto min-h-[250px] relative">
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
        {isLoading && <Spinner />}
        {questions &&
          questions.length > 0 &&
          questions.map((question) => (
            <div className="border-b flex" key={question._id}>
              <SmallQuestion question={question} hsAuthor={true} />
              <div className="w-14 shrink-0 flex items-center border-l p-4 justify-between">
                <i
                  className="fa-solid fa-folder-minus fa-xl hover:text-primary transition-colors cursor-pointer"
                  onClick={() => removeQuestion(question._id)}
                ></i>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllSave;
