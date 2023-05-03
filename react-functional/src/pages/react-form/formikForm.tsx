import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

interface FormValues {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(
      /^[0-9]{10}$/,
      "Invalid phone number, must be 10 digits without spaces or dashes"
    )
    .required("Phone number is required"),
  address: yup.string().required("Address is required"),
});

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const FormikForm: React.FC = () => {
  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <>
      <h1>Formik Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors }: any) => {
          return (
            <Form>
            <div>
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              {touched.name && errors.name && (
                <ErrorMessage name="name">{errors.name}</ErrorMessage>
              )}
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="text" id="email" name="email" />
              {touched.email && errors.email && (
                <ErrorMessage name="email">{errors.email}</ErrorMessage>
              )}
            </div>
            <div>
              <label htmlFor="phone">Phone number</label>
              <Field type="text" id="phone" name="phone" />
              {touched.phone && errors.phone && (
                <ErrorMessage name="phone">{errors.phone}</ErrorMessage>
              )}
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <Field type="text" id="address" name="address" />
              {touched.address && errors.address && (
                <ErrorMessage name="address">{errors.address}</ErrorMessage>
              )}
            </div>
            <button type="submit">Submit</button>
          </Form>
          )
        }}
      </Formik>
    </>
  );
};

export default FormikForm;
