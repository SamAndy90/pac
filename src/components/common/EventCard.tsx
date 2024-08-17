"use client";

import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import { client } from "../../../sanity/lib/client";
import CountdownComponent from "../countdownCounter";
import { cn } from "@/lib/utils";

const builder = imageUrlBuilder(client);
function urlFor(source: string) {
  return builder.image(source);
}
type EventCardProps = {
  subtitle?: string;
  title: string;
  description: string;
  backgroundImage?: any;
  countdownBgColor: string;
  countdownTextColor: string;
  exploreButtonText: string;
  timer: string;
  style: string;
  starttime: string;
} & Pick<HTMLAttributes<HTMLDivElement>, "className">;

const EventCard: FC<EventCardProps> = ({
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
          bgColor={countdownBgColor}
          textColor={countdownTextColor}
          timer={timer}
          size={"small"}
        />
      );
    } else if (currentTime > endTime) {
      return (
        <div className="font-lodrian text-[38px]  tracking-wider xl:text-[38px] 2xl:text-[42px] lg:text-[28px] text-white">
          Event Ended
        </div>
      );
    } else {
      return (
        <div className="font-lodrian text-[38px]  tracking-wider xl:text-[38px] 2xl:text-[42px] lg:text-[28px] text-white ">
          Coming Soon
        </div>
      );
    }
  };

  return (
    <Link
      href="/"
      target="_blank"
      className={cn(
        "max-w-[446px] px-3 py-12 mx-auto md:mx-0 h-[539px] lg:h-[340px] xl:h-[426px] 2xl:h-[639px] overflow-hidden relative rounded-[13px] text-center bg-cover flex flex-col items-center lg:gap-7 gap-3",
        {
          "bg-pka_green_light": style === "style1",
        },
        className
      )}
    >
      {backgroundImage && (style === "style2" || style === "style3") && (
        <Image
          src={urlFor(backgroundImage).url()}
          alt="bg"
          className="object-cover"
          fill
        />
      )}
      <div
        className={cn("relative font-thunder font-bold text-5xl text-white")}
      >
        <h3>{title}</h3>
      </div>

      {style === "style2" ? (
        <div
          className="relative mt-16 font-avenirThin text-5xl font-normal w-[80%] text-white z-10"
          style={{ opacity: 0.5 }}
        >
          <p className="font-normal lg:text-2xl xl:text-3xl 2xl:text-5xl leading-[68px]">
            {description}
          </p>
        </div>
      ) : (
        <div className="relative mt-5 w-[80%] font-avenirThin text-lg font-normal text-black ">
          <p className="leading-6">{description}</p>
        </div>
      )}

      <div className="absolute bottom-[100px] md:bottom-[110px] lg:bottom-[87px] xl:bottom-[111px]  2xl:bottom-[132px] z-10 ">
        {loadTimer()}
      </div>

      {backgroundImage && style === "style1" && (
        <div className="absolute w-full bottom-0 h-1/2">
          <Image
            src={urlFor(backgroundImage).url()}
            alt="bg"
            className="h-1/2"
            fill
          />
        </div>
      )}
    </Link>
  );
};

export default EventCard;
