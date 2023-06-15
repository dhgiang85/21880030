import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { setIntial } from "../features/loader/loaderSlice";
import useTitle from "../hooks/useTitle";
import { Field, Formik, useFormikContext } from "formik";
import moment from "moment";
import Answer from "../components/Answer";
import QuillField from "../components/QuillField";
import Spinner from "../components/Spinner";
import { GET_ALL_ANSWER_OFQUESTION_API } from "../features/answer/answerApiSlice";
import {
  ANSWER_QUESTION_API,
  GET_QUESTION_API,
  MARK_QUESTION_API,
  VOTE_QUESTION_API,
} from "../features/question/questionApiSlice";

const DetailQuestion = () => {
  useTitle("Detail | Question");

  const { id } = useParams();

  const dispatch = useDispatch();
  const { question } = useSelector((state) => state.question);
  const { answers } = useSelector((state) => state.answer);
  const { message, isLoading, isSuccess, isError } = useSelector(
    (state) => state.loader
  );
  const { user } = useSelector((state) => state.auth);
  const flagAccept = user?._id === question?.owner?._id;

  useEffect(() => {
    dispatch({
      type: GET_QUESTION_API,
      payload: { id },
    });
  }, [dispatch, id]);

  useEffect(() => {
    dispatch({
      type: GET_ALL_ANSWER_OFQUESTION_API,
      payload: { id },
    });
  }, [dispatch, id]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(setIntial());
    }
  }, [isError, dispatch]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      dispatch(setIntial());
    }
  }, [dispatch, isSuccess]);

  const isMark = question?.bookmark?.find((item) => item === user?._id);
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
      <div className="h-full flex-grow relative">
        {isLoading && <Spinner />}
        {question && question?.content && (
          <div>
            <div className="p-4 mb-2 border-b max-w-4xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl">{question.title}</h3>
                <Link
                  to="/question/add"
                  className="btn-primary text-sm shrink-0"
                >
                  Ask Question
                </Link>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center justify-center text-neutral-400 space-x-3">
                  <p>
                    Ask at
                    <span className="text-neutral-700 ml-2">
                      {moment(question.createdAt).fromNow()}
                    </span>
                  </p>
                  <p>
                    Modified at
                    <span className="text-neutral-700 ml-2">
                      {moment(question.updatedAt).fromNow()}
                    </span>
                  </p>
                  <p>
                    Viewed
                    <span className="text-neutral-700 mx-2">
                      {question.viewNumber}
                    </span>
                    times
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/profile/${question.owner?._id}`}
                    className="flex items-center space-x-2 text-sm text-primary hover:text-neutral-800 transition-all duration-500"
                  >
                    <img
                      src={
                        question.owner?.avatar ||
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      }
                      alt="avatar"
                      className="object-cover w-6 h-6 rounded-full mr-2"
                    />
                    {question.owner?.username}
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-start p-4 max-w-4xl">
              <div className="w-16 shrink-0 space-y-2 flex flex-col items-center">
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-full border pt-3 hover:bg-orange-200 cursor-pointer"
                  onClick={() =>
                    handleVote({
                      id: question._id,
                      vote: "up",
                    })
                  }
                >
                  <i className="fa-solid fa-sort-up fa-xl"></i>
                </div>
                <p className="text-center text-lg">
                  {question.voteUp.length - question.voteDown.length}
                </p>
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-full border pb-3 hover:bg-orange-200 cursor-pointer"
                  onClick={() =>
                    handleVote({
                      id: question._id,
                      vote: "down",
                    })
                  }
                >
                  <i className="fa-solid fa-sort-down fa-xl"></i>
                </div>
                {question.owner._id !== user?._id && (
                  <div
                    className={`${
                      !isMark
                        ? "text-neutral-400 cursor-pointer"
                        : "text-primary "
                    } `}
                    onClick={() => handleMark(question._id)}
                  >
                    <i className="fa-regular fa-bookmark"></i>
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <div
                  className="text-sm"
                  dangerouslySetInnerHTML={{
                    __html: question.content,
                  }}
                />
              </div>
            </div>
            <div className="pl-8 py-2 max-w-4xl border-t flex justify-between">
              {answers.length > 0 && (
                <p className="text-lg font-semibold  mb-4">
                  {answers.length} Answers
                </p>
              )}
            </div>
            {answers &&
              answers.map((answer) => (
                <Answer
                  key={answer._id}
                  answer={answer}
                  flagAccept={flagAccept}
                  isOwner={answer.owner._id !== user?._id}
                  isSolved={question.isSolved}
                />
              ))}
            {!question.isSolved && (
              <Formik
                initialValues={{
                  content: "",
                }}
                validationSchema={Yup.object().shape({
                  content: Yup.string().required("Add your content"),
                })}
                onSubmit={async (
                  values,
                  { setSubmitting, setStatus, setFieldValue }
                ) => {
                  dispatch({
                    type: ANSWER_QUESTION_API,
                    payload: { id, content: values.content },
                  });

                  setStatus({ success: true });
                  setSubmitting(false);
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  setFieldTouched,
                  touched,
                  values,
                  setFieldValue,
                }) => (
                  <form
                    onSubmit={handleSubmit}
                    autoComplete="off"
                    className="p-4 mb-2 border-t max-w-4xl space-y-3"
                  >
                    <p className="font-semibold">Your Answer</p>
                    <Field
                      name="content"
                      component={QuillField}
                      modules={{
                        toolbar: [
                          ["bold", "italic", "underline", "strike"],
                          [{ list: "ordered" }, { list: "bullet" }],
                          ["link", "image"],
                        ],
                      }}
                      placeholder="Enter your content"
                    />
                    <button disabled={isSubmitting} className="btn-primary">
                      Post Your Answer
                    </button>
                  </form>
                )}
              </Formik>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DetailQuestion;
