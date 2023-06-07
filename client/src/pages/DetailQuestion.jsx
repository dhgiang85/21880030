import React, { useEffect } from "react";
import useTitle from "../hooks/useTitle";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setIntial } from "../features/loader/loaderSlice";
import {
  GET_QUESTION_API,
  VOTE_QUESTION_API,
  MARK_QUESTION_API,
} from "../features/question/questionApiSlice";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const DetailQuestion = () => {
  useTitle("Detail | Question");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { question } = useSelector((state) => state.question);
  const { message, isLoading, isSuccess, isError } = useSelector(
    (state) => state.loader
  );
  const {
    owner,
    createdAt,
    updatedAt,
    title,
    viewNumber,
    content,
    voteUp,
    voteDown,
    _id,
  } = question;

  useEffect(() => {
    dispatch({
      type: GET_QUESTION_API,
      payload: { id },
    });
  }, [dispatch, id]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(setIntial());
  }, [isError, message, dispatch]);

  const handleVote = ({ id, vote }) => {
    dispatch({
      type: VOTE_QUESTION_API,
      payload: { id, type: vote },
    });
  };
  const handleMark = (id) => {
    dispatch({
      type: MARK_QUESTION_API,
      payload: { id },
    });
  };
  return (
    <>
      {content && (
        <div className="h-full flex-grow">
          <div className="p-4 mb-2 border-b max-w-4xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl">{title}</h3>
              <Link to="/question/add" className="btn-primary text-sm">
                Ask Question
              </Link>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center justify-center text-neutral-400 space-x-3">
                <p>
                  Ask at
                  <span className="text-neutral-700 ml-2">
                    {new Date(createdAt).toLocaleDateString()}
                  </span>
                </p>
                <p>
                  Modified at
                  <span className="text-neutral-700 ml-2">
                    {new Date(updatedAt).toLocaleDateString()}
                  </span>
                </p>
                <p>
                  Viewed
                  <span className="text-neutral-700 mx-2">{viewNumber}</span>
                  times
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Link
                  to={`/profile/${owner?._id}`}
                  className="flex items-center space-x-2 text-sm text-primary hover:text-neutral-800 transition-all duration-500"
                >
                  <img
                    src={
                      owner?.avatar ||
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    }
                    alt="avatar"
                    className="object-cover w-6 h-6 rounded-full mr-2"
                  />
                  {owner?.username}
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-start p-4 max-w-4xl">
            <div className="w-16 shrink-0 space-y-4 flex flex-col items-center">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full border pt-2 hover:bg-orange-200 cursor-pointer"
                onClick={() =>
                  handleVote({
                    id: _id,
                    vote: "up",
                  })
                }
              >
                <i className="fa-solid fa-sort-up fa-xl"></i>
              </div>
              <p className="text-center text-lg">
                {voteUp.length - voteDown.length}
              </p>
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full border pb-2 hover:bg-orange-200 cursor-pointer"
                onClick={() =>
                  handleVote({
                    id: _id,
                    vote: "down",
                  })
                }
              >
                <i className="fa-solid fa-sort-down fa-xl"></i>
              </div>
              <div
                className="text-neutral-400 cursor-pointer"
                onClick={() => handleMark(_id)}
              >
                <i className="fa-regular fa-bookmark"></i>
              </div>
            </div>
            <div className="flex-grow">
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
            </div>
          </div>

          <div className="p-4 mb-2 border-t max-w-4xl space-y-3">
            <p className="font-semibold">Your Answer</p>
            <CKEditor
              editor={ClassicEditor}
              data={""}
              name="content"
              onReady={(editor) => {
                editor.ui.view.editable.element.style.height = "300px";
              }}
              // onBlur={() => {
              //   setFieldTouched("content", true, {
              //     shouldValidate: true,
              //   });
              // }}
              // onChange={(event, editor) => {
              //   const data = editor.getData();
              //   setFieldValue("content", data);
              // }}
            />
            <button className="btn-primary">Post Your Answer</button>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailQuestion;
