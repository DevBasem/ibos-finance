"use client";

import { usePathname } from "next/navigation";
import AuthLayout from "../auth/layout";

export default function ClientPathnameChecker({ children }) {
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register";

  return isAuthPage ? <AuthLayout>{children}</AuthLayout> : <>{children}</>;
}
