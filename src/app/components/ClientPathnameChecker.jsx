"use client";
import { usePathname } from "next/navigation";
import AuthLayout from "../layouts/auth/layout";
import InfoLayout from "../layouts/info/layout";
import MainLayout from "../layouts/main/layout";

export default function ClientPathnameChecker({ children }) {
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isInfoPage =
    pathname === "/register/personal-info" ||
    pathname === "/register/personal-info/financial-info";
  const isMainPage =
    pathname === "/home" ||
    pathname === "/investments" ||
    pathname === "/recommendations" ||
    pathname === "/settings";

  if (isAuthPage) {
    return <AuthLayout>{children}</AuthLayout>;
  }

  if (isInfoPage) {
    return <InfoLayout>{children}</InfoLayout>;
  }

  if (isMainPage) {
    return <MainLayout>{children}</MainLayout>;
  }

  return <>{children}</>;
}
