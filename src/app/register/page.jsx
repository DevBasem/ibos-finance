"use client";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Checkbox } from "@headlessui/react";
import Cookies from 'js-cookie';

const Register = () => {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
      .max(10, "Username must be no more than 10 characters") // Added max validation
      .required("Username is required"),
    email: Yup.string()
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        "Invalid email address"
      )
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .matches(/[A-Z]/, "Password should contain at least 1 upper-cased letter")
      .matches(/[^A-Za-z0-9]/, "Password should contain at least 1 special character")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    terms: Yup.boolean()
      .required("You must accept the terms and conditions")
      .oneOf([true], "You must accept the terms and conditions"),
  });

  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("https://ibos-deploy.vercel.app/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      if (response.data.status === "success") {
        Cookies.set('token', response.data.token, { expires: 7 });
        setSuccessMessage(response.data.message);

        setTimeout(() => {
          router.push("/register/personal-info");
        }, 1000);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error); // Log the full error
      setError(error.response?.data?.message || "An error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFocus = () => {
    setError("");
    setSuccessMessage("");
  };

  return (
    <div className="container mx-auto p-4 max-sm:px-2">
      <h1 className="text-3xl font-semibold">Signup</h1>
      <h2 className="text-xl font-medium">to get started</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={true}
        validateOnBlur={false}
      >
        {({ isSubmitting, isValid, dirty, values, setFieldValue }) => {
          const allFieldsFilled = Object.values(values).every(value => value !== "");
          const isButtonDisabled = !isValid || !allFieldsFilled || isSubmitting;

          return (
            <Form>
              <div className="mt-8 max-sm:mt-6 flex flex-col gap-4">
                <div>
                  <Field
                    className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none md:w-[455px]"
                    type="text"
                    name="username"
                    placeholder="Username"
                    onFocus={handleFocus}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm ms-1"
                  />
                </div>
                <div>
                  <Field
                    className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none md:w-[455px]"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onFocus={handleFocus}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm ms-1"
                  />
                </div>
                <div>
                  <Field
                    className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none md:w-[455px]"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onFocus={handleFocus}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm ms-1"
                  />
                </div>
                <div>
                  <Field
                    className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none md:w-[455px]"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onFocus={handleFocus}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm ms-1"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={values.terms}
                      onChange={(checked) => setFieldValue("terms", checked)}
                      className="group block cursor-pointer size-5 rounded border bg-white data-[checked]:bg-blue-500"
                      onFocus={handleFocus}
                    >
                      <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Checkbox>
                    <label
                      htmlFor="checkbox-terms"
                      className="cursor-pointer hover:text-blue-500 hover:underline"
                    >
                      Agree to our terms and conditions
                    </label>
                  </div>

                  <ErrorMessage
                    name="terms"
                    component="div"
                    className="text-red-500 text-sm ms-1 mt-1"
                  />
                </div>
                {error && <p
                  className={`mt-5 text-red-600 bg-red-100 text-sm w-fit mx-auto px-3 py-1 rounded-full`}>{error}
                </p>}
                {successMessage && <p className="mt-5 text-green-600 bg-green-100 text-sm w-fit mx-auto px-3 py-1 rounded-full">{successMessage}</p>}
                <div className="mt-3 max-sm:mt-2">
                  <button
                    className={`w-full rounded-lg p-4 text-white
                      ${isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-button-gradient cursor-pointer"}`}
                    type="submit"
                    disabled={isButtonDisabled}
                  >
                    {isSubmitting ? "Submitting..." : "Continue"}
                  </button>
                </div>
                <div className="mt-3 max-sm:mt-2 flex justify-center gap-1">
                  <p>Already registered?</p>
                  <Link className="font-semibold hover:underline hover:text-blue-500" href="/login">
                    Login
                  </Link>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Register;