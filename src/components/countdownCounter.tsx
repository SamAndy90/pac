"use client";

import { cn } from "@/lib/utils";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";
interface RendererProps extends CountdownRenderProps {
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
  bgColor = "#0A4A64",
  textColor = "#fff",
  size = "large",
}) => {
  if (completed) {
    return "";
  } else {
    return (
      <div
        className={clsx(
          "gap-1 text-center lg:gap-x-2 flex items-center justify-center font-thunder tracking-widest text-white",
          {
            "xl:gap-x-1.5": size === "small",
          }
        )}
        style={{
          color: textColor,
        }}
      >
        <div
          style={{
            backgroundColor: bgColor,
          }}
          className={cn(
            "flex flex-col p-4 md:py-5 items-center justify-center gap-y-1.5 rounded-2xl md:rounded-3xl",
            {
              "p-3 md:py-4 md:rounded-2xl": size === "small",
            }
          )}
        >
          <span
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl min-w-10 md:min-w-14",
              {
                "text-2xl md:text-2xl lg:text-2xl xl:text-2xl min-w-7 md:min-w-8":
                  size === "small",
              }
            )}
          >
            {days}
          </span>
          <span
            className={cn("md:text-lg xl:text-xl", {
              "md:text-base xl:text-base": size === "small",
            })}
          >
            days
          </span>
        </div>
        <div
          style={{
            backgroundColor: bgColor,
          }}
          className={cn(
            "flex flex-col p-4 md:py-5 items-center justify-center gap-y-1.5 rounded-2xl md:rounded-3xl",
            {
              "p-3 md:py-4 md:rounded-2xl": size === "small",
            }
          )}
        >
          <span
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl min-w-10 md:min-w-14",
              {
                "text-2xl md:text-2xl lg:text-2xl xl:text-2xl min-w-7 md:min-w-8":
                  size === "small",
              }
            )}
          >
            {hours}
          </span>
          <span
            className={cn("md:text-lg xl:text-xl", {
              "md:text-base xl:text-base": size === "small",
            })}
          >
            hours
          </span>
        </div>
        <div
          style={{
            backgroundColor: bgColor,
          }}
          className={cn(
            "flex flex-col p-4 md:py-5 items-center justify-center gap-y-1.5 rounded-2xl md:rounded-3xl",
            {
              "p-3 md:py-4 md:rounded-2xl": size === "small",
            }
          )}
        >
          <span
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl min-w-10 md:min-w-14",
              {
                "text-2xl md:text-2xl lg:text-2xl xl:text-2xl min-w-7 md:min-w-8":
                  size === "small",
              }
            )}
          >
            {minutes}
          </span>
          <span
            className={cn("md:text-lg xl:text-xl", {
              "md:text-base xl:text-base": size === "small",
            })}
          >
            minutes
          </span>
        </div>
        <div
          style={{
            backgroundColor: bgColor,
          }}
          className={cn(
            "flex flex-col p-4 md:py-5 items-center justify-center gap-y-1.5 rounded-2xl md:rounded-3xl",
            {
              "p-3 md:py-4 md:rounded-2xl": size === "small",
            }
          )}
        >
          <span
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl min-w-10 md:min-w-14",
              {
                "text-2xl md:text-2xl lg:text-2xl xl:text-2xl min-w-7 md:min-w-8":
                  size === "small",
              }
            )}
          >
            {seconds}
          </span>
          <span
            className={cn("md:text-lg xl:text-xl", {
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
  bgColor?: string;
  textColor?: string;
  timer?: string;
  size?: "small" | "large";
}

const CountdownComponent: React.FC<CountdownComponentProps> = ({
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
