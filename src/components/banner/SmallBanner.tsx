import React from "react";

type Props = {
  title: string;
  imageUrl: string;
};

const SmallBanner = ({ imageUrl, title }: Props) => {
  return (
    <div className="w-full mt-24 h-[238px] md:h-[300px] lg:h-[300px] rounded-lg relative flex justify-center  items-center overflow-hidden">
      <div className="w-full mx-2 relative rounded-lg h-full">
        <div className="absolute inset-0 bg-[#0A1200] bg-opacity-20 rounded-lg"></div>
        <img
          src={imageUrl}
          alt="banner"
          className="object-cover rounded-lg w-full h-full"

          // layout="fill"
        />
      </div>

      <div className="absolute flex justify-center items-center inset-0">
        <div className="text-center flex items-center justify-center w-full h-full font-avenir text-white opacity-[75%] text-[120px] md:text-[160px] lg:text-[200px] font-black relative z-10">
          <h1 className="">{title}</h1>
        </div>
      </div>
    </div>
  );
};

export default SmallBanner;
