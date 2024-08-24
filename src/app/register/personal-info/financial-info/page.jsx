"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Cookies from 'js-cookie';
import axios from 'axios';
import withAuth from "../../../utils/withAuth";


// Validation schema for FinancialInfoForm
const validationSchema = Yup.object({
  salary: Yup.number()
    .min(0, "Salary must be a positive number")
    .required("Salary is required"),
  saving: Yup.number()
    .min(0, "Saving must be a positive number")
    .required("Saving is required"),
  expenses: Yup.number()
    .min(0, "Expenses must be a positive number")
    .required("Expenses are required"),
  investments: Yup.number()
    .min(0, "Investments must be a positive number")
    .required("Investments are required"),
  debtsToPay: Yup.number()
    .min(0, "Debts to Pay must be a positive number")
    .required("Debts to Pay is required"),
  debtsOwed: Yup.number()
    .min(0, "Debts Owed must be a positive number")
    .required("Debts Owed is required"),
});

const FinancialInfoForm = () => {
  const router = useRouter();
  const [error, setError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    // Clear previous messages
    setError("");
    setSuccessMessage("");

    try {
      const token = Cookies.get('token'); // Get the token using js-cookie

      const response = await axios.post(
        'https://ibos-deploy.vercel.app/register/personal-info/financial-info',
        {
          salary: values.salary,
          saving: values.saving,
          expenses: values.expenses,
          investments: values.investments,
          debtsToPay: values.debtsToPay,
          debtsOwed: values.debtsOwed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        setSuccessMessage("Information submitted successfully!");
        // Navigate to the home page
        router.push("/home");
      } else {
        setError(response.data.message || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setError(error.response?.data?.message || "An error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        salary: "",
        saving: "",
        expenses: "",
        investments: "",
        debtsToPay: "",
        debtsOwed: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <motion.div
          initial={{ y: -25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.25 }}
        >
          <Form>
            <div>
              <h1 className="text-3xl font-semibold">Financial Information</h1>
              <h2 className="text-xl font-medium">To Get Started</h2>
            </div>
            <div className="mt-12">
              <div className="flex flex-col gap-6">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Field
                      id="salary"
                      name="salary"
                      type="number"
                      className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                      placeholder="Salary"
                    />
                    <ErrorMessage
                      name="salary"
                      component="div"
                      className="text-red-500 text-sm ms-1"
                    />
                  </div>
                  <div className="flex-1">
                    <Field
                      id="saving"
                      name="saving"
                      type="number"
                      className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                      placeholder="Savings"
                    />
                    <ErrorMessage
                      name="saving"
                      component="div"
                      className="text-red-500 text-sm ms-1"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Field
                      id="expenses"
                      name="expenses"
                      type="number"
                      className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                      placeholder="Expenses"
                    />
                    <ErrorMessage
                      name="expenses"
                      component="div"
                      className="text-red-500 text-sm ms-1"
                    />
                  </div>
                  <div className="flex-1">
                    <Field
                      id="investments"
                      name="investments"
                      type="number"
                      className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                      placeholder="Investments"
                    />
                    <ErrorMessage
                      name="investments"
                      component="div"
                      className="text-red-500 text-sm ms-1"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Field
                      id="debts-to-pay"
                      name="debtsToPay"
                      type="number"
                      className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                      placeholder="Debts to Pay"
                    />
                    <ErrorMessage
                      name="debtsToPay"
                      component="div"
                      className="text-red-500 text-sm ms-1"
                    />
                  </div>
                  <div className="flex-1">
                    <Field
                      id="debts-owed"
                      name="debtsOwed"
                      type="number"
                      className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                      placeholder="Debts Owed"
                    />
                    <ErrorMessage
                      name="debtsOwed"
                      component="div"
                      className="text-red-500 text-sm ms-1"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8">
                {error && (
                  <p className="mt-5 text-red-600 bg-red-100 text-sm w-fit mx-auto px-3 py-1 rounded-full">
                    {error}
                  </p>
                )}
                {successMessage && (
                  <p className="mt-5 text-green-600 bg-green-100 text-sm w-fit mx-auto px-3 py-1 rounded-full">
                    {successMessage}
                  </p>
                )}
              </div>
              <div className="mt-8">
                <button
                  className={`w-full rounded-lg p-4 text-white ${!isValid || !dirty ? "bg-gray-400" : "bg-button-gradient"}`}
                  type="submit"
                  disabled={!isValid || isSubmitting || !dirty}
                >
                  {isSubmitting ? "Submitting..." : "Continue"}
                </button>
              </div>
            </div>
          </Form>
        </motion.div>
      )}
    </Formik>
  );
}

export default withAuth(FinancialInfoForm);