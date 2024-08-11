import Image from "next/image";
import React from "react";

import { ImgUrl } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

type TImageAsset = {
  _ref: string;
  _type: "reference";
};

type TImage = {
  _type: "image";
  asset: TImageAsset;
};

type TCards = {
  Intro: string;
  Title: string;
  _key: string;
  portrait: TImage;
};

type TData = {
  title: string;
  _type: string;
  _key: string;
  cards: TCards[];
  buttons: any[];
};

type Props = {
  data: TData;
};

const JoinPeaceKeepersBenifit = ({ data }: Props) => {
  return (
    <div className="lg:my-[89.37] my-12  lg:h-[897.4px] flex flex-col justify-center align-middle">
      <h1 className="uppercase justify-center m-auto  text-[#33455A] text-center font-lodrian font-black text-3xl lg:text-5xl w-[80%] lg:w-full tracking-widest">
        {data?.title}
      </h1>
      <div className="flex   w-full justify-center m-auto mt-[73.3px] mb-[90.4px] lg:justify-around flex-col lg:flex-row">
        {data?.cards?.map((card) => (
          <div className="  justify-center m-auto flex flex-col  items-center w-[348.6px] ">
            <Image
              src={ImgUrl(card.portrait.asset._ref)}
              width={240}
              height={240}
              alt="banner"
              className="object-cover"
              //   layout="fill"
            />
            <div className=" pt-[58.72px]">
              <h2 className="uppercase text-[#33455A] text-center font-avenir font-black text-[19.2px] tracking-widest">
                {card?.Title}
              </h2>
              <p className="text-[#33455A] pt-4 text-center font-avenir-light font-[350] text-[14.2px]">
                {card?.Intro}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="self-center">
        {data?.buttons?.map((button, index) => (
          <Button key={index} variant={button.style as any}>
            {button?.url ? (
              <Link href={button.url}>{button.text}</Link>
            ) : (
              button.text
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default JoinPeaceKeepersBenifit;
