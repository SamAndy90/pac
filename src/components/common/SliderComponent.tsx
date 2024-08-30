"use client";

import React, { useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import settings from "../../app/utils/ExploreSliderSettings";
import { urlFor } from "@/lib/utils";
interface SliderComponentProps {
  data: any[];
}

function SliderComponent({ data }: SliderComponentProps) {
  const sliderRef = useRef<Slider>(null);

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <div className="w-full flex relative ">
      <div
        className="hidden items-center lg:flex h-full lg:justify-center lg:!align-middle absolute  z-50 lg:left-[14px]  xl:left-[18px] 2xl:left-[21px] min-[1920px]:left-[26px]  text-black hover:cursor-pointer"
        onClick={goToPrev}
      >
        <ArrowLeft size={45} />
      </div>
      <div
        className="hidden lg:flex items-center h-full lg:justify-center lg:!align-middle absolute lg:right-[14px]  z-50  xl:right-[18px] 2xl:right-[21px] min-[1920px]:right-[26px]  text-black hover:cursor-pointer"
        onClick={goToNext}
      >
        <ArrowRight size={45} />
      </div>
      <div className="slider-container containerClass ">
        <div className="lg:mx-[85px] xl:mx-[106px] 2xl:mx-32 min-[1920px]:mx-40 overflow-hidden">
          <Slider {...settings} ref={sliderRef}>
            {data.map((item: any, index: number) => (
              <div key={index} className="flex group">
                <div className="flex flex-col flex-wrap items-center rounded-[20px] overflow-hidden relative m-auto my-10 lg:my-0 overflow-x-hidden w-[280px] h-[400px] lg:w-[277px] lg:h-[396.73px] xl:w-[346px] xl:h-[495.73px] 2xl:w-[416px] 2xl:h-[594px] min-[1920px]:w-[520px] min-[1920px]:h-[743px]">
                  <Image
                    src={urlFor(item.potrait.asset._ref).url()}
                    alt="banner"
                    className="object-cover transition-opacity duration-300"
                    fill
                  />
                  <div
                    className={
                      "absolute opacity-20 transition-opacity duration-300 group-hover:opacity-0 bg-[#0A1200] w-full h-full"
                    }
                  ></div>
                  <p className="absolute text-[19.51px] xl:text-[24.39px] 2xl:text-2xl font-thunder tracking-wider bottom-[8.5%] m-auto text-center uppercase text-white text-5xl font-bold">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default SliderComponent;
