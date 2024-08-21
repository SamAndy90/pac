import Image from "next/image";
import React from "react";

import { ImgUrl } from "@/lib/utils";
import Link from "next/link";
import { TCard } from "./JoinPeaceKeepersBenifit";

type BenifitCardProps = {
  card: TCard;
};

const BenifitCard = ({ card }: BenifitCardProps) => {
  return (
    <div className="flex md:max-w-auto w-full mx-auto px-3 py-4 max-w-[80%] gap-y-6 flex-1 flex-col items-center">
      <Image
        src={ImgUrl(card.portrait.asset._ref)}
        width={200}
        height={200}
        alt="banner"
      />
      <div className="text-center">
        <h2 className="uppercase text-pka_blue mb-2 font-thunder font-semibold text-2xl tracking-wider">
          {card?.Title}
        </h2>
        <p className="text-pka_blue max-w-[80%] mx-auto font-avenirThin text-sm lg:text-base">
          {card?.Intro}
        </p>
      </div>
    </div>
  );
};

export default BenifitCard;