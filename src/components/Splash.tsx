"use client";

import { useSplashContext } from "@/contexts/Splash";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

export default function Splash() {
  const { isOpen, setIsOpen } = useSplashContext();
  // useGSAP(() => {
  //   let chars = new SplitText("split", { type: "chars" });
  // });

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsOpen(false);
  //   }, 2500);
  //   return () => {
  //     setIsOpen(true);
  //   };
  // }, []);

  return (
    <section
      className={cn("fixed h-screen w-full bg-pka_blue z-[1000]", {
        "translate-y-full transition-transform transform duration-700 ease-out":
          !isOpen,
      })}
    >
      <div className={"text-white flex items-center justify-center h-full"}>
        <p className={"text-[2vw] split"}>
          some text that needs to animate with gsap library
        </p>
      </div>
    </section>
  );
}
