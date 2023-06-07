import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import "react-quill/dist/quill.snow.css";
import SelectField from "../components/SelectField";
import useTitle from "../hooks/useTitle";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_TAG } from "../features/tag/tagApiSlice";
import { POST_QUESTION_API } from "../features/question/questionApiSlice";
import { toast } from "react-toastify";
import { setIntial } from "../features/loader/loaderSlice";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import * as Yup from "yup";

const PostQuestion = () => {
  useTitle("New | eVoucher");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { message, isLoading, isSuccess, isError } = useSelector(
    (state) => state.loader
  );

  useEffect(() => {
    dispatch({
      type: GET_ALL_TAG,
      payload: { pageNumber: 1, pageSize: 100, search: "" },
    });
  }, [dispatch]);

  const { tags } = useSelector((state) => state.tag);
  useEffect(() => {
    if (isSuccess) {
      toast.success(message);

      if (isSummit) {
        navigate(`/`);
        setSubmit(false);
      }
    }
    dispatch(setIntial());
  }, [isSuccess, message, navigate, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(setIntial());
  }, [isError, message, dispatch]);
  const options = tags.map((tag) => {
    return { value: tag._id, label: tag.name };
  });
  const [isSummit, setSubmit] = useState(false);

  return (
    <Formik
      initialValues={{
        tags: [],
        content: "",
        title: "",
      }}
      validationSchema={Yup.object().shape({
        tags: Yup.array()
          .min(1, "Select at least one tag")
          .required("Select tags"),
        content: Yup.string().required("Add your content"),
        title: Yup.string().required("Add your title of question"),
      })}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        const tags = values.tags.map((tag) => tag.value);

        dispatch({ type: POST_QUESTION_API, payload: { ...values, tags } });

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
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="p-4 border-b max-w-4xl relative"
        >
          <h2 className="mb-4 my-2">Ask a public question</h2>
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
              <CKEditor
                editor={ClassicEditor}
                data={""}
                name="content"
                onReady={(editor) => {
                  editor.ui.view.editable.element.style.height = "300px";
                }}
                onBlur={() => {
                  setFieldTouched("content", true, {
                    shouldValidate: true,
                  });
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFieldValue("content", data);
                }}
              />
            </div>
          </div>
          <Field
            name="tags"
            value={values.tags}
            component={SelectField}
            options={options}
            placeholder="Select tags"
          />

          <div className="flex justify-end space-x-2 mt-4">
            <button
              to="/campaigns"
              className="btn-secondary"
              onClick={() => navigate("/questions")}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
            >
              Lưu
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default PostQuestion;
