"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Link from "next/link";
import * as Yup from "yup";
import Cookies from "js-cookie";

export default function Login() {
  const [error, setError] = useState("");

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("https://ibos-deploy.vercel.app/login", {
        username: values.username, // Use the username field
        password: values.password,
      });

      if (response.data.status === "success") {
        // Handle successful login
        console.log("Login successful", response.data);
        // You can redirect the user or store the token as needed
        // Save token and user ID in cookies
        Cookies.set("token", response.data.token, { expires: 1 }); // Expires in 1 days
        Cookies.set("userId", response.data.user._id, { expires: 1 });
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

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <h1 className="text-3xl font-semibold">Login</h1>
            <h2 className="text-xl font-medium">to get started</h2>
          </div>
          <div className="mt-12">
            <div className="flex flex-col gap-6">
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
                />
                <ErrorMessage name="username" component="div" className="text-red-500 mt-1" />
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
                />
                <ErrorMessage name="password" component="div" className="text-red-500 mt-1" />
              </div>
            </div>
            {error && <p className="mt-4 text-red-500">{error}</p>}
            <div className="mt-6">
              <a href="/">Forgot Password?</a>
            </div>
            <div className="mt-8">
              <button
                className="w-full rounded-lg bg-button-gradient p-4 text-white"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Continue"}
              </button>
            </div>
            <div className="mt-8 flex justify-center gap-1">
              <p>New User?</p>
              <Link className="font-semibold" href="/register">
                Register
              </Link>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}