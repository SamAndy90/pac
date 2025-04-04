"use client";

import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaRegImages } from "react-icons/fa6";

type Image = {
  id: number | string;
  src: string;
  alt: string;
};

export type ImageSliderProps = {
  images: Image[];
  initialSlide?: number;
};

export function ImageSlider(props: ImageSliderProps) {
  const { images, initialSlide = 0 } = props;
  const [currentSlideIdx, setCurrentSlideIdx] = useState(initialSlide);
  const [sliderRef, keenSlider] = useKeenSlider({
    initial: initialSlide,
    slides: {
      perView: 1,
    },
    slideChanged(s) {
      setCurrentSlideIdx(s.track.details.rel);
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      keenSlider.current?.update();
    }, 150);

    return () => clearTimeout(timeout);
  }, [keenSlider]);

  const displayDirectionButtons = images.length > 1;
  const displayPagination = images.length > 1;

  return (
    <div className={"relative mx-[5%] sm:mx-[10%]"}>
      <ul ref={sliderRef} className={"keen-slider aspect-[7/9]"}>
        {!!images.length ? (
          images.map((i) => (
            <li
              key={i.id}
              className={
                "keen-slider__slide rounded-2xl overflow-hidden relative flex items-center justify-center bg-white"
              }
            >
              <Image
                src={i.src}
                alt={i.alt}
                className={"object-contain"}
                fill
              />
            </li>
          ))
        ) : (
          <li
            className={
              "bg-pka_green_light keen-slider__slide rounded-2xl overflow-hidden relative flex items-center justify-center"
            }
          >
            <FaRegImages className={"text-pka_blue2 size-20"} />
          </li>
        )}
      </ul>

      {displayDirectionButtons && (
        <button
          className={
            "absolute left-2 top-1/2 z-40 -translate-y-1/2 text-white hover:text-pka_green transition-colors"
          }
          title={"Preview image"}
          onClick={() => keenSlider.current?.prev()}
        >
          <FiChevronLeft className={"size-10"} />
        </button>
      )}

      {displayDirectionButtons && (
        <button
          className={
            "absolute right-2 top-1/2 z-40 -translate-y-1/2 text-white hover:text-pka_green transition-colors"
          }
          title={"Next image"}
          onClick={() => keenSlider.current?.next()}
        >
          <FiChevronRight className={"size-10"} />
        </button>
      )}

      {displayPagination && (
        <div
          className={
            "absolute bottom-2 left-1/2 z-40 -translate-x-1/2 rounded-lg bg-pka_blue/80 px-2.5 py-0.5 text-sm font-medium tracking-[0.2em] text-white"
          }
        >
          {currentSlideIdx + 1}/{images.length}
        </div>
      )}
    </div>
  );
}
