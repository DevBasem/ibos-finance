"use client";
import { Card, ProgressBar } from "@tremor/react";
import { Icon } from "@iconify/react";
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
import PageHeader from "../components/main/PageHeader"

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

export default function Investments() {
  return (<div>
    <section>
      <PageHeader title="Welcome back," subtitle="Basem" />
      <Card className="flex space-x-4 justify-between px-4 bg-main-light-secondary dark:bg-main-dark-secondary dark:border-main-dark-secondary dark:text-white border-stone-200 shadow-xl">
        <div className="flex gap-4 items-center">
          <label className="text-xl font-bold" htmlFor="budget">Available budget:</label>
          <div className="flex items-center relative">
            <input
              className="px-4 py-3 min-w-72 text-black pr-8 rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none placeholder:text-zinc-500 placeholder:font-bold"
              type="number"
              placeholder="5000$"
            />
            <Icon className="text-black absolute right-2 text-xl" icon="majesticons:edit-pen-2" />
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <label className="text-xl font-bold" htmlFor="filters">Filters:</label>
          <div className="flex items-center">
            <select
              className="px-4 py-3 min-w-72 font-bold text-zinc-500 pr-8 rounded-lg border p-4 focus:shadow-input-shadow focus:outline-none"
            >
              <option value="" disabled>Select filter</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
        </div>
      </Card>

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
  </div>);
}
