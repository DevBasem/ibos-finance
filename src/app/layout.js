import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import "./globals.css";
import ClientPathnameChecker from "./components/ClientPathnameChecker";
import { cn } from "./lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["variable"],
  variable: "--font-sans",
});

export const metadata = {
  title: "IBOS Finance",
  description: "Your Favorite Finance App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <ClientPathnameChecker>{children}</ClientPathnameChecker>
      </body>
    </html>
  );
}
