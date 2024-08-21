"use client";

import { cn } from "@/lib/utils";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";

// TODO: Confirm if the count down deadline is coming from Sanity
//
interface RendererProps extends CountdownRenderProps {
  style?: string;
  bgColor?: string;
  textColor?: string;
  size?: "small" | "large";
}
const Renderer: React.FC<RendererProps> = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
  style = "style1",
  bgColor = "#0A4A64",
  textColor = "#fff",
  size = "large",
}) => {
  let bgColorValue = `bg-[${bgColor}]`;
  let textColorValue = `text-[${textColor}]`;

  if (completed) {
    return "";
  } else {
    return (
      <div
        className={clsx(
          "gap-1 text-center lg:gap-x-2 xl:gap-x-3 flex items-center justify-center font-inter text-white",
          {
            "xl:gap-x-2": size === "small",
          }
        )}
        style={{
          color: textColor,
        }}
      >
        <div
          className={cn(
            "flex flex-col xl:p-x-6 lg:py-6 px-4 py-5 md:px-5 items-center justify-center gap-y-1.5 rounded-2xl md:rounded-3xl",
            {
              "p-4 md:p-4 lg:p-4 xl:p-4 md:rounded-2xl": size === "small",
            },
            {
              "text-white bg-pka_blue": style === "style1",
              "text-pka_blue2 bg-pka_green_light": style === "style2",
              "text-white bg-[#6A7A87]": style === "style3",
            }
          )}
        >
          <span
            className={cn("text-3xl md:text-4xl lg:text-5xl xl:text-[57px]", {
              "text-2xl md:text-2xl lg:text-2xl xl:text-2xl": size === "small",
            })}
          >
            {days}
          </span>
          <span
            className={cn("md:text-lg xl:text-2xl", {
              "md:text-base xl:text-base": size === "small",
            })}
          >
            days
          </span>
        </div>

        <div
          className={cn(
            "flex flex-col xl:p-x-6 lg:py-6 px-4 py-5 md:px-5 items-center justify-center gap-y-1.5 rounded-2xl md:rounded-3xl",
            bgColorValue,
            {
              "p-4 md:p-4 lg:p-4 xl:p-4 md:rounded-2xl": size === "small",
            },
            {
              "text-white bg-pka_blue": style === "style1",
              "text-pka_blue2 bg-pka_green_light": style === "style2",
              "text-white bg-[#6A7A87]": style === "style3",
            }
          )}
        >
          <span
            className={cn("text-3xl md:text-4xl lg:text-5xl xl:text-[57px]", {
              "text-2xl md:text-2xl lg:text-2xl xl:text-2xl": size === "small",
            })}
          >
            {hours}
          </span>
          <span
            className={cn("md:text-lg xl:text-2xl", {
              "md:text-base xl:text-base": size === "small",
            })}
          >
            hours
          </span>
        </div>
        <div
          className={cn(
            "flex flex-col xl:p-x-6 lg:py-6 px-4 py-5 md:px-5 items-center justify-center gap-y-1.5 rounded-2xl md:rounded-3xl",
            bgColorValue,
            {
              "p-4 md:p-4 lg:p-4 xl:p-4 md:rounded-2xl": size === "small",
            },
            {
              "text-white bg-pka_blue": style === "style1",
              "text-pka_blue2 bg-pka_green_light": style === "style2",
              "text-white bg-[#6A7A87]": style === "style3",
            }
          )}
        >
          <span
            className={cn("text-3xl md:text-4xl lg:text-5xl xl:text-[57px]", {
              "text-2xl md:text-2xl lg:text-2xl xl:text-2xl": size === "small",
            })}
          >
            {minutes}
          </span>
          <span
            className={cn("md:text-lg xl:text-2xl", {
              "md:text-base xl:text-base": size === "small",
            })}
          >
            minutes
          </span>
        </div>
        <div
          className={cn(
            "flex flex-col xl:p-x-6 lg:py-6 px-4 py-5 md:px-5 items-center justify-center gap-y-1.5 rounded-2xl md:rounded-3xl",
            bgColorValue,
            {
              "p-4 md:p-4 lg:p-4 xl:p-4 md:rounded-2xl": size === "small",
            },
            {
              "text-white bg-pka_blue": style === "style1",
              "text-pka_blue2 bg-pka_green_light": style === "style2",
              "text-white bg-[#6A7A87]": style === "style3",
            }
          )}
        >
          <span
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl xl:text-[57px] min-w-10 md:min-w-14 xl:min-w-20",
              {
                "text-2xl md:text-2xl lg:text-2xl xl:text-2xl min-w-10 md:min-w-10 xl:min-w-10":
                  size === "small",
              }
            )}
          >
            {seconds}
          </span>
          <span
            className={cn("md:text-lg xl:text-2xl", {
              "md:text-base xl:text-base": size === "small",
            })}
          >
            sec
          </span>
        </div>
      </div>
    );
  }
};

interface CountdownComponentProps {
  style?: string;
  bgColor?: string;
  textColor?: string;
  timer?: string;
  size?: "small" | "large";
}

const CountdownComponent: React.FC<CountdownComponentProps> = ({
  style = "style1",
  bgColor,
  textColor,
  timer,
  size = "large",
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
        <Renderer
          style={style}
          textColor={textColor}
          size={size}
          bgColor={bgColor}
          {...props}
        />
      )}
    />
  );
};

export default CountdownComponent;
