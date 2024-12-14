"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import CountdownComponent from "../components/countdownCounter";
import { cn, ImgUrl } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/Home/HappeningNow";

type EventCardProps = {
  card: Card;
} & Pick<HTMLAttributes<HTMLDivElement>, "className">;

export const EventCard: FC<EventCardProps> = ({ card, className }) => {
  const {
    subtitle,
    title,
    description,
    slug,
    portrait,
    starttime,
    time,
    timerstyle,
    homepageStyle: style = "style1",
  } = card;
  const loadTimer = () => {
    const currentTime = new Date();
    const startTime = new Date(starttime);
    const endTime = new Date(time);

    if (currentTime > startTime && currentTime < endTime) {
      return (
        <CountdownComponent
          bgColor={timerstyle?.bgcolor?.value}
          textColor={timerstyle?.numcolor?.value}
          timer={time}
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
        href={`/contests/${slug.current.trim()}`}
        className={cn(
          "max-w-[446px] group gap-y-4 px-3 py-16 mx-auto aspect-[1/1.435] bg-pka_green_light overflow-hidden relative rounded-[20px] text-center flex flex-col items-center lg:gap-y-8",
          className
        )}
      >
        <div className="absolute w-full bottom-0 h-1/3">
          <Image
            src={ImgUrl(portrait)}
            alt={"Background"}
            className="h-1/2 group-hover:scale-105 transition-all duration-500 object-cover"
            fill
          />
        </div>
        {title && (
          <h3
            className={cn(
              "relative w-3/4 font-thunder text-5xl text-[#0A1200]"
            )}
          >
            {title}
          </h3>
        )}
        {description && (
          <p className="max-w-[375px] font-avenirThin text-[#0A1200] line-clamp-6">
            {description}
          </p>
        )}
        <div className="absolute z-20 bottom-[10%] lg:bottom-[12%]">
          {loadTimer()}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/contests/${slug.current.trim()}`}
      className={cn(
        "max-w-[446px] group px-3 py-16 mx-auto aspect-[1/1.435] overflow-hidden relative rounded-[20px] text-center flex flex-col items-center bg-pka_green_light",
        className
      )}
    >
      <Image
        src={ImgUrl(portrait)}
        alt={"Background"}
        className="object-cover group-hover:scale-105 transition-all duration-500"
        fill
      />
      <div
        className={
          "absolute pointer-events-none z-10 w-full h-full top-0 left-0 bg-[#0A1200]/20 group-hover:bg-[#0A1200]/0 transition-all duration-500"
        }
      />
      {subtitle && (
        <span
          className={cn(
            "relative basis-1/4 font-averia text-xs uppercase text-white"
          )}
        >
          {subtitle}
        </span>
      )}
      {title && (
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
      )}
      <div
        className={
          "flex items-center z-0 gap-x-1 border-b pb-[3px] group/link hover:border-b-white transition-all duration-300 border-b-white/50 justify-center text-white"
        }
      >
        <span
          className={
            "font-roboto leading-none font-medium text-sm tracking-[0.01em]"
          }
        >
          Explore
        </span>
        <ArrowRight
          className={
            "size-2.5 group-hover/link:translate-x-1 transition-all duration-300"
          }
        />
      </div>
      <div className="absolute z-20 bottom-[20%] sm:bottom-[26%]">
        {loadTimer()}
      </div>
    </Link>
  );
};
