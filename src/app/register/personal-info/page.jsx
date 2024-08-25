"use client";
import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Cookies from 'js-cookie';
import axios from 'axios';
import { Select } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import withAuth from "../../utils/withAuth";

const CountryDropdown = dynamic(
  () =>
    import("react-country-region-selector").then((mod) => mod.CountryDropdown),
  { ssr: false },
);

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(3, "Full Name must be at least 3 characters")
    .required("Full Name is required"),
  gender: Yup.string().required("Gender is required"),
  country: Yup.string().required("Country is required"),
  day: Yup.number()
    .min(1, "Day must be between 1 and 31")
    .max(31, "Day must be between 1 and 31")
    .required("Day is required"),
  month: Yup.number()
    .min(1, "Month must be between 1 and 12")
    .max(12, "Month must be between 1 and 12")
    .required("Month is required"),
  year: Yup.number()
    .min(1900, "Year must be after 1900")
    .max(
      new Date().getFullYear(),
      `Year must be before ${new Date().getFullYear()}`,
    )
    .required("Year is required"),
});

const PersonalInfoForm = () => {
  const [country, setCountry] = React.useState("");
  const [error, setError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const router = useRouter();

  const handleSubmit = async (values, { setSubmitting }) => {
    // Clear previous messages
    setError("");
    setSuccessMessage("");

    try {
      const token = Cookies.get('token'); // Get the token using js-cookie

      const response = await axios.post(
        'https://ibos-deploy.vercel.app/register/personal-info',
        {
          fullName: values.fullName,
          gender: values.gender,
          country: values.country,
          day: values.day,
          month: values.month,
          year: values.year,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );

      if (response.data.status === "success") {
        setSuccessMessage("Information submitted successfully!");
        // Navigate to the next page
        router.push("/register/personal-info/financial-info");
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
        fullName: "",
        gender: "",
        country: "",
        day: "",
        month: "",
        year: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty, setFieldValue, setFieldTouched }) => (
        <motion.div
          initial={{ y: -25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.25 }}
        >
          <Form>
            <div>
              <h1 className="text-3xl font-semibold">Personal Information</h1>
              <h2 className="text-xl font-medium">to get started</h2>
            </div>
            <div className="mt-12">
              <div className="flex flex-col gap-6">
                <div>
                  <Field
                    id="full-name"
                    name="fullName"
                    type="text"
                    className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none md:w-[455px]"
                    placeholder="Full Name"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 text-sm ms-1"
                  />
                </div>
                <div>
                  <div className="relative">
                    <Select
                      as="select"
                      id="gender"
                      name="gender"
                      onChange={(e) => setFieldValue("gender", e.target.value)}
                      className="block w-full appearance-none rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                    >
                      <option value="" disabled>Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Select>
                    <ChevronDownIcon className="absolute top-5 right-2.5 size-5 fill-gray-500" aria-hidden="true" />
                  </div>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500 text-sm ms-1"
                  />
                </div>
                <div>
                  <div className="relative">
                    <CountryDropdown
                      value={country}
                      onChange={(val) => {
                        setCountry(val);
                        setFieldValue("country", val);
                      }}
                      onBlur={() => setFieldTouched("country", true)}
                      className="block appearance-none w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none md:w-[455px]"
                    />
                    <ChevronDownIcon className="absolute top-5 right-2.5 size-5 fill-gray-500" aria-hidden="true" />
                  </div>
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-red-500 text-sm ms-1"
                  />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Field
                      id="day"
                      name="day"
                      type="number"
                      className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                      placeholder="Day"
                      min="1"
                      max="31"
                    />
                    <ErrorMessage
                      name="day"
                      component="div"
                      className="text-red-500 text-sm ms-1"
                    />
                  </div>
                  <div className="flex-1">
                    <Field
                      id="month"
                      name="month"
                      type="number"
                      className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                      placeholder="Month"
                      min="1"
                      max="12"
                    />
                    <ErrorMessage
                      name="month"
                      component="div"
                      className="text-red-500 text-sm ms-1"
                    />
                  </div>
                  <div className="flex-1">
                    <Field
                      id="year"
                      name="year"
                      type="number"
                      className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                      placeholder="Year"
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                    <ErrorMessage
                      name="year"
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

export default withAuth(PersonalInfoForm);