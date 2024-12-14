import Image from "next/image";
import React from "react";

import { ImgUrl } from "@/lib/utils";
import { BenefitCard } from "./JoinPeaceKeepersBenifit";

type BenifitCardProps = {
  card: BenefitCard;
};

const BenifitCard = ({ card }: BenifitCardProps) => {
  return (
    <div className="flex md:max-w-auto w-full mx-auto px-3 py-4 max-w-[80%] gap-y-6 flex-1 flex-col items-center">
      <Image
        src={ImgUrl(card.portrait)}
        width={100}
        height={100}
        alt="banner"
      />
      <div className="text-center">
        <h2 className="uppercase text-pka_blue mb-2 font-thunder font-semibold text-2xl tracking-widest">
          {card?.title}
        </h2>
        <p className="text-pka_blue max-w-[80%] mx-auto font-avenirThin">
          {card?.description}
        </p>
      </div>
    </div>
  );
};

export default BenifitCard;
