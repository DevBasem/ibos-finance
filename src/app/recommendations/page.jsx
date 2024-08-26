"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import PageHeader from "../components/main/PageHeader";
import { Card } from "@tremor/react";

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const token = Cookies.get("token");

      try {
        const response = await fetch(
          "https://ibos-deploy.vercel.app/ai-recommendations",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const result = await response.json();
          setRecommendations(result.data.recommendation);
        } else {
          console.error("Failed to fetch recommendations");
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex space-x-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-violet-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (recommendations === null) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <p className="text-xl font-bold text-gray-500">
          There is no Recommendations currently
        </p>
      </div>
    );
  }

  return (
    <section className="p-4 md:p-6 lg:p-8">
      <PageHeader
        title="Recommendations"
        subtitle="AI Generated Recommendations"
      />
      <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:flex-wrap">
        {recommendations.map((rec, index) => (
          <Card
            key={index}
            className="min-w-full flex-1 border-stone-200 bg-white shadow-lg dark:border-main-dark-secondary dark:bg-main-dark-secondary dark:text-white sm:w-1/2 sm:min-w-0 lg:w-1/3 xl:w-1/4"
          >
            <div className="p-4">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                #{rec.rank} - {rec.companyName} ({rec.symbol})
              </h4>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
                {rec.reasons.map((reason, reasonIndex) => (
                  <li key={reasonIndex} className="mt-1">
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
