"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import CountdownComponent from "../components/countdownCounter";
import { cn, ImgUrl } from "@/lib/utils";
import { EventType } from "@/app/contests/page";

type ContestCardProps = { event: EventType } & Pick<
  HTMLAttributes<HTMLDivElement>,
  "className"
>;

export const ContestCard: FC<ContestCardProps> = ({ event, className }) => {
  const {
    title,
    description,
    collection_name,
    starttime,
    endtime,
    portrait,
    timerstyle,
    subtitle,
  } = event;
  const { bgcolor, numcolor } = timerstyle;
  const currentTime = new Date();
  const startTime = new Date(starttime);
  const endTime = new Date(endtime);

  const loadTimer = () => {
    if (currentTime > startTime && currentTime < endTime) {
      return (
        <CountdownComponent
          bgColor={bgcolor.value || "#0A4A64"}
          textColor={numcolor.value || "#fff"}
          timer={endtime}
          size={"small"}
        />
      );
    } else if (currentTime > endTime) {
      return (
        <div className="font-thunder text-[38px] tracking-wider xl:text-[38px] 2xl:text-[42px] lg:text-[28px] text-white">
          Event Ended
        </div>
      );
    } else {
      return (
        <div className="font-thunder text-[38px] tracking-wider xl:text-[38px] 2xl:text-[42px] lg:text-[28px] text-white ">
          Coming Soon
        </div>
      );
    }
  };

  const Component =
    currentTime > startTime && currentTime < endTime ? Link : "div";

  return (
    <Component
      href={`contests/${collection_name}`}
      className={cn(
        "max-w-[446px] w-full group px-3 py-4 mx-auto aspect-[1/1.435] gap-y-2 overflow-hidden relative rounded-[20px] text-center flex flex-col items-center bg-pka_green",
        className
      )}
    >
      {portrait && (
        <Image
          src={ImgUrl(portrait)}
          alt="bg"
          className="object-cover z-0 group-hover:scale-105 transition-all duration-500"
          fill
        />
      )}
      <div
        className={
          "absolute pointer-events-none z-10 w-full h-full top-0 left-0 bg-[#0A1200]/20 group-hover:bg-[#0A1200]/0 transition-all duration-500"
        }
      ></div>

      <span
        className={cn(
          "relative basis-1/6 font-averia text-xs uppercase text-white"
        )}
      >
        {subtitle}
      </span>
      <h3
        className={
          "!leading-[1.4] relative w-2/3 font-thunder text-4xl text-white"
        }
      >
        {title}
      </h3>
      <p className={"text-white line-clamp-4 relative"}>{description}</p>
      <div className="absolute z-20 bottom-[15%] sm:bottom-[12%]">
        {loadTimer()}
      </div>
    </Component>
  );
};
