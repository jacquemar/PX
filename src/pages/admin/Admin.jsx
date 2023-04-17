import React, { useState, useEffect } from "react";
import { Header, Footer, Categorie } from "../../components";
import { Formik, Form, Field, ErrorMessage } from "formik";

const initialValues = {
  name: "",
  category: "",
  gender: "",
  price: "",
  cover: "",
};

const addproduct = () => {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("http://localhost:2000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log({ values });
      if (!response.ok) {
        throw new Error("Error sending form data");
      }

      // Form data was sent successfully
      console.log("Form data sent successfully!");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const validate = (values) => {
    const errors = {};

    // Add your validation rules here
    if (!values.name) {
      errors.name = "Required";
    }

    return errors;
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <Field type="text" name="category" />
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <Field type="text" name="gender" />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <Field type="number" name="price" />
          </div>
          <div>
            <label htmlFor="cover">Cover</label>
            <Field type="file" name="cover" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default addproduct;
