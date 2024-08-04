"use client";
import { motion } from "framer-motion";

export default function Welcome() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1.0 }}
    >
      <main className="grid min-h-screen place-content-center bg-main-gradient text-white">
        <div>
          <h2 className="text-[32px] font-semibold leading-6">Welcome to</h2>
          <h1 className="text-[64px] font-extrabold">IBOS Finance</h1>
        </div>
      </main>
    </motion.div>
  );
}
