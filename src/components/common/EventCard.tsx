"use client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { client } from "../../../sanity/lib/client";
import CountdownComponent from "../countdownCounter";
const builder = imageUrlBuilder(client);
function urlFor(source: string) {
  return builder.image(source);
}
interface EventCardProps {
  title: string;
  description: string;
  backgroundImage?: any;
  countdownBgColor: string;
  countdownTextColor: string;
  exploreButtonText: string;
  timer: string;
  style: string;
  starttime: string;
}

const EventCard: FC<EventCardProps> = ({
  title,
  description,
  backgroundImage,
  countdownBgColor,

  starttime,
  timer,
  style,
}) => {
  const loadTimer = () => {
    const currentTime = new Date();
    const startTime = new Date(starttime);
    const endTime = new Date(timer);

    if (currentTime > startTime && currentTime < endTime) {
      return (
        <CountdownComponent
          bgColor={countdownBgColor.replace(/[^a-zA-Z0-9#]/g, "")}
          textColor={style === "style1" ? "text-white" : "text-black"}
          timer={timer}
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
      className={`w-[326px] mx-auto md:mx-0 h-[539px] lg:w-[238px]  lg:h-[340px] xl:w-[297px] xl:h-[426px] 2xl:w-[446px] 2xl:h-[639px]  relative rounded-[13px]  text-center bg-cover flex flex-col items-center lg:gap-7 gap-3 ${
        style?.replace(/[^a-zA-Z0-9]/g, "") === "style1" && "bg-[#FFC52E]"
      }`}
    >
      {backgroundImage && style?.replace(/[^a-zA-Z0-9]/g, "") === "style2" && (
        <div
          className="absolute rounded-[13px] h-full inset-0"
          style={{ opacity: 0.4 }}
        >
          <Image
            src={urlFor(backgroundImage).url()}
            alt="bg"
            className="rounded-[13px] object-cover "
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      {style?.replace(/[^a-zA-Z0-9]/g, "") === "style2" ? (
        <div className="relative mt-10 font-avenirThin text-white">
          <p className="font-medium text-xs leading-3">{title}</p>
        </div>
      ) : (
        <div className="relative mt-10 font-avenirThin text-black text-5xl">
          <p className="leading-10">{title}</p>
        </div>
      )}

      {style?.replace(/[^a-zA-Z0-9]/g, "") === "style2" ? (
        <div
          className="relative mt-16 font-avenirThin  text-5xl font-normal w-[80%] text-white z-10"
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
      {backgroundImage && style?.replace(/[^a-zA-Z0-9]/g, "") === "style1" && (
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
