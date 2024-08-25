"use client";
import { useState, useEffect } from "react";
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

export default function Home() {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      const token = Cookies.get("token");

      try {
        const response = await fetch("https://ibos-deploy.vercel.app/home", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setMarketData(result.data);
        } else {
          console.error("Failed to fetch market data");
        }
      } catch (error) {
        console.error("Error fetching market data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
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

  const chartData = marketData.gold_history.map((item) => ({
    date: item.date,
    GoldPrice: item.price,
  }));

  const dataFormatter = (number) =>
    `$${Intl.NumberFormat("us").format(number).toString()}`;

  const iconMap = {
    aapl: "bi:apple",
    amzn: "ri:amazon-fill",
    meta: "mingcute:meta-fill",
  }

  return (
    <section>
      <PageHeader title="Welcome back," subtitle="Basem" />

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
      <div className="my-4 rounded-lg border border-stone-200 bg-main-light-secondary p-4 shadow-xl dark:border-main-dark-secondary dark:bg-main-dark-secondary dark:text-white">
        <h2 className="pb-4 text-xl font-bold">Deals Details</h2>
        <div>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Position</TableHeaderCell>
                <TableHeaderCell>Department</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {marketData.DealCompanies.map((company, index) => (
                <TableRow key={index}>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.Role}</TableCell>
                  <TableCell>{company.departement}</TableCell>
                  <TableCell>
                    <Badge color="emerald" icon={RiFlag2Line}>
                      {company.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}
