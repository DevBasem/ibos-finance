"use client";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import AuthLayout from "../layouts/auth/layout";
import InfoLayout from "../layouts/info/layout";
import MainLayout from "../layouts/main/layout";

export default function ClientPathnameChecker({ children }) {
  const pathname = usePathname();
  // const router = useRouter();
  // const { isAuthenticated } = useAuth();

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isInfoPage =
    pathname === "/register/personal-info" ||
    pathname === "/register/personal-info/financial-info";
  const isMainPage =
    pathname === "/home" ||
    pathname === "/market" ||
    pathname === "/investments" ||
    pathname === "/portfolio" ||
    pathname === "/settings";

  // if (isAuthPage && isAuthenticated) {
  //   router.push("/home");
  //   return null;
  // }

  // if (isMainPage && !isAuthenticated) {
  //   router.push("/login");
  //   return null;
  // }

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