"use client";
import React, { useEffect, useState } from "react";
import CountdownComponent from "../../components/countdownCounter";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { ImgUrl } from "@/lib/utils";
import Link from "next/link";

type TData = {
  Title: string;
  Intro: string;
  buttons: any[];
  starttime: string;
  time: string;
  style: string;
  Color: {
    value: string;
    label: string;
  };
  portrait: {
    _type: string;
    asset: {
      _ref: string;
    };
  };
};

type Props = {
  data: TData;
};

function PLPContestCard({ data }: Props) {
  const { Intro, Title, buttons, starttime, time, style, Color, portrait } =
    data;

  const [clickTwo, setClickedTwo] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setClickedTwo(false);
      } else {
        setClickedTwo(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const loadTimer = () => {
    const currentTime = new Date();
    const startTime = new Date(starttime);
    const endTime = new Date(time);

    if (currentTime > startTime && currentTime < endTime) {
      return (
        <CountdownComponent
          bgColor={Color.value}
          textColor={style === "style1" ? "text-white" : "text-black"}
          timer={time}
        />
      );
    } else if (currentTime > endTime) {
      return (
        <div className="font-lodrian tracking-wider text-[38px] text-white flex justify-center m-auto  text-center w-full ">
          Event Ended
        </div>
      );
    } else {
      return (
        <div className="font-lodrian tracking-wider text-[38px] text-white flex justify-center m-auto  text-center">
          Coming Soon
        </div>
      );
    }
  };

  return (
    <div
      className={`mt-[30px] mb-[30px] m-auto justify-center flex   2xl:max-w-[1400px] `}
    >
      <div className="!flex mx-8 mt-[30px] lg:mx-16  2xl:mx-0 flex-col  md:flex-row  md:relative w-full md:h-[300] lg:h-[638px]">
        <div
          className={`flex relative max-w-[100%] h-fit md:h-[638px] rounded-t-[20px] ${
            clickTwo
              ? "md:max-w-[50%] w-full animate-once animate-out duration-500 transition-all md:rounded-r-none md:rounded-l-[20px]"
              : "rounded-[20px] animate-out transition-all duration-500 ease-in-out"
          }`}
          style={{
            backgroundImage: `url(${ImgUrl(portrait.asset._ref)})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="flex ml-auto justify-end items-center">
              {clickTwo ? (
                <ArrowRight
                  className="  md:w-[20px] md:h-[21px] lg:w-[30px] lg:h-[31px] xl:w-[40px] xl:h-[41px] 2xl:w-[49px] 2xl:h-[47px] md:block hidden"
                  onClick={() => setClickedTwo(!clickTwo)}
                />
              ) : (
                <ArrowLeft
                  className="  md:w-[20px] md:h-[21px] lg:w-[30px] lg:h-[31px] xl:w-[40px] xl:h-[41px] 2xl:w-[49px] 2xl:h-[47px] md:block hidden"
                  onClick={() => setClickedTwo(!clickTwo)}
                />
              )}
            </div>
          </div>
          <div
            className={`
     w-full h-fit md:h-[638px]  md:justify-center md:ml-auto  items-center  `}
          >
            <div className=" justify-around h-[400px] lg:mt-16 flex flex-col items-end ">
              <div className=" md:h-[281.17px] flex items-center justify-center  mx-auto">
                <p className="font-avenirThin text-5xl  text-justify flex xl:text-[60px] leading-[68.4px] text-white md:text-4xl">
                  {Title}
                </p>
              </div>

              <div className="  w-full">{loadTimer()}</div>
            </div>
          </div>
        </div>
        <div
          className={`w-full md:w-[50%]  md:h-[638px] rounded-b-[20px] md:rounded-l-none md:absolute md:right-0 bg-[#33455A] mr-auto  items-center ${
            clickTwo ? "block md:rounded-r-[20px] fade-in" : "hidden fade-out"
          }`}
        >
          <div className="flex w-full justify-center align-middle items-center flex-col  h-full">
            <div className="w-full  py-4 px-16 lg:px-2 lg:py-3    flex-wrap    flex-col md:flex-row gap-5  md:w-[220px] lg:w-[330px] lg:min-h-[200px] 2xl:w-[450px] 2xl:min-h-[276px] m-auto md:justify-center text-justify font-normal  font-avenirThin  2xl:text-[24px] md:text-xs lg:text-sm xl:text-base 2xl:leading-[28.8px] text-white">
              <div className="flex mt-5"> {Intro}</div>

              <div className="flex justify-center items-center   md:space-x-4 my-6 md:my-4 flex-col md:flex-row  m-auto">
                {buttons?.map((button, index) => (
                  <Button key={button._key} variant={button.style}>
                    {button?.url ? (
                      <Link href={button.url}>{button.text}</Link>
                    ) : (
                      button.text
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PLPContestCard;
