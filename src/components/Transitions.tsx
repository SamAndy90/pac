"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import Logo from "/src/resources/png/pac-logo.png";

export default function Transitions() {
  const pathname = usePathname();
  return (
    <AnimatePresence mode={"wait"}>
      <Fragment key={pathname}>
        <motion.div
          initial={{ y: "0%" }}
          animate={{ y: "100%" }}
          exit={{ y: ["-100%", "0%"] }}
          transition={{
            duration: 1.5,
            type: "spring",
          }}
          className={
            "fixed h-screen w-screen flex items-center justify-center bg-pka_blue inset-0 pointer-events-none z-[1000]"
          }
        >
          <Image
            src={Logo}
            alt={"Logo"}
            className={"w-[25%] animate-pulse duration-1500"}
            priority={true}
          />
        </motion.div>
      </Fragment>
    </AnimatePresence>
  );
}
