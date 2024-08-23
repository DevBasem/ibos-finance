"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Link from "next/link";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import "./login.css";

export default function Login() {
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // Clear messages before starting the new login attempt
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("https://ibos-deploy.vercel.app/login", {
        username: values.username,
        password: values.password,
      });

      if (response.data.status === "success") {
        // Display success message
        setSuccessMessage("Login successful");

        // Save token and user ID in cookies
        Cookies.set("token", response.data.token);
        Cookies.set("userId", response.data.user._id);

        // Wait for a short period before redirecting
        setTimeout(() => {
          router.push("/home");
        }, 1500); // Adjust delay time as needed
      } else {
        setError(response.data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
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
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={true} // Enable validation on change
      validateOnBlur={true}   // Enable validation on blur
    >
      {({ isSubmitting, isValid, values }) => {
        // Determine if both fields are filled
        const areFieldsFilled = values.username && values.password;

        // Determine if the button should be disabled
        const isButtonDisabled = !isValid || !areFieldsFilled || isSubmitting;

        return (
          <Form>
            <div>
              <h1 className="text-3xl font-semibold">Login</h1>
              <h2 className="text-xl font-medium">to get started</h2>
            </div>
            <div className="mt-12 max-sm:mt-6">
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="username" className="sr-only">
                    Username
                  </label>
                  <Field
                    id="username"
                    name="username"
                    type="text"
                    className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none md:w-[455px]"
                    placeholder="Username"
                    onFocus={handleFocus} // Clear messages on focus
                  />
                  <ErrorMessage name="username">
                    {msg => <p className="text-red-600 text-sm">{msg}</p>}
                  </ErrorMessage>
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none md:w-[455px]"
                    placeholder="Password"
                    onFocus={handleFocus} // Clear messages on focus
                  />
                  <ErrorMessage name="password">
                    {msg => <p className="text-red-600 text-sm">{msg}</p>}
                  </ErrorMessage>
                </div>
              </div>
              <div className="mt-6">
                <a href="/" className="hover:underline hover:text-blue-500">Forgot Password?</a>
              </div>
              {error && <p
                className={`mt-5 text-red-600 bg-red-100 text-sm w-fit mx-auto px-3 py-1 rounded-full`}>{error}
              </p>}
              {successMessage && <p className="mt-5 text-green-600 bg-green-100 text-sm w-fit mx-auto px-3 py-1 rounded-full">{successMessage}</p>}
              <div className="mt-8">
                <button
                  className={`w-full transition-transform rounded-lg p-4 text-white flex items-center justify-center
                  ${isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-button-gradient cursor-pointer"}
                  `}
                  type="submit"
                  disabled={isButtonDisabled}
                >
                  {isSubmitting ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                  ) : (
                    "Continue"
                  )}
                </button>
              </div>
              <div className="mt-8 flex justify-center gap-1">
                <p>New User?</p>
                <Link className="font-semibold hover:underline hover:text-blue-500" href="/register">
                  Register
                </Link>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}