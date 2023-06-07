import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Form, Formik, useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";
import useTitle from "../hooks/useTitle";

import { REGISTER_API } from "../features/auth/authApiSlice";
import { setIntial } from "../features/loader/loaderSlice";
import Spinner from "../components/Spinner";

const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;

const Register = () => {
  useTitle("Register | Question");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);

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
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      setSubmit(false);

      dispatch(setIntial());
    }
  }, [isError]);

  return (
    <>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          passwordConfirm: "",
        }}
        validationSchema={Yup.object().shape({
        
          username: Yup.string()
            .matches(
              USERNAME_REGEX,
              "Should be between 4 and 24 characters. Letters, numbers, underscores, hyphens allowed. Special characters not allowed!"
            )
            .required("A username is required"),
          email: Yup.string()
            .email("Must be a valid email")
            .max(255)
            .required("Email is required"),
          password: Yup.string().max(255).required("Password is required"),
          passwordConfirm: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords Must Match")
            .required("Please confirm your password"),
        })}
        onSubmit={async (values, { setStatus, setSubmitting }) => {
          setSubmit(true);
          console.log(values);

          dispatch({
            type: REGISTER_API,
            payload: values,
          });

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
            className="container py-16 px-4 mx-aut "
            autoComplete="off"
          >
            {/* isLoading  f */}

            <div className="max-w-lg mx-auto px-6 py-7 shadow rounded overflow-hidden relative bg-white">
              {isLoading && <Spinner />}

              <>
                <h2 className="text-2xl uppercase font-bold mb-6">Sign up</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-600 mb-2 block">
                      User Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      value={values.username}
                      name="username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="input-box"
                      placeholder="Dinh Hoang Giang"
                    />
                    {touched.username && errors.username && (
                      <p className="input-error">{errors.username}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-gray-600 mb-2 block">
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="input-box"
                      placeholder="example@mail.com"
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
                    Create
                  </button>
                </div>

                <p className="mt-4 text-gray-600 text-center ">
                  Already have an account?
                  <Link to="/user/login" className="text-primary ml-2">
                    Log in
                  </Link>
                </p>
              </>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default Register;
