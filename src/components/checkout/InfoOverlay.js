import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { saveOrderInfo } from "../../features/order/orderSlice";
import "./checkout.css";

const InfoOverlay = ({ overlay, setOverlay }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const InfoSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    phone: Yup.string()
      .required("required")
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      )
      .min(11, "to short")
      .max(12, "to long"),
    city: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    address: Yup.string()
      .min(2, "Too Short!")
      .max(100, "Too Long!")
      .required("Required"),
  });

  const saveOrderHandler = (values) => {
    dispatch(saveOrderInfo(values));
    navigate("/checkout");
  };

  const closeOverlay = () => {
    setOverlay(false);
  };

  return (
    <div className={overlay ? "userinfo-overlay active" : "userinfo-overlay"}>
      <div className="userinfo-container">
        <h1 className="main-title mb-md">Please Fill user information</h1>
        <Formik
          initialValues={{
            fullname: "",
            phone: "",
            city: "",
            address: "",
          }}
          validationSchema={InfoSchema}
          onSubmit={(values) => {
            console.log("order data info ", values);
            closeOverlay();
          }}
        >
          {({ errors, touched }) => (
            <Form className="form">
              <div className="form-group">
                <label htmlFor="fullname" className="form-label">
                  Fullname
                </label>
                <Field name="fullname" type="text" className="form-input" />
              </div>
              {errors.fullname && touched.fullname ? (
                <div className="error-msg">{errors.fullname}</div>
              ) : null}
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <Field name="phone" type="phone" className="form-input" />
              </div>
              {errors.phone && touched.phone ? (
                <div className="error-msg">{errors.phone}</div>
              ) : null}
              <div className="form-group">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <Field name="city" type="text" className="form-input" />
              </div>
              {errors.city && touched.city ? (
                <div className="error-msg">{errors.city}</div>
              ) : null}
              <div className="form-group">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <Field name="address" as="textarea" className="form-input" />
              </div>
              {errors.address && touched.address ? (
                <div className="error-msg">{errors.address}</div>
              ) : null}
              <div className="btn-wrapper">
                <button className="btn-fill" type="submit">
                  Submit
                </button>
                <button className="btn-fill btn-cancel" onClick={closeOverlay}>
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default InfoOverlay;
