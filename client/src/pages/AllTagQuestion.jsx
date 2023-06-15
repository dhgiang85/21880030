import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Question from "../components/Question";
import Spinner from "../components/Spinner";
import { setIntial } from "../features/loader/loaderSlice";
import { GET_ALL_TAG_QUESTION_API } from "../features/question/questionApiSlice";
import { GET_TAG } from "../features/tag/tagApiSlice";

const AllTagQuestion = () => {
  const dispatch = useDispatch();
  const { tagId } = useParams();

  const { message, isError, isLoading, isSuccess } = useSelector(
    (state) => state.loader
  );
  const { questions, count, numberOfPages } = useSelector(
    (state) => state.question
  );
  const { tag } = useSelector((state) => state.tag);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(tag);
  useEffect(() => {
    dispatch({
      type: GET_ALL_TAG_QUESTION_API,
      payload: {
        id: tagId,
        pageNumber: currentPage,
        pageSize: 10,
        search: "",
      },
    });
  }, [dispatch, currentPage, tagId]);
  useEffect(() => {
    dispatch({
      type: GET_TAG,
      payload: { id: tagId },
    });
  }, [dispatch, tagId]);
  useEffect(() => {
    if (isSuccess) {
      if (message) {
        toast.success(message);
      }
      dispatch(setIntial());
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(setIntial());
    }
  }, [isError, message, dispatch]);
  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };
  return (
    <div className="h-full flex-grow relative flex flex-col">
      <div className="p-4 border-b max-w-4xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2>All Questions: {tag?.name}</h2>
            <p className="text-neutral-700 mt-2">{count} questions</p>
          </div>
          <Link to="/question/add" className="btn-primary text-sm shrink-0">
            Ask Question
          </Link>
        </div>

        {/* <div className="flex items-center justify-between ">
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
        </div> */}
      </div>

      {/* Question list */}
      <div className="flex-grow">
        {isLoading && <Spinner />}
        {!isLoading &&
          questions.length > 0 &&
          questions.map((question) => (
            <Question key={question._id} question={question} />
          ))}
      </div>
      <div className="w-full max-w-4xl">
        <div className="pagination justify-center py-3 ">
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
    </div>
  );
};

export default AllTagQuestion;
