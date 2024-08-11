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
  _type: string;
  _key: string;
  portrait: TImage;
};

type Props = {
  data: TData;
};

const ImageDisplaySection = (props: Props) => {
  return (
    <div className="h-screen flex justify-center items-center">
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
    </div>
  );
};

export default ImageDisplaySection;
