"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function FinancialInfoForm() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/register/personal-info");
  };

  return (
    <motion.div
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.25 }}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <h1 className="text-3xl font-semibold">Financial Information</h1>
          <h2 className="text-xl font-medium">To Get Started</h2>
        </div>
        <div className="mt-12">
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="salary" className="sr-only">
                  Salary
                </label>
                <input
                  id="salary"
                  name="salary"
                  type="number"
                  className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                  placeholder="Salary"
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="savings" className="sr-only">
                  Savings
                </label>
                <input
                  id="savings"
                  name="savings"
                  type="number"
                  className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                  placeholder="Savings"
                  required
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="expenses" className="sr-only">
                  Expenses
                </label>
                <input
                  id="expenses"
                  name="expenses"
                  type="number"
                  className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                  placeholder="Expenses"
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="investments" className="sr-only">
                  Investments
                </label>
                <input
                  id="investments"
                  name="investments"
                  type="number"
                  className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                  placeholder="Investments"
                  required
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label htmlFor="debts-to-pay" className="sr-only">
                  Debts to Pay
                </label>
                <input
                  id="debts-to-pay"
                  name="debtsToPay"
                  type="number"
                  className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                  placeholder="Debts to Pay"
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="debts-owed" className="sr-only">
                  Debts Owed
                </label>
                <input
                  id="debts-owed"
                  name="debtsOwed"
                  type="number"
                  className="block w-full rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
                  placeholder="Debts Owed"
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
