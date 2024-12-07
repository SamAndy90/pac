"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import CountdownComponent from "../components/countdownCounter";
import { cn, ImgUrl } from "@/lib/utils";
import { Portrait } from "@/types";

type ContestCardProps = {
  collectionName: string;
  subtitle?: string;
  title: string;
  description: string;
  eventStart: string;
  eventEnd: string;
  countdownBgColor: string;
  countdownTextColor: string;
  backgroundImage?: Portrait;
} & Pick<HTMLAttributes<HTMLDivElement>, "className">;

export const ContestCard: FC<ContestCardProps> = ({
  collectionName,
  subtitle,
  title,
  description,
  backgroundImage,
  countdownBgColor,
  countdownTextColor,
  eventStart,
  eventEnd,
  className,
}) => {
  const currentTime = new Date();
  const startTime = new Date(eventStart);
  const endTime = new Date(eventEnd);

  const loadTimer = () => {
    if (currentTime > startTime && currentTime < endTime) {
      return (
        <CountdownComponent
          bgColor={countdownBgColor}
          textColor={countdownTextColor}
          timer={eventEnd}
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
      href={`contests/${collectionName}`}
      className={cn(
        "max-w-[446px] w-full group px-3 py-4 mx-auto aspect-[1/1.435] gap-y-2 overflow-hidden relative rounded-[20px] text-center flex flex-col items-center",
        className
      )}
    >
      {backgroundImage && (
        <Image
          src={ImgUrl(backgroundImage)}
          alt="bg"
          className="object-cover -z-10 group-hover:scale-105 transition-all duration-500"
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
      <p className={"text-white line-clamp-4"}>{description}</p>
      <div className="absolute z-20 bottom-[15%] sm:bottom-[12%]">
        {loadTimer()}
      </div>
    </Component>
  );
};
