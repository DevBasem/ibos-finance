"use client";
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

const chartdata = [
  {
    date: "Jan 22",
    SolarPanels: 2890,
    Inverters: 2338,
  },
  {
    date: "Feb 22",
    SolarPanels: 2756,
    Inverters: 2103,
  },
  {
    date: "Mar 22",
    SolarPanels: 3322,
    Inverters: 2194,
  },
  {
    date: "Apr 22",
    SolarPanels: 3470,
    Inverters: 2108,
  },
  {
    date: "May 22",
    SolarPanels: 3475,
    Inverters: 1812,
  },
  {
    date: "Jun 22",
    SolarPanels: 3129,
    Inverters: 1726,
  },
  {
    date: "Jul 22",
    SolarPanels: 3490,
    Inverters: 1982,
  },
  {
    date: "Aug 22",
    SolarPanels: 2903,
    Inverters: 2012,
  },
  {
    date: "Sep 22",
    SolarPanels: 2643,
    Inverters: 2342,
  },
  {
    date: "Oct 22",
    SolarPanels: 2837,
    Inverters: 2473,
  },
  {
    date: "Nov 22",
    SolarPanels: 2954,
    Inverters: 3848,
  },
  {
    date: "Dec 22",
    SolarPanels: 3239,
    Inverters: 3736,
  },
];

const data = [
  {
    name: "Viola Amherd",
    Role: "Federal Councillor",
    departement:
      "The Federal Department of Defence, Civil Protection and Sport (DDPS)",
    status: "active",
  },
  {
    name: "Albert Rösti",
    Role: "Federal Councillor",
    departement:
      "The Federal Department of the Environment, Transport, Energy and Communications (DETEC)",
    status: "active",
  },
  {
    name: "Beat Jans",
    Role: "Federal Councillor",
    departement: "The Federal Department of Justice and Police (FDJP)",
    status: "active",
  },
  {
    name: "Ignazio Cassis",
    Role: "Federal Councillor",
    departement: "The Federal Department of Foreign Affairs (FDFA)",
    status: "active",
  },
  {
    name: "Karin Keller-Sutter",
    Role: "Federal Councillor",
    departement: "The Federal Department of Finance (FDF)",
    status: "active",
  },
  {
    name: "Guy Parmelin",
    Role: "Federal Councillor",
    departement:
      "The Federal Department of Economic Affairs, Education and Research (EAER)",
    status: "active",
  },
  {
    name: "Elisabeth Baume-Schneider",
    Role: "Federal Councillor",
    departement: "The Federal Department of Home Affairs (FDHA)",
    status: "active",
  },
];

const dataFormatter = (number) =>
  `$${Intl.NumberFormat("us").format(number).toString()}`;

export default function home() {
  return (
    <section>
      <h2 className="text-main-dark-primary dark:text-white flex flex-col py-8 text-4xl font-extrabold">
        <span>Welcome back,</span>
        <span>Basem</span>
      </h2>

      {/* cards */}
      <div className="flex gap-5">
        <Card className="flex-1 bg-main-light-secondary dark:bg-main-dark-secondary dark:border-main-dark-secondary dark:text-white border-stone-200 shadow-xl">
          <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Sales
          </h4>
          <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            $71,465
          </p>
          <p className="mt-4 flex items-center justify-between text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            <span>32% of annual target</span>
            <span>$225,000</span>
          </p>
          <ProgressBar value={32} className="mt-2" />
        </Card>

        <Card className="flex-1 bg-main-light-secondary dark:bg-main-dark-secondary dark:border-main-dark-secondary dark:text-white border-stone-200 shadow-xl">
          <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Sales
          </h4>
          <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            $71,465
          </p>
          <p className="mt-4 flex items-center justify-between text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            <span>32% of annual target</span>
            <span>$225,000</span>
          </p>
          <ProgressBar value={32} className="mt-2" />
        </Card>

        <Card className="flex-1 bg-main-light-secondary dark:bg-main-dark-secondary dark:border-main-dark-secondary dark:text-white border-stone-200 shadow-xl">
          <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Sales
          </h4>
          <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            $71,465
          </p>
          <p className="mt-4 flex items-center justify-between text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            <span>32% of annual target</span>
            <span>$225,000</span>
          </p>
          <ProgressBar value={32} className="mt-2" />
        </Card>

        <Card className="flex-1 bg-main-light-secondary dark:bg-main-dark-secondary dark:border-main-dark-secondary dark:text-white border-stone-200 shadow-xl">
          <h4 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            Sales
          </h4>
          <p className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            $71,465
          </p>
          <p className="mt-4 flex items-center justify-between text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            <span>32% of annual target</span>
            <span>$225,000</span>
          </p>
          <ProgressBar value={32} className="mt-2" />
        </Card>
      </div>

      {/* chart */}
      <div className="bg-main-light-secondary dark:bg-main-dark-secondary dark:border-main-dark-secondary dark:text-white my-4 rounded-lg border border-stone-200 p-4 shadow-xl">
        <h2 className="pb-4 text-xl font-bold">Markets</h2>
        <AreaChart
          className="min-h-[400px]"
          data={chartdata}
          index="date"
          categories={["SolarPanels", "Inverters"]}
          colors={["indigo", "rose"]}
          valueFormatter={dataFormatter}
          yAxisWidth={60}
          showGridLines={false}
          onValueChange={(v) => console.log(v)}
        />
      </div>

      {/* table */}
      <div className="bg-main-light-secondary dark:bg-main-dark-secondary dark:border-main-dark-secondary dark:text-white my-4 rounded-lg border border-stone-200 p-4 shadow-xl">
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
              {data.map((item) => (
                <TableRow key={item.name}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.Role}</TableCell>
                  <TableCell>{item.departement}</TableCell>
                  <TableCell>
                    <Badge color="emerald" icon={RiFlag2Line}>
                      {item.status}
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
