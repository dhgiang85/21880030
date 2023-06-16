import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import QuillField from "../components/QuillField";
import { setIntial } from "../features/loader/loaderSlice";
import Spinner from "../components/Spinner";
import {
  GET_ANSWER_API,
  UPDATE_ANSWER_API,
} from "../features/answer/answerApiSlice";
import useTitle from "../hooks/useTitle";

const EditAnswer = () => {
  useTitle("Edit | Question");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { message, isLoading, isSuccess, isError } = useSelector(
    (state) => state.loader
  );
  const { user } = useSelector((state) => state.auth);
  const { answer } = useSelector((state) => state.answer);

  useEffect(() => {
    dispatch({
      type: GET_ANSWER_API,
      payload: { id },
    });
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      if (message) {
        toast.success(message);
      }

      if (isSummit) {
        setSubmit(false);
        navigate(-1);
      }
      dispatch(setIntial());
    }
  }, [isSuccess, message, navigate, dispatch]);

  useEffect(() => {
    if (isError) {
      if (message) {
        toast.error(message);
      }

      setSubmit(false);
      dispatch(setIntial());
    }
  }, [isError, message, dispatch]);

  const [isSummit, setSubmit] = useState(false);

  if (isLoading || !answer || !answer?.content) {
    return <Spinner />;
  }

  return (
    <Formik
      initialValues={{
        content: answer && answer.content ? answer.content.toString() : "",
      }}
      validationSchema={Yup.object().shape({
        content: Yup.string()
          .required("Add your content")
          .min(30, "Content must be at least 10 characters long"),
      })}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        setSubmit(true);
        dispatch({
          type: UPDATE_ANSWER_API,
          payload: {
            id,
            data: values,
          },
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
        <Form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="p-4 border-b max-w-4xl relative max-height"
        >
          <h3 className="text-xl mb-2 text-primary">{answer.question.title}</h3>

          <div
            className="text-sm border-l-2 pl-3 border-neutral-600"
            dangerouslySetInnerHTML={{
              __html: answer.question.content,
            }}
          />
          <h3 className="mb-4 my-2 font-semibold mt-4 text-primary">Edit your Answer</h3>

          <div className="mb-3">
          
            {touched.content && errors.content && (
              <p className="input-error col-span-4 mb-4 -mt-3">
                {errors.content}
              </p>
            )}
            <div>
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
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              className="btn-secondary"
              onClick={() => navigate(`/users/${user._id}`)}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditAnswer;
