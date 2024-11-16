import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import bgIMG from "@/resources/png/background.png";

export default function Page() {
  return (
    <div className="flex flex-row  justify-center items-center min-h-[925px]">
      <div className="flex mx-[10px] flex-row rounded-[20px] bg-white w-full justify-center max-w-[1339px] min-h-[639px] my-[140px]">
        <div className="w-1/2 flex justify-center items-center">
          <SignIn
            appearance={{
              elements: {
                card: "shadow-none",
                formButtonPrimary:
                  "uppercase font-thunder text-lg transition-colors rounded-lg text-white hover:text-pka_blue2 bg-pka_blue2 hover:bg-pka_green_light focus:outline-none focus:ring-0 active:bg-pka_green",
              },
            }}
          />
        </div>
        <div className={"w-1/2 hidden md:flex justify-center items-center"}>
          <div className="relative w-full h-full">
            <Image
              src={bgIMG}
              alt={"Image"}
              className={"rounded-[20px] object-cover"}
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
}
