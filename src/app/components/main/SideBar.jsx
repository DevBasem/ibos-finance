"use client";

import Avatar from "./Avatar";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SideBar() {
  const tabs = [
    { name: "Home", icon: "majesticons:home-analytics", route: "/home" },
    { name: "Market State", icon: "majesticons:money-line", route: "/market" },
    {
      name: "Investments",
      icon: "majesticons:presentation-chart",
      route: "/investments",
    },
    { name: "Portfolio Data", icon: "majesticons:user", route: "/portfolio" },
    { name: "Settings", icon: "majesticons:settings-cog", route: "/settings" },
    { name: "Logout", icon: "majesticons:logout", route: "/logout" },
  ];

  const pathname = usePathname();

  return (
    <aside className="px-4 py-10 overflow-y-auto max-h-screen">
      <Avatar />
      <nav className="pt-10" aria-label="Sidebar Navigation">
        <h2 className="pb-6 ps-3 text-xl font-bold leading-3">
          Navigation Tabs
        </h2>
        <ul className="flex flex-col space-y-1">
          {tabs.map((tab) => (
            <li key={tab.route}>
              <Link
                href={tab.route}
                className={`block w-full rounded p-4 text-left ${pathname === tab.route ? "bg-main-light-selected dark:bg-main-dark-selected" : ""
                  }`}
                aria-current={pathname === tab.route ? "page" : undefined}
              >
                <div className="-mx-2 flex items-center gap-2">
                  <Icon className="h-6 w-6" icon={tab.icon} />
                  <span className="text-[15px] font-medium"> {tab.name}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
