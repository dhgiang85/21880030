import React from "react";
import useTitle from "../hooks/useTitle";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setIntial } from "../features/loader/loaderSlice";
import { RESET_REQUEST_PASS_API } from "../features/auth/authApiSlice";

const PasswordResetRequestPage = () => {
  useTitle("Request Reset Password");
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message, isLoading, isSuccess, isError } = useSelector(
    (state) => state.loader
  );
  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      dispatch(setIntial());
      if (submit) {
        navigate("/");
      }
      setSubmit(false);
    }
    return () => {
      dispatch(setIntial());
      setSubmit(false);
    };
  }, [isSuccess, message, dispatch, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(setIntial());
      setSubmit(false);
    }
  }, [isError, dispatch, message]);
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
      })}
      onSubmit={(values, { setStatus, setSubmitting }) => {
        setSubmit(true);

        dispatch({
          type: RESET_REQUEST_PASS_API,
          payload: values,
        });

      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <Form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="container py-16 px-4 mx-auto"
        >
          <div className="max-w-lg mx-auto px-6 py-7 shadow rounded overflow-hidden bg-white">
            <h2 className="text-2xl uppercase font-bold mb-6">Please enter your email</h2>

            <div className="space-y-4">
              <div>
                <label className="text-gray-600 mb-2 block">
                  Email <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  className="input-box"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="email@example.com"
                />
                {touched.email && errors.email && (
                  <p className="input-error">{errors.email}</p>
                )}
              </div>

            </div>


            <div className="mt-4">
              <button
                disabled={isSubmitting}
                type="submit"
                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium "
              >
                Request
              </button>
            </div>


     
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PasswordResetRequestPage;
