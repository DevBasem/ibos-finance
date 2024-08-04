"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Welcome from "./welcome/page";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 2000); // 8000 milliseconds = 8 seconds

    // Cleanup the timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return <Welcome />;
}
