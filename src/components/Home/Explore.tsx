"use client";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import ExploreIMG from "@/resources/svg/explore.svg";
import { Portrait } from "@/types";
import { Container, Title } from "@/common";
import Link from "next/link";
import { ImgUrl } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Card = {
  title: string;
  link: string;
  portrait: Portrait;
  _key: string;
};

type ExploreProps = {
  baseURL: string;
  data: {
    title: string;
    cards: Card[];
    _key: string;
    _type: string;
  };
};

export default function Explore({ data, baseURL }: ExploreProps) {
  const { title, cards } = data;
  const [sliderRef, keenSlider] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 30,
    },
    loop: true,
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 30,
        },
      },
      "(min-width: 1280px)": {
        slides: {
          perView: 3,
          spacing: 30,
        },
      },
    },
  });

  return (
    <section>
      <Container>
        <div className={"pt-10 pb-14 md:py-14 lg:py-20"}>
          {title && (
            <Title className={"lg:hidden text-center mb-6 lg:mb-8"}>
              {title}
            </Title>
          )}
          <div className={"relative"}>
            <div
              ref={sliderRef}
              className="keen-slider mx-auto sm:max-w-[80%] 2xl:max-w-[85%] w-full"
            >
              {cards?.map((card) => (
                <Link
                  href={`https://pac-nine-alpha.vercel.app/${card.link}`}
                  className={"keen-slider__slide group"}
                  key={card._key}
                >
                  <div className="flex flex-col items-center rounded-[20px] overflow-hidden relative m-auto overflow-x-hidden aspect-[1/1.4] bg-pka_green_light">
                    <h4 className="absolute z-10 text-xl xl:text-2xl font-thunder font-bold tracking-wider bottom-[8.5%] m-auto text-center uppercase text-white/85 duration-500 group-hover:text-white transition-all lg:group-hover:scale-110 lg:group-hover:-translate-y-2">
                      {card.title}
                    </h4>
                    <Image
                      src={ImgUrl(card.portrait)}
                      alt="banner"
                      className="object-cover group-hover:blur-sm transition-all lg:group-hover:scale-105 duration-500"
                      fill
                    />
                    <div
                      className={
                        "absolute opacity-25 transition-opacity duration-500 lg:group-hover:opacity-0 bg-[#0A1200] w-full h-full"
                      }
                    />
                  </div>
                </Link>
              ))}
            </div>
            <div
              className="hidden lg:block absolute z-50 lg:left-[4%] lg:top-1/2 lg:-translate-y-1/2 text-pka_blue2 hover:cursor-pointer lg:hover:text-pka_green lg:active:text-pka_green_light transition-colors"
              onClick={() => keenSlider.current?.prev()}
            >
              <ArrowLeft size={45} />
            </div>
            <div
              className="hidden lg:block absolute z-50 lg:right-[4%] lg:top-1/2 lg:-translate-y-1/2 text-pka_blue2 hover:cursor-pointer lg:hover:text-pka_green lg:active:text-pka_green_light transition-colors"
              onClick={() => keenSlider.current?.next()}
            >
              <ArrowRight size={45} />
            </div>
            <Image
              src={ExploreIMG}
              alt={"Explore"}
              className={
                "hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[64%] pointer-events-none"
              }
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
