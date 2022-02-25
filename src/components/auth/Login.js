import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { selectUsers, loginUser } from "../../features/user/userSlice";
import Register from "./Register";
import "./auth.css";
import { setUseProxies } from "immer";

const Login = () => {
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  const registerHandler = () => {
    setRegister(true);
  };

  const validateUser = (values) => {
    if (
      values.username !== users.username ||
      values.password !== users.password
    ) {
      alert("Invalid user");
    } else {
      dispatch(loginUser(values));
      navigate("/products", { state: { values } });
    }
  };

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .required("Required password")
      .min(8, "Password is too short should be 8 chars minimum."),
  });

  return (
    <>
      {register ? (
        <Register />
      ) : (
        <div className="form-container">
          <h1 className="auth-title">
            <span className="user-icon">
              <FaUserAlt />
            </span>
            Login
          </h1>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              validateUser(values);
            }}
          >
            {({ errors, touched }) => (
              <Form className="form">
                <div className="form-group">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <Field name="username" type="text" className="form-input" />
                </div>
                {errors.username && touched.username ? (
                  <div className="error-msg">{errors.username}</div>
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
                <div className="btn-wrapper">
                  <button className="btn-fill" type="submit">
                    Login
                  </button>
                  <span className="btn-link">
                    Don't have an account?
                    <span onClick={registerHandler} className="link-text">
                      Register
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

export default Login;
