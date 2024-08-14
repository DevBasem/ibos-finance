import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = [
  "/home",
  "/market",
  "/investments",
  "/portfolio",
  "/settings",
];

export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (protectedRoutes.includes(pathname)) {
    // Use the cookies utility from next/headers
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    console.log("Token from cookies:", token); // Debugging line

    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If token exists or route is not protected, continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/market", "/investments", "/portfolio", "/settings"],
};