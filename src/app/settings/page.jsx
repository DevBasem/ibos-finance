"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axios from "axios";
import PageHeader from "../components/main/PageHeader";
import { Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Cookie from "js-cookie";

const CountryDropdown = dynamic(
  () =>
    import("react-country-region-selector").then((mod) => mod.CountryDropdown),
  { ssr: false },
);

const validationSchema = Yup.object({
  fullName: Yup.string().min(3, "Full Name must be at least 3 characters"),
  gender: Yup.string(),
  country: Yup.string(),
  day: Yup.number().min(1, "Day must be between 1 and 31").max(31, "Day must be between 1 and 31"),
  month: Yup.number().min(1, "Month must be between 1 and 12").max(12, "Month must be between 1 and 12"),
  year: Yup.number().min(1900, "Year must be after 1900").max(new Date().getFullYear(), `Year must be before ${new Date().getFullYear()}`),
  salary: Yup.number(),
  saving: Yup.number(),
  expenses: Yup.number(),
  investments: Yup.number(),
  debtsToPay: Yup.number(),
  debtsOwed: Yup.number(),
});

const Settings = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const [country, setCountry] = useState("");
  const [initialValues, setInitialValues] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookie.get("token");

      try {
        const response = await axios.get("https://ibos-deploy.vercel.app/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data.user;
        const birthday = new Date(user.birthday);

        setInitialValues({
          fullName: user.fullName || "",
          gender: user.gender || "",
          country: user.country || "",
          day: birthday.getDate() || "",
          month: birthday.getMonth() + 1 || "",
          year: birthday.getFullYear() || "",
          salary: user.salary || "",
          saving: user.saving || "",
          expenses: user.expenses || "",
          investments: user.investments || "",
          debtsToPay: user.debtsToPay || "",
          debtsOwed: user.debtsOwed || "",
        });
        setCountry(user.country || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
        setResponseMessage("Failed to load user data.");
      }
    };

    const timer = setTimeout(() => {
      fetchUserData();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        const token = Cookie.get("token");

        await axios.delete(
          "https://ibos-deploy.vercel.app/settings/update-info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        Cookie.remove("token");
        Cookie.remove("userId");

        router.push("/login");
      } catch (error) {
        console.error("An error occurred while deleting the account:", error);
        alert("An error occurred while deleting the account.");
      }
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const token = Cookie.get("token");

    try {
      const response = await axios.put(
        "https://ibos-deploy.vercel.app/settings/update-info",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      setResponseMessage(response.data.message || "Information updated successfully.");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error updating information:", error);
      setResponseMessage(
        error.response?.data?.message || "An error occurred while updating your information.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!initialValues) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex space-x-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-violet-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting, setFieldValue, values }) => (
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
                <ErrorMessage name="fullName" component="div" className="text-red-500" />
              </div>
              <div>
                <div className="relative">
                  <Select
                    as="select"
                    id="gender"
                    name="gender"
                    value={values.gender || ""}
                    onChange={(e) => setFieldValue("gender", e.target.value)}
                    className="block w-full appearance-none rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Select>
                  <ChevronDownIcon
                    className="absolute right-2.5 top-5 size-5 fill-gray-500"
                    aria-hidden="true"
                  />
                </div>
                <ErrorMessage name="gender" component="div" className="text-red-500" />
              </div>
              <div>
                <div className="relative">
                  <CountryDropdown
                    value={country}
                    onChange={(val) => {
                      setCountry(val);
                      setFieldValue("country", val);
                    }}
                    className="block w-full appearance-none rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                  />
                  <ChevronDownIcon
                    className="absolute right-2.5 top-5 size-5 fill-gray-500"
                    aria-hidden="true"
                  />
                </div>
                <ErrorMessage name="country" component="div" className="text-red-500" />
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
                  <ErrorMessage name="day" component="div" className="text-red-500" />
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
                  <ErrorMessage name="month" component="div" className="text-red-500" />
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
                  <ErrorMessage name="year" component="div" className="text-red-500" />
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
                    <ErrorMessage name="salary" component="div" className="text-red-500" />
                  </div>
                  <div className="flex-1">
                    <Field
                      id="saving"
                      name="saving"
                      type="number"
                      className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                      placeholder="Saving"
                    />
                    <ErrorMessage name="saving" component="div" className="text-red-500" />
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
                    <ErrorMessage name="expenses" component="div" className="text-red-500" />
                  </div>
                  <div className="flex-1">
                    <Field
                      id="investments"
                      name="investments"
                      type="number"
                      className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                      placeholder="Investments"
                    />
                    <ErrorMessage name="investments" component="div" className="text-red-500" />
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
                    <ErrorMessage name="debtsToPay" component="div" className="text-red-500" />
                  </div>
                  <div className="flex-1">
                    <Field
                      id="debtsOwed"
                      name="debtsOwed"
                      type="number"
                      className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                      placeholder="Debts Owed"
                    />
                    <ErrorMessage name="debtsOwed" component="div" className="text-red-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Response Message */}
          {responseMessage && (
            <div className="mt-4 text-center text-green-500">{responseMessage}</div>
          )}

          {/* Account Deletion */}
          <div className="mt-8 flex gap-4 max-sm:flex-col">
            <div className="flex-1">
              <button
                type="button"
                onClick={handleDeleteAccount}
                className="w-full rounded-lg bg-red-500 p-4 text-white"
              >
                Delete Account
              </button>
            </div>

            {/* Update Information */}
            <div className="flex-1">
              <button
                className="w-full rounded-lg bg-button-gradient p-4 text-white"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update Information"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Settings;