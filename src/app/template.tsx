"use client";

import Image from "next/image";
import Logo from "/src/resources/png/pac-logo.png";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Template({ children }: { children: React.ReactNode }) {
  //   const ref = useRef(null);

  //   useEffect(() => {
  //     if (ref.current) {
  //       const tl = gsap.timeline();
  //     }
  //   }, []);

  return (
    <>
      {/* <div
        ref={ref}
        id={"splash-component"}
        className={
          "min-h-screen bg-pka_blue flex items-center justify-center fixed top-0 left-0 w-full h-full z-[9999]"
        }
      >
        <Image
          src={Logo}
          alt={"Logo"}
          className={"w-[25%] animate-bounce duration-1500"}
        />
      </div> */}
      {children}
    </>
  );
}
