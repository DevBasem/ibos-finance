"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axios from "axios";
import PageHeader from "../components/main/PageHeader";

const CountryDropdown = dynamic(
  () =>
    import("react-country-region-selector").then((mod) => mod.CountryDropdown),
  { ssr: false }
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
      `Year must be before ${new Date().getFullYear()}`
    )
    .required("Year is required"),
  salary: Yup.number().required("Salary is required"),
  savings: Yup.number().required("Savings is required"),
  expenses: Yup.number().required("Expenses are required"),
  investments: Yup.number().required("Investments are required"),
  debtsToPay: Yup.number().required("Debts to Pay is required"),
  debtsOwed: Yup.number().required("Debts Owed is required"),
});

const Settings = () => {
  const [initialValues, setInitialValues] = useState({
    fullName: "",
    gender: "",
    country: "",
    day: "",
    month: "",
    year: "",
    salary: "",
    savings: "",
    expenses: "",
    investments: "",
    debtsToPay: "",
    debtsOwed: ""
  });
  const [image, setImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch the existing data (e.g., from localStorage or an API)
    const fetchedData = JSON.parse(localStorage.getItem("personalInfo")) || {};
    const fetchedFinancialData = JSON.parse(localStorage.getItem("financialInfo")) || {};

    setInitialValues({
      ...fetchedData,
      ...fetchedFinancialData
    });
  }, []);

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      // Handle account deletion logic here
      axios.delete("/api/delete-account")
        .then(response => {
          alert("Account deleted successfully.");
          router.push("/login"); // Redirect to login page after deletion
        })
        .catch(error => {
          alert("An error occurred while deleting the account.");
        });
    }
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // Update user data
    localStorage.setItem("personalInfo", JSON.stringify(values));
    localStorage.setItem("financialInfo", JSON.stringify(values));
    setSubmitting(false);
    router.push("/settings");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <PageHeader title="Settings" subtitle="Update your information" />
          <div className="mt-12">
            {/* Personal Information */}
            <div className="flex flex-col gap-6">
              <div>
                <Field
                  id="fullName"
                  name="fullName"
                  type="text"
                  className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
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
                  className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
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
                  value={initialValues.country}
                  onChange={(val) => {
                    setFieldValue("country", val);
                  }}
                  className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
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

            {/* Financial Information */}
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
                      className="text-red-500"
                    />
                  </div>
                  <div className="flex-1">
                    <Field
                      id="savings"
                      name="savings"
                      type="number"
                      className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                      placeholder="Savings"
                    />
                    <ErrorMessage
                      name="savings"
                      component="div"
                      className="text-red-500"
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
                      className="text-red-500"
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
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Field
                      id="debtsToPay"
                      name="debtsToPay"
                      type="number"
                      className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                      placeholder="Debts to Pay"
                    />
                    <ErrorMessage
                      name="debtsToPay"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="flex-1">
                    <Field
                      id="debtsOwed"
                      name="debtsOwed"
                      type="number"
                      className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                      placeholder="Debts Owed"
                    />
                    <ErrorMessage
                      name="debtsOwed"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div className="mt-12">
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full rounded-lg border p-4"
              />
              {image && (
                <div className="mt-4">
                  <img src={image} alt="Uploaded preview" className="w-32 h-32 object-cover rounded-lg" />
                </div>
              )}
            </div>

            {/* Account Deletion */}
            <div className="mt-8">
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="w-full rounded-lg bg-red-500 p-4 text-white"
              >
                Delete Account
              </button>
            </div>

            <div className="mt-8">
              <button
                className="w-full rounded-lg bg-button-gradient p-4 text-white"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Settings;
