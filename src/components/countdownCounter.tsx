"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";

// TODO: Confirm if the count down deadline is coming from Sanity
//
interface RendererProps extends CountdownRenderProps {
  bgColor: string;
  textColor: string;
}
const Renderer: React.FC<RendererProps> = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
  bgColor,
  textColor,
}) => {
  const bgColorValue = `bg-[${bgColor.slice(0, 7)}]`;

  if (completed) {
    return "";
  } else {
    return (
      <div className="gap-1 2xl:gap-2 flex items-center justify-center font-inter font-normal">
        <div
          className={cn(
            `flex flex-col items-center justify-center w-14 h-16 gap-2 rounded-lg md:gap-0 xl:gap-2   md:h-[54px] md:w-[40px]  xl:w-[47px] xl:h-[67px] 2xl:w-[71px] 2xl:h-[100px] ${bgColorValue}`
          )}
        >
          <span
            className={`text-2xl md:text-[19px] xl:text-2xl 2xl:text-[36px] ${textColor}`}
          >
            {days}
          </span>
          <span
            className={` text-[10px] md:text-[8px] xl:text-[10px] 2xl:text-[16px] ${textColor}`}
          >
            days
          </span>
        </div>
        <div
          className={cn(
            `flex flex-col items-center justify-center w-14 h-16 gap-2 rounded-lg md:gap-0 xl:gap-2  md:h-[54px] md:w-[40px]  xl:w-[47px] xl:h-[67px] 2xl:w-[75px] 2xl:h-[100px] ${bgColorValue}`
          )}
        >
          <span
            className={`text-2xl md:text-[19px] xl:text-2xl 2xl:text-[36px] ${textColor}`}
          >
            {hours}
          </span>
          <span
            className={`text-[10px] md:text-[8px] xl:text-[10px] 2xl:text-[16px] ${textColor}`}
          >
            hours
          </span>
        </div>
        <div
          className={cn(
            `flex flex-col items-center justify-center w-[70px] h-16 gap-2 md:gap-0 xl:gap-2  rounded-lg  md:h-[54px] md:w-[49px]  xl:w-[61px] xl:h-[67px] 2xl:w-[92px] 2xl:h-[100px] ${bgColorValue}`
          )}
        >
          <span
            className={`text-2xl md:text-[19px]  xl:text-2xl  2xl:text-[36px] ${textColor}`}
          >
            {minutes}
          </span>
          <span
            className={`text-[10px]  md:text-[8px] xl:text-[10px] 2xl:text-[16px] ${textColor}`}
          >
            minutes
          </span>
        </div>
        <div
          className={cn(
            `flex flex-col items-center justify-center w-14 h-16 gap-2 rounded-lg xl:gap-2  md:gap-0 md:h-[54px] md:w-[40px]  xl:w-[47px] xl:h-[67px] 2xl:w-[72px] 2xl:h-[100px] ${bgColorValue}`
          )}
        >
          <span
            className={`text-2xl  md:text-[19px] xl:text-2xl 2xl:text-[36px] ${textColor}`}
          >
            {seconds}
          </span>
          <span
            className={`text-[10px] md:text-[8px] xl:text-[10px] 2xl:text-[16px] ${textColor}`}
          >
            sec
          </span>
        </div>
      </div>
    );
  }
};

interface CountdownComponentProps {
  bgColor: string;
  textColor: string;
  timer?: string;
}
const CountdownComponent: React.FC<CountdownComponentProps> = ({
  bgColor,
  textColor,
  timer,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  let time = 5 * 24 * 60 * 60 * 1000;

  const timerValue = timer ? new Date(timer) : new Date().getTime() + time;
  const [targetDate] = useState<number>(new Date(timerValue).getTime());

  if (!mounted) return null;

  return (
    <Countdown
      date={targetDate}
      renderer={(props) => (
        <Renderer textColor={textColor} bgColor={bgColor} {...props} />
      )}
    />
  );
};

export default CountdownComponent;
