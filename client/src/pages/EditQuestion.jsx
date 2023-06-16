import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import QuillField from "../components/QuillField";
import SelectField from "../components/SelectField";
import { setIntial } from "../features/loader/loaderSlice";
import {
  GET_QUESTION_API,
  UPDATE_QUESTION_API,
} from "../features/question/questionApiSlice";
import { GET_ALL_TAG } from "../features/tag/tagApiSlice";
import useTitle from "../hooks/useTitle";
import Spinner from "../components/Spinner";

const EditQuestion = () => {
  useTitle("Edit | Question");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { message, isLoading, isSuccess, isError } = useSelector(
    (state) => state.loader
  );
  const { user } = useSelector((state) => state.auth);
  const { tags } = useSelector((state) => state.tag);
  const { question } = useSelector((state) => state.question);

  useEffect(() => {
    dispatch({
      type: GET_QUESTION_API,
      payload: { id },
    });
  }, []);

  useEffect(() => {
    dispatch({
      type: GET_ALL_TAG,
      payload: { pageNumber: 1, pageSize: 100, search: "" },
    });
  }, []);

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

  const options = tags?.map((tag) => {
    return { value: tag._id, label: tag.name };
  });

  const [isSummit, setSubmit] = useState(false);

  if (isLoading || !question || !question?.content) {
    return <Spinner />;

  }

  return (
    <Formik
      initialValues={{
        tags:
          question?.tags?.map((tag) => {
            return { value: tag._id, label: tag.name };
          }) || [],
        content:
          question && question.content ? question.content.toString() : "",
        title: question?.title,
      }}
      validationSchema={Yup.object().shape({
        tags: Yup.array()
          .min(1, "Select at least one tag")
          .required("Select tags"),
        content: Yup.string()
          .required("Add your content")
          .min(30, "Content must be at least 10 characters long"),
        title: Yup.string().required("Add your title of question"),
      })}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        const tags = values.tags.map((tag) => tag.value);
        const data = { ...values, tags };
        dispatch({ type: UPDATE_QUESTION_API, payload: { id, data } });
        setSubmit(true);
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
     
          {!isLoading && (
            <>
              <h2 className="mb-4 my-2">Edit your question</h2>
              <div className="grid grid-cols-4 gap-2 max-w-[650px] justify-items-start content-center items-center mb-5">
                <label
                  htmlFor="name"
                  className="text-base font-semibold leading-7 text-gray-900 justify-self-end"
                >
                  Question:
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={values.title}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="px-1 py-2 rounded-md shadow-sm border border-slate-300 min-w-[300px] col-span-3 w-full focus:border-secondary transition-all"
                  placeholder="Your question here"
                />
              </div>
              {touched.title && errors.title && (
                <p className="input-error col-span-4 mb-2">{errors.title}</p>
              )}
              <div className="mb-3">
                <label
                  htmlFor="description"
                  className="text-base font-semibold leading-7 text-gray-900 mb-3 inline-block"
                >
                  Content:
                </label>
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
              <Field
                name="tags"
                value={values?.tags}
                component={SelectField}
                options={options}
                placeholder="Select tags"
              />

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
            </>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default EditQuestion;
