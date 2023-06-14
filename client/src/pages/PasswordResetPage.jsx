import React from "react";
import useTitle from "../hooks/useTitle";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setIntial } from "../features/loader/loaderSlice";
import { RESET_PASS_API, RESET_REQUEST_PASS_API } from "../features/auth/authApiSlice";

const PasswordResetPage = () => {
  useTitle("Reset Password");
  const {token} = useParams();
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
        navigate("/user/login");
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
      password: "",
      passwordConfirm: "",
    }}
    validationSchema={Yup.object().shape({
      
      password: Yup.string().max(255).required("Password is required"),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords Must Match")
        .required("Please confirm your password"),
    })}
    onSubmit={async (values, { setStatus, setSubmitting }) => {
      setSubmit(true);

      dispatch({
        type: RESET_PASS_API,
        payload: {
          token,
          password: values.password,
          passwordConfirm: values.passwordConfirm,
        },
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
      <form
        onSubmit={handleSubmit}
        className="container py-16 px-4 mx-auto "
        autoComplete="off"
      >
        {/* isLoading  f */}

        <div className="max-w-lg mx-auto px-6 py-7 shadow rounded overflow-hidden relative bg-white">
          {/* {isLoading && <Spinner />} */}

          <>
            <h2 className="text-2xl  font-bold mb-6">Enter Your New Password</h2>
            <div className="space-y-4">
              <div>
                <label className="text-gray-600 mb-2 block">
                  Password <span className="text-primary">*</span>
                </label>
                <input
                  type="password"
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="input-box"
                  placeholder="Type Password"
                />
                {touched.password && errors.password && (
                  <p className="input-error">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="text-gray-600 mb-2 block">
                  Password Confirm
                  <span className="text-primary">*</span>
                </label>
                <input
                  type="password"
                  value={values.passwordConfirm}
                  name="passwordConfirm"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="input-box"
                  placeholder="Confirm your password"
                />
                {touched.passwordConfirm && errors.passwordConfirm && (
                  <p className="input-error">{errors.passwordConfirm}</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                disabled={submit}
                className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium "
              >
                Change Password
              </button>
            </div>

           
          </>
        </div>
      </form>
    )}
  </Formik>
  )
}

export default PasswordResetPage