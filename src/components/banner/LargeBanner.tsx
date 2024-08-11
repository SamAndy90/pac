import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  imageUrl: string;
};

const LargeBanner = ({ imageUrl, title }: Props) => {
  return (
    <div className=" 2xl:max-w-[1400px] w-full m-auto ">
      <div className="mt-36 w-full  2xl:mx-0 rounded-[20px] relative flex justify-center  items-center overflow-hidden">
        <div className="m-auto  h-[500px] lg:h-[638px]   flex justify-center  rounded-[20px] ">
          <Image
            src={imageUrl}
            alt="banner"
            className="w-full h-full object-cover"
            fill
          />
        </div>

        <div className="absolute flex justify-center items-center inset-0">
          <div className="text-center flex items-center justify-center w-full h-full font-avenir text-white opacity-[75%] text-[120px] md:text-[160px] lg:text-[200px] font-black relative z-10">
            <h1 className="uppercase">{title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LargeBanner;
