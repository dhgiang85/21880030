import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import useTitle from "../hooks/useTitle";

import { Form, Formik } from "formik";
import { LOGIN_API } from "../features/auth/authApiSlice";
import { setIntial } from "../features/loader/loaderSlice";
const Login = () => {
  useTitle("Login | Question");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { message, isLoading, isSuccess, isError } = useSelector(
    (state) => state.loader
  );
  const [submit, setSubmit] = useState(false);
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
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={(values, { setStatus, setSubmitting }) => {
          setSubmit(true);

          dispatch({
            type: LOGIN_API,
            payload: values,
          });
          // setSubmit(false);
          // setStatus({ success: true });
          // setSubmitting(false);
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
            className="container py-16 px-4 mx-auto "
          >
            <div className="max-w-lg mx-auto px-6 py-7 shadow rounded overflow-hidden  bg-white">
              <h2 className="text-2xl uppercase font-bold mb-6">Login</h2>

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

                <div>
                  <label className="text-gray-600 mb-2 block">
                    Password <span className="text-primary">*</span>
                  </label>
                  <input
                    type="password"
                    className="input-box"
                    placeholder="Type Password"
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.password && errors.password && (
                    <p className="input-error">{errors.password}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 ">
                <Link to="/user/reset_password_request" className="text-primary">
                  Forgot your password?
                </Link>
              </div>

              <div className="mt-4">
                <button
                  disabled={submit}
                  type="submit"
                  className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium "
                >
                  Login
                </button>
              </div>

              {/* <div className="mt-6 flex justify-center relative">
                <div className="absolute left-0 top-3 w-full border-b-2 border-gray-200 "></div>
                <div className="text-gray-600 uppercase px-3 bg-white relative z-10 ">
                  Login With
                </div>
              </div> */}

              {/* <div className="mt-4 flex gap-4 ">
                <a
                  href="/"
                  className="block w-1/2 py-2 text-center text-white bg-red-600 rounded uppercase font-roboto font-medium text-sm w-full"
                >
                  Google
                </a>
              </div> */}

              <p className="mt-4 text-gray-600 text-center ">
                Don't have an account?
                <Link to="/user/register" className="text-primary ml-2">
                  Sign up
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
