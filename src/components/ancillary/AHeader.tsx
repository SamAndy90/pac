import Image from "next/image";
import React from "react";

import { ImgUrl } from "@/lib/utils";

type TImageAsset = {
  _ref: string;
  _type: "reference";
};

type TImage = {
  _type: "image";
  asset: TImageAsset;
};

type TData = {
  title: string;
  _type: string;
  _key: string;
  portrait: TImage;
};

type Props = {
  data: TData;
};

const AHeader = (props: Props) => {
  return (
    <div className="h-screen relative flex justify-center items-center">
      <div className="w-full relative h-full">
        <div className="h-full w-full">
          <Image
            src={ImgUrl(props.data.portrait.asset._ref)}
            alt="banner"
            className="w-full h-full object-cover"
            layout="fill"
          />
        </div>
      </div>
      <div className="absolute tracking-[5px] h-full top-0 w-full left-0 flex flex-col justify-center items-center text-center font-lodrian text-white text-[48px] font-black">
        {props.data.title.split(" ").map((word, index) => {
          return (
            <p className="" key={word}>
              {word}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default AHeader;
