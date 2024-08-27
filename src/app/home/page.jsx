"use client";
import { useState, useEffect, useMemo } from "react";
import { Card, ProgressBar } from "@tremor/react";
import { AreaChart } from "@tremor/react";
import { RiFlag2Line } from "@remixicon/react";
import {
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import Cookies from "js-cookie";
import PageHeader from "../components/main/PageHeader";
import { Icon } from "@iconify/react";

const fetchMarketData = async (token) => {
  try {
    const response = await fetch("https://ibos-deploy.vercel.app/home", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      return result.data;
    } else {
      throw new Error("Failed to fetch market data");
    }
  } catch (error) {
    console.error("Error fetching market data:", error);
    throw error;
  }
};

export default function Home() {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      console.error("No token found");
      setLoading(false);
      return;
    }

    fetchMarketData(token)
      .then(data => {
        setMarketData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const chartData = useMemo(() => {
    if (!marketData) return [];
    return marketData.gold_history.map((item) => ({
      date: item.date,
      GoldPrice: item.price,
    }));
  }, [marketData]);

  const dataFormatter = useMemo(() => (number) =>
    `$${Intl.NumberFormat("us").format(number).toString()}`, []);

  const iconMap = useMemo(() => ({
    aapl: "bi:apple",
    amzn: "ri:amazon-fill",
    meta: "mingcute:meta-fill",
  }), []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex space-x-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-violet-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (marketData === null) {
    return (
      <div>
        <PageHeader title="Welcome back," subtitle="" />
        <div className="flex min-h-[calc(100vh-250px)] items-center justify-center p-4">
          <p className="text-center text-lg font-bold text-red-500">
            Please FIX THE Backend API, thank you
          </p>
        </div>
      </div>
    );
  }

  return (
    <section>
      <PageHeader title="Welcome back," subtitle={marketData.user.name} />

      {/* cards */}
      <div className="flex flex-wrap gap-5">
        {Object.entries(marketData.items).map(([key, item]) => (
          <Card
            key={key}
            className="min-w-64 flex-1 border-stone-200 bg-main-light-secondary shadow-xl dark:border-main-dark-secondary dark:bg-main-dark-secondary dark:text-white"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                {item.name}
              </h4>
              <Icon className="h-10 w-10" icon={iconMap[key]} />
            </div>
            <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {dataFormatter(item.price)}
            </p>
            <p className="mt-4 flex items-center justify-between text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              <span>32% of annual target</span>
              <span>$225,000</span>
            </p>
            <ProgressBar value={32} className="mt-2" />
          </Card>
        ))}
      </div>

      {/* chart */}
      <div className="my-4 rounded-lg border border-stone-200 bg-main-light-secondary p-4 shadow-xl dark:border-main-dark-secondary dark:bg-main-dark-secondary dark:text-white">
        <h2 className="pb-4 text-xl font-bold">Gold Price History</h2>
        <AreaChart
          className="min-h-[400px]"
          data={chartData}
          index="date"
          categories={["GoldPrice"]}
          colors={["indigo"]}
          valueFormatter={dataFormatter}
          yAxisWidth={60}
          showGridLines={false}
          onValueChange={(v) => console.log(v)}
        />
      </div>

      {/* table */}
      {marketData.DealCompanies.length > 0 ? (
        <div className="my-4 rounded-lg border border-stone-200 bg-main-light-secondary p-4 shadow-xl dark:border-main-dark-secondary dark:bg-main-dark-secondary dark:text-white">
          <h2 className="pb-4 text-xl font-bold">Deals Details</h2>
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Company Name</TableHeaderCell>
                  <TableHeaderCell>Market Cap</TableHeaderCell>
                  <TableHeaderCell>Sector</TableHeaderCell>
                  <TableHeaderCell>Price</TableHeaderCell>
                  <TableHeaderCell>Country</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {marketData.DealCompanies.map((company, index) => (
                  <TableRow key={index}>
                    <TableCell>{company.companyName}</TableCell>
                    <TableCell>{dataFormatter(company.marketCap)}</TableCell>
                    <TableCell>{company.sector}</TableCell>
                    <TableCell>{dataFormatter(company.price)}</TableCell>
                    <TableCell>{company.country}</TableCell>
                    <TableCell>
                      <Badge
                        color={company.dealDone ? "emerald" : "red"}
                        icon={RiFlag2Line}
                      >
                        {company.dealDone ? "Completed" : "Pending"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ) : (
        <div className="my-4 rounded-lg border border-stone-200 bg-main-light-secondary p-4 shadow-xl dark:border-main-dark-secondary dark:bg-main-dark-secondary dark:text-white">
          <h2 className="pb-4 text-xl font-bold">Deals Details</h2>
          <p className="text-lg font-bold text-gray-500">No deals available</p>
        </div>
      )}
    </section>
  );
}
