"use client";

import React, { useRef } from "react";
import Slider from "react-slick";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { client } from "../../../sanity/lib/client";
import settings from "../../app/utils/ExploreSliderSettings";
interface SliderComponentProps {
  data: any[];
}

function SliderComponent({ data }: SliderComponentProps) {
  const sliderRef = useRef<Slider>(null);

  const builder = imageUrlBuilder(client);

  function urlFor(source: string) {
    return builder.image(source);
  }

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
    <div className="w-full flex  relative ">
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
              <div key={index} className=" flex ">
                <div className="flex flex-col flex-wrap  relative   m-auto  my-10 lg:my-0 overflow-x-hidden w-[280px] h-[400px] lg:w-[277px] lg:h-[396.73px] xl:w-[346px] xl:h-[495.73px] 2xl:w-[416px] 2xl:h-[594px] min-[1920px]:w-[520px] min-[1920px]:h-[743px]  ">
                  <Image
                    src={urlFor(item.potrait.asset._ref).url()}
                    alt="banner"
                    className="rounded-[20px] object-cover"
                    fill
                  />
                  <p className="absolute text-[19.51px] xl:text-[24.39px] 2xl:text-[29.27px] font-lodrian tracking-wider bottom-0 flex m-auto text-center w-full justify-center text-white text-5xl font-londrina-solid-900 mb-[62px]">
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
