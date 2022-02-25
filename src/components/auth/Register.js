import React, { useState, useEffect } from "react";
import { FaUserPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../features/user/userSlice";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Login from "./Login";
import "./auth.css";

const Register = () => {
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = () => {
    setLogin(true);
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  const SingUpSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Required password")
      .min(8, "Password is too short should be 8 chars minimum."),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  return (
    <>
      {login ? (
        <Login />
      ) : (
        <div className="form-container">
          <h1 className="auth-title">
            <span className="user-icon">
              <FaUserPlus />
            </span>
            Register
          </h1>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={SingUpSchema}
            onSubmit={(values) => {
              console.log(values);
              setLogin(true);
              dispatch(addUser(values));
            }}
          >
            {({ errors, touched }) => (
              <Form className="form">
                <div className="form-group">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <Field
                    name="username"
                    type="username"
                    className="form-input"
                  />
                </div>
                {errors.username && touched.username ? (
                  <div className="error-msg">{errors.username}</div>
                ) : null}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <Field name="email" type="email" className="form-input" />
                </div>
                {errors.email && touched.email ? (
                  <div className="error-msg">{errors.email}</div>
                ) : null}
                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className="form-input"
                  />
                </div>
                {errors.password && touched.password ? (
                  <div className="error-msg">{errors.password}</div>
                ) : null}
                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    ConfirmPassword
                  </label>
                  <Field
                    name="confirmPassword"
                    type="confirmPassword"
                    className="form-input"
                  />
                </div>
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div className="error-msg">{errors.confirmPassword}</div>
                ) : null}
                <div className="btn-wrapper">
                  <button className="btn-fill" type="submit">
                    Register
                  </button>
                  <span className="btn-link">
                    Already have an account?
                    <span onClick={loginHandler} className="link-text">
                      Login
                    </span>
                  </span>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default Register;
