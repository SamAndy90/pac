import React from "react";

import Image from "next/image";
import Explore from "../resources/png/Explore.png";
import SliderComponent from "./common/SliderComponent";

interface SliderCard {
  id: string;
  potrait: {
    asset: {
      _ref: string;
    };
  };
  title: string;
  // Add any other properties if needed
}

type CardImage = {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
};

type Card = {
  _key: string;
  cardTitle: string;
  cardImage: CardImage;
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
    <div className="relative overflow-hidden w-full  max-w-[1920px]">
      <div className="flex   flex-col lg:flex-row justify-center items-center relative  mt-10 mb-14 md:my-14 lg:my-20">
        <SliderComponent data={sliderCardData} />
      </div>
      <div className="absolute  top-5 responsive-inset  items-center  flex w-full justify-center">
        <div className="relative w-1/2  h-12 md:h-24 mb-8  lg:pb-0   lg:mt-0  lg:w-[684px] xl:w-[856px] 2xl:w-[1024px] ">
          <div className="w-full h-full">
            <Image src={Explore} alt="banner" />
          </div>
        </div>
      </div>
    </div>
  );
}
