"use client";
import { useEffect, useState } from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { Icon } from "@iconify/react";
import PageHeader from "../components/main/PageHeader";
import Cookies from "js-cookie";

export default function Investments() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [budget, setBudget] = useState(0); // New state for budget
  const [page, setPage] = useState(1); // New state for pagination (if applicable)
  const [loading, setLoading] = useState(true);

  const fetchFilteredData = async () => {
    const token = Cookies.get("token");
    try {
      const response = await fetch(
        "https://ibos-deploy.vercel.app/filteredInvestment-recommedations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            filters: selectedFilter ? [selectedFilter] : [],
            page: page,
            budget: budget,
          }),
        },
      );
      const result = await response.json();
      if (result.status === "success") {
        setData(result.data);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const token = Cookies.get("token");
      try {
        const response = await fetch(
          "https://ibos-deploy.vercel.app/investment-recommedations",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const result = await response.json();
        if (result.status === "success") {
          setFilters(result.data.filters);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchFilteredData();
  }, [selectedFilter, budget, page]);

  const dataFormatter = (number) =>
    Intl.NumberFormat("us").format(number).toString();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex space-x-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-violet-500 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section>
        <PageHeader title="Investments" subtitle="" />
        <Card className="flex flex-wrap justify-between gap-4 border-stone-200 bg-main-light-secondary px-4 shadow-xl dark:border-main-dark-secondary dark:bg-main-dark-secondary dark:text-white">
          <div className="flex items-center gap-4 max-xl:flex-1 max-xl:flex-col max-xl:items-start max-xl:gap-2">
            <label
              className="whitespace-nowrap text-xl font-bold max-xl:text-lg"
              htmlFor="budget"
            >
              Available budget:
            </label>
            <div className="relative flex w-full items-center">
              <input
                className="w-full min-w-72 rounded-lg border p-4 px-4 py-3 pr-8 text-black placeholder:font-bold placeholder:text-zinc-500 focus:shadow-input-shadow focus:outline-none"
                type="number"
                placeholder="5000$"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
              />
              <Icon
                className="absolute right-2 text-xl text-black"
                icon="majesticons:edit-pen-2"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 max-xl:flex-1 max-xl:flex-col max-xl:items-start max-xl:gap-2">
            <label
              className="text-xl font-bold max-xl:text-lg"
              htmlFor="filters"
            >
              Filters:
            </label>
            <div className="flex w-full items-center">
              <select
                className="w-full min-w-72 rounded-lg border p-4 px-4 py-3 pr-8 font-bold text-zinc-500 focus:shadow-input-shadow focus:outline-none"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="" disabled>
                  Select filter
                </option>
                {filters.map((filter) => (
                  <option key={filter} value={filter}>
                    {filter}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* table */}
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
                  <TableHeaderCell>Volume</TableHeaderCell>
                  <TableHeaderCell>Country</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.symbol}>
                    <TableCell>{item.companyName}</TableCell>
                    <TableCell>{dataFormatter(item.marketCap)}</TableCell>
                    <TableCell>{item.sector || "N/A"}</TableCell>
                    <TableCell>{dataFormatter(item.price)}</TableCell>
                    <TableCell>{dataFormatter(item.volume)}</TableCell>
                    <TableCell>{item.country || "N/A"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </section>
    </div>
  );
}
