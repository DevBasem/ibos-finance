import { motion } from "framer-motion";
import Image from "next/image";

export default function InfoLayout({ children }) {
  return (
    <main className="relative flex min-h-screen overflow-x-hidden">
      <motion.div
        initial={{
          width: "50%",
          borderBottomRightRadius: "1000rem",
          borderTopRightRadius: "1000rem",
        }}
        animate={{
          width: "100%",
          borderBottomRightRadius: "0rem",
          borderTopRightRadius: "0rem",
        }}
        transition={{ duration: 1.5 }}
        className="relative flex min-h-[calc(602px+2rem)] flex-col items-center justify-center bg-main-gradient xl:rounded-br-xl xl:rounded-tr-xl"
      ></motion.div>
      <div className="absolute flex h-full w-full justify-center">
        <motion.div
          initial={{ x: "100%", y: "-50%" }}
          animate={{ x: "0", y: "-50%" }}
          transition={{ type: "spring", stiffness: 50, duration: 1.5 }}
          className="absolute top-1/2 mx-4 -translate-y-1/2 rounded-3xl border-2 bg-white px-8 py-12"
        >
          {children}
        </motion.div>
      </div>
    </main>
  );
}
