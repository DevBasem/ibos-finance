"use client";
import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

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

export default function PersonalInfoForm() {
  const [country, setCountry] = React.useState("");
  const router = useRouter();

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    localStorage.setItem("personalInfo", JSON.stringify(values));
    setSubmitting(false);
    router.push("/register/personal-info/financial-info");
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
      {({ isSubmitting, setFieldValue }) => (
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
                    className="text-red-500"
                  />
                </div>
                <div>
                  <Field
                    as="select"
                    id="gender"
                    name="gender"
                    className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none md:w-[455px]"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  <CountryDropdown
                    value={country}
                    onChange={(val) => {
                      setCountry(val);
                      setFieldValue("country", val);
                    }}
                    className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none md:w-[455px]"
                  />
                  <ErrorMessage
                    name="country"
                    component="div"
                    className="text-red-500"
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
                      className="text-red-500"
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
                      className="text-red-500"
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
                      className="text-red-500"
                    />
                  </div>
                </div>
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
            </div>
          </Form>
        </motion.div>
      )}
    </Formik>
  );
}
