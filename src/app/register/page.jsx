"use client"; // Ensure this is at the top of the file for client components
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Ensure correct import path

const Register = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    terms: Yup.boolean()
      .required("You must accept the terms and conditions")
      .oneOf([true], "You must accept the terms and conditions"),
  });

  const router = useRouter(); // Correct placement inside the component

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    localStorage.setItem("userData", JSON.stringify(values));
    setSubmitting(false);
    router.push("/register/personal-info"); // Navigate to the personal-info page
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold">Signup</h1>
      <h2 className="text-xl font-medium">to get started</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mt-12 flex flex-col gap-6">
              <div>
                <Field
                  className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none md:w-[455px]"
                  type="text"
                  name="username"
                  placeholder="Username"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <Field
                  className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none md:w-[455px]"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <Field
                  className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none md:w-[455px]"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <Field
                  className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none md:w-[455px]"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <Field
                  type="checkbox"
                  name="terms"
                  className="border-blue-gray-200 peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity checked:border-purple-500 checked:bg-purple-500 checked:before:bg-purple-500"
                  id="checkbox-terms"
                />
                <label
                  htmlFor="checkbox-terms"
                  className="cursor-pointer text-blue-700"
                >
                  Agree to our terms and conditions
                </label>
                <ErrorMessage
                  name="terms"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mt-8">
                <button
                  className="w-full rounded-lg bg-button-gradient p-4 text-white"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Continue"}
                </button>
              </div>
              <div className="mt-8 flex justify-center gap-1">
                <p>Already registered?</p>
                <Link className="font-semibold" href="/login">
                  Login
                </Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
