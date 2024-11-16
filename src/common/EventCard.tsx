"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import CountdownComponent from "../components/countdownCounter";
import { cn, ImgUrl } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Portrait } from "@/types";

type EventCardProps = {
  subtitle?: string;
  title: string;
  description: string;
  backgroundImage?: Portrait;
  countdownBgColor: string;
  countdownTextColor: string;
  exploreButtonText: string;
  timer: string;
  style: string;
  starttime: string;
} & Pick<HTMLAttributes<HTMLDivElement>, "className">;

export const EventCard: FC<EventCardProps> = ({
  subtitle,
  title,
  description,
  backgroundImage,
  countdownBgColor,
  countdownTextColor,
  starttime,
  timer,
  style,
  exploreButtonText = "",
  className,
}) => {
  const loadTimer = () => {
    const currentTime = new Date();
    const startTime = new Date(starttime);
    const endTime = new Date(timer);

    if (currentTime > startTime && currentTime < endTime) {
      return (
        <CountdownComponent
          style={style}
          bgColor={countdownBgColor}
          textColor={countdownTextColor}
          timer={timer}
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

  if (style === "style1") {
    return (
      <Link
        href="/"
        target="_blank"
        className={cn(
          "max-w-[446px] group gap-y-8 px-3 py-16 mx-auto aspect-[1/1.435] bg-pka_green_light overflow-hidden relative rounded-[20px] text-center flex flex-col items-center lg:gap-y-12",
          className
        )}
      >
        {backgroundImage && (
          <div className="absolute w-full bottom-0 h-1/3">
            <Image
              src={ImgUrl(backgroundImage)}
              alt="bg"
              className="h-1/2 group-hover:scale-105 transition-all duration-500"
              fill
            />
          </div>
        )}

        <h3
          className={cn("relative w-3/4 font-thunder text-5xl text-[#0A1200]")}
        >
          {title}
        </h3>

        <p className="max-w-[375px] font-avenirThin text-[#0A1200]">
          {description}
        </p>

        <div className="absolute z-20 bottom-[26%]">{loadTimer()}</div>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      target="_blank"
      className={cn(
        "max-w-[446px] group px-3 py-16 mx-auto aspect-[1/1.435] overflow-hidden relative rounded-[20px] text-center flex flex-col items-center",
        className
      )}
    >
      {backgroundImage && (
        <Image
          src={ImgUrl(backgroundImage)}
          alt="bg"
          className="object-cover group-hover:scale-105 transition-all duration-500"
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
          "relative basis-1/4 font-averia text-xs uppercase text-white"
        )}
      >
        {subtitle}
      </span>
      <h3
        className={cn(
          "relative !leading-[1.4] flex-1 w-2/3 font-thunder text-5xl text-white",
          {
            "font-bold": style === "style3",
          }
        )}
      >
        {title}
      </h3>

      <Link
        href={"/"}
        className={
          "flex items-center z-0 gap-x-1 border-b pb-[3px] group/link hover:border-b-white transition-all duration-300 border-b-white/50 justify-center text-white"
        }
      >
        <span
          className={
            "font-roboto leading-none font-medium text-sm tracking-[0.01em]"
          }
        >
          {exploreButtonText}
        </span>
        <ArrowRight
          className={
            "size-2.5 group-hover/link:translate-x-1 transition-all duration-300"
          }
        />
      </Link>

      <div className="absolute z-20 bottom-[20%] sm:bottom-[26%]">
        {loadTimer()}
      </div>
    </Link>
  );
};
