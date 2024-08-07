"use client";
import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const CountryDropdown = dynamic(
  () =>
    import("react-country-region-selector").then((mod) => mod.CountryDropdown),
  { ssr: false },
);

export default function FinancialInfoForm() {
  const [country, setCountry] = React.useState("");

  const router = useRouter();

  const handleSubmit = () => {
    router.push("/register/personal-info");
  };

  return (
    <motion.div
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.25 }}
    >
      <form action="/">
        <div>
          <h1 className="text-3xl font-semibold">financial-info</h1>
          <h2 className="text-xl font-medium">to get started</h2>
        </div>
        <div className="mt-12">
          <div className="flex flex-col gap-6">
            <div>
              <label htmlFor="full-name" className="sr-only">
                Full Name
              </label>
              <input
                id="full-name"
                name="fullName"
                type="text"
                className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none md:w-[455px]"
                placeholder="Full Name"
                required
              />
            </div>
            <div>
              <label htmlFor="gender" className="sr-only">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none md:w-[455px]"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="country" className="sr-only">
                Country
              </label>
              <CountryDropdown
                value={country}
                onChange={(val) => setCountry(val)}
                className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none md:w-[455px]"
                required
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="day" className="sr-only">
                  Day
                </label>
                <input
                  id="day"
                  name="day"
                  type="number"
                  className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                  placeholder="Day"
                  min="1"
                  max="31"
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="month" className="sr-only">
                  Month
                </label>
                <input
                  id="month"
                  name="month"
                  type="number"
                  className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                  placeholder="Month"
                  min="1"
                  max="12"
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="year" className="sr-only">
                  Year
                </label>
                <input
                  id="year"
                  name="year"
                  type="number"
                  className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                  placeholder="Year"
                  min="1900"
                  max={new Date().getFullYear()}
                  required
                />
              </div>
            </div>
          </div>
          <div className="mt-8">
            <button
              className="w-full rounded-lg bg-button-gradient p-4 text-white"
              name="submit"
              type="submit"
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}
