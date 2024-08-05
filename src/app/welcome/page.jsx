"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Welcome() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); // Start exit animation
      setTimeout(() => {
        router.push("/login"); // Navigate after exit animation completes
      }, 1000); // Match the duration of the exit animation (1 second)
    }, 2000); // Delay before starting the exit animation (2 seconds)

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <AnimatePresence>
      {isVisible && (
        <main className="grid min-h-screen place-content-center bg-main-gradient text-white">
          <motion.div
            key="welcome-modal"
            initial={{ y: -15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
            transition={{ ease: "easeInOut", duration: 1.0 }}
          >
            <div>
              <h2 className="text-[32px] font-semibold leading-6 max-sm:text-[16px] max-sm:leading-[5px]">
                Welcome to
              </h2>
              <h1 className="text-[64px] font-extrabold max-sm:text-[32px]">
                IBOS Finance
              </h1>
            </div>
          </motion.div>
        </main>
      )}
    </AnimatePresence>
  );
}
