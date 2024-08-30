import React from "react";

import Image from "next/image";
import Explore from "../resources/svg/explore.svg";
import SliderComponent from "./common/SliderComponent";
import { Portrait } from "@/types";

interface SliderCard {
  id: string;
  potrait: Portrait;
  title: string;
}

type Card = {
  _key: string;
  cardTitle: string;
  cardImage: Portrait;
};

type Explore = {
  cards: Card[];
  _type: "Explore";
  _key: string;
  title: string;
};

type Props = {
  data: Explore;
};

export default function CardsSection({ data }: Props) {
  const sliderCardData: SliderCard[] = data.cards.map((card) => {
    return {
      id: card._key,
      potrait: card.cardImage,
      title: card.cardTitle,
    };
  });

  return (
    <section className="relative overflow-hidden mx-auto max-w-[1920px]">
      <div className="flex flex-col lg:flex-row justify-center items-center relative  mt-10 mb-14 md:my-14 lg:my-20">
        <SliderComponent data={sliderCardData} />
      </div>
      <div className="absolute top-5 responsive-inset items-center flex w-full justify-center">
        <div className="relative w-1/2 mb-8 lg:pb-0 lg:mt-0 lg:w-[684px] xl:w-[856px] 2xl:w-[1024px] ">
          <div className="w-full h-full">
            <Image
              src={Explore}
              alt="banner"
              className={"pointer-events-none"}
            />
            {/* <h5
              className={
                "text-[300px] relative pointer-events-none text-transparent leading-none bg-clip-text overflow-hidden font-thunder bg-white/65 font-bold tracking-[0.15em]"
              }
            >
              EXPLORE
            </h5> */}
          </div>
        </div>
      </div>
    </section>
  );
}
