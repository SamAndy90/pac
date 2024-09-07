"use client";

import { useSplashContext } from "@/contexts/Splash";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export default function Splash() {
  const { isOpen, setIsOpen } = useSplashContext();

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, 5000);
  }, []);

  return (
    <section
      className={cn(
        "fixed h-screen w-full bg-pka_blue z-[1000] transition-transform transform",
        {
          "translate-y-full": !isOpen,
        }
      )}
    >
      <div className={"text-white flex items-center justify-center h-full"}>
        <p className={"text-[2vw]"}>
          some text that needs to animate with gsap library
        </p>
      </div>
    </section>
  );
}
