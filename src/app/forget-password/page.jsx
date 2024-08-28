"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";

export default function ForgotPassword() {
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email address").required("Email is required"),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        // Clear messages before starting the new request
        setError("");
        setSuccessMessage("");

        try {
            const response = await axios.post("https://ibos-deploy.vercel.app/forget-password", {
                email: values.email,
            });

            if (response.data.message) {
                // Display success message
                setSuccessMessage("Check your email for the password reset link.");

                // Reset the form after successful submission
                resetForm();
            } else {
                setError("An error occurred. Please try again later.");
            }
        } catch (error) {
            console.error("Error sending reset link:", error);
            setError(error.response?.data?.message || "An error occurred. Please try again later.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnChange={true} // Enable validation on change
            validateOnBlur={true}   // Enable validation on blur
        >
            {({ isSubmitting, isValid, values }) => {
                // Determine if the email field is filled
                const isEmailFilled = values.email;

                // Determine if the button should be disabled
                const isButtonDisabled = !isValid || !isEmailFilled || isSubmitting;

                return (
                    <Form>
                        <div>
                            <h1 className="text-3xl font-semibold">Forgot Password</h1>
                            <h2 className="text-xl font-medium">Enter your email to receive a password reset link</h2>
                        </div>
                        <div className="mt-12 max-sm:mt-6">
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label htmlFor="email" className="sr-only">
                                        Email
                                    </label>
                                    <Field
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none md:w-[455px]"
                                        placeholder="Email"
                                    />
                                    <ErrorMessage name="email">
                                        {msg => <p className="text-red-600 text-sm">{msg}</p>}
                                    </ErrorMessage>
                                </div>
                            </div>
                            {error && <p className="mt-5 text-red-600 bg-red-100 text-sm w-fit mx-auto px-3 py-1 rounded-full">{error}</p>}
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
                                        "Send Reset Link"
                                    )}
                                </button>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}