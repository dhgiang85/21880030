import React, { useEffect, useState } from "react";
import Question from "../components/Question";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIntial } from "../features/loader/loaderSlice";
import { toast } from "react-toastify";
import { GET_ALL_QUESTION_API } from "../features/question/questionApiSlice";
import ReactPaginate from "react-paginate";
import useDebounce from "../hooks/useDebounce";

const AllQuestion = ({ searchTerm }) => {
  const dispatch = useDispatch();

  const { message, isError, isLoading } = useSelector((state) => state.loader);
  const { questions, count, numberOfPages } = useSelector(
    (state) => state.question
  );
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  useEffect(() => {
    dispatch({
      type: GET_ALL_QUESTION_API,
      payload: {
        pageNumber: currentPage,
        pageSize: 10,
        search: debouncedSearchTerm,
      },
    });
  }, [dispatch, currentPage, debouncedSearchTerm]);
  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(setIntial());
  }, [isError, message, dispatch]);
  return (
    <div className="h-full flex-grow">
      <div className="p-4 border-b max-w-4xl">
        <div className="flex items-center justify-between mb-4">
          <h2>All Questions</h2>
          <Link to="/question/add" className="btn-primary text-sm shrink-0">
            Ask Question
          </Link>
        </div>

        <div className="flex items-center justify-between ">
          <p>{count} questions</p>
          <div className="inline-flex" role="group">
            <button type="button" className="btn-filter">
              Newest
            </button>
            <button type="button" className="-ml-0.5 btn-filter">
              Middle
            </button>
            <button type="button" className="-ml-0.5 btn-filter">
              Right
            </button>
          </div>
        </div>
      </div>

      {/* Question list */}
      {!isLoading &&
        questions.length > 0 &&
        questions.map((question) => (
          <Question key={question._id} question={question} />
        ))}
      {!isLoading && (
        <div className="w-full mt-4">
          {count > 0 && (
            <div className="pagination justify-center pb-2">
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
      )}
    </div>
  );
};

export default AllQuestion;
