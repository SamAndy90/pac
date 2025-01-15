"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import CountdownComponent from "../components/countdownCounter";
import { cn, getVideoURL, ImgUrl } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
// import { Card } from "@/components/Home/HappeningNow";
import { Button } from "./UI/Button";
import ReactPlayer from "react-player";
import { ContestType } from "@/types";

type EventCardProps = {
  // card: Card;
  data: ContestType;
} & Pick<HTMLAttributes<HTMLDivElement>, "className">;

export const EventCard: FC<EventCardProps> = ({ data, className }) => {
  const {
    collection_name,
    subtitle,
    subtitlePosition,
    title,
    titlePosition,
    description,
    descriptionPosition,
    ctaComponent,
    cta,
    ctaPosition,
    status,
    starttime,
    endtime,
    timerstyle,
    bg,
    picture,
    videoFile,
    videoLink,
  } = data;

  const loadTimer = () => {
    const currentTime = new Date();
    const startTime = new Date(starttime);
    const endTime = new Date(endtime);

    if (currentTime > startTime && currentTime < endTime) {
      return (
        <CountdownComponent
          bgColor={timerstyle?.bgcolor?.value}
          textColor={timerstyle?.numcolor?.value}
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

  const url = getVideoURL(videoFile);

  const Component = status === "active" ? Link : "div";

  return (
    <Component
      href={status === "active" ? `/contests/${collection_name?.trim()}` : ""}
      className={cn(
        "max-w-[390px] group h-full min-h-[460px] px-3 py-8 mx-auto overflow-hidden relative rounded-[20px] text-center flex flex-col items-center gap-y-4 bg-pka_green_light",
        className
      )}
    >
      {bg === "image" && picture && (
        <Image
          src={ImgUrl(picture)}
          alt={"Background"}
          fill
          className={
            "object-cover z-0 group-hover:scale-105 transition-all duration-500 pointer-events-none select-none"
          }
        />
      )}
      {bg === "file" && url && (
        <ReactPlayer
          className={
            "react-player absolute inset-0 z-0 group-hover:scale-105 transition-all duration-500 pointer-events-none select-none"
          }
          playing={true}
          controls={false}
          muted={true}
          url={url}
          loop={true}
          width={"100%"}
          height={"100%"}
        />
      )}
      {bg === "url" && videoLink && (
        <ReactPlayer
          className={
            "react-player z-0 absolute inset-0 group-hover:scale-105 transition-all duration-500 pointer-events-none select-none"
          }
          playing={true}
          controls={false}
          muted={true}
          url={videoLink}
          loop={true}
          width={"auto"}
          height={"100%"}
          config={{
            youtube: {
              playerVars: { controls: 0, modestbranding: 1, rel: 0 },
            },
            vimeo: {
              playerOptions: {
                controls: false,
                title: false,
                byline: false,
              },
            },
            file: {
              attributes: {
                controls: false,
                muted: true,
                autoPlay: true,
              },
            },
          }}
        />
      )}

      <div
        className={
          "absolute pointer-events-none z-0 inset-0 bg-pka_black/15 group-hover:bg-pka_black/30 group-hover:backdrop-blur-sm transition-all duration-300"
        }
      />
      {subtitle && (
        <div
          className={cn(
            "relative font-averia text-xs uppercase text-white text-center w-full mb-3",
            {
              "text-left": subtitlePosition === "left",
              "text-right": subtitlePosition === "right",
            }
          )}
        >
          {subtitle}
        </div>
      )}
      {title && (
        <h3
          className={cn(
            "relative mb-3 leading-none font-thunder text-4xl text-white text-center w-full",
            {
              "text-left": titlePosition === "left",
              "text-right": titlePosition === "right",
            }
          )}
        >
          {title}
        </h3>
      )}
      {description && (
        <div className={"w-full flex-1 mb-4 relative"}>
          <p
            className={cn(
              "text-white text-sm text-center leading-tight line-clamp-4",
              {
                "text-left": descriptionPosition === "left",
                "text-right": descriptionPosition === "right",
              }
            )}
          >
            {description}
          </p>
        </div>
      )}
      <div className="z-20 flex-1 mb-2">{loadTimer()}</div>
      <div
        className={cn("flex-1 z-10", {
          "self-start": ctaPosition === "left",
          "w-full": ctaPosition === "full",
          "self-end": ctaPosition === "right",
        })}
      >
        {cta &&
          (status === "active" ? (
            ctaComponent === "button" ? (
              <Button className={"z-10"} fullWidth>
                {cta?.ctaLabel}
              </Button>
            ) : (
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
                  {cta?.ctaLabel}
                </span>
                <ArrowRight
                  className={
                    "size-2.5 group-hover/link:translate-x-1 transition-all duration-300"
                  }
                />
              </div>
            )
          ) : ctaComponent === "button" ? (
            <Link href={cta.ctaLink ?? ""} className={"z-10 w-full"}>
              <Button fullWidth>{cta?.ctaLabel}</Button>
            </Link>
          ) : (
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
                {cta?.ctaLabel}
              </span>
              <ArrowRight
                className={
                  "size-2.5 group-hover/link:translate-x-1 transition-all duration-300"
                }
              />
            </div>
          ))}
      </div>
    </Component>
  );
};
