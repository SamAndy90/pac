import Image from "next/image";
import React from "react";

import Link from "next/link";
import { NewButton } from "../ui/NewButton";
import { Container } from "@/common";
import BenifitCard from "./BenifitCard";
import { Portrait } from "@/types";
import { SanityDocument } from "next-sanity";

export type TCard = {
  Intro: string;
  Title: string;
  _key: string;
  portrait: Portrait;
};

type TData = {
  title: string;
  cards: TCard[];
  buttons: any[];
};

type JoinPeaceKeepersBenifitProps = {
  data: SanityDocument<TData>;
};

const JoinPeaceKeepersBenifit = ({ data }: JoinPeaceKeepersBenifitProps) => {
  return (
    <section>
      <Container>
        <div className={"flex flex-col items-center py-12 lg:py-14 gap-y-8"}>
          <h1 className="uppercase max-w-xl text-center text-pka_blue font-thunder font-bold text-6xl tracking-wider">
            {data?.title}
          </h1>

          <div className="flex justify-center gap-y-6 gap-x-12 lg:px-40 xl:px-60 2xl:px-80 flex-col md:flex-row">
            {data?.cards?.map((card) => (
              <BenifitCard card={card} key={card._key} />
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full md:items-center justify-center">
            {data?.buttons?.map((button, index) =>
              button?.url ? (
                <Link href={button.url}>
                  <NewButton key={index} colorVariant={button.style} fullWidth>
                    {button.text}
                  </NewButton>
                </Link>
              ) : (
                <NewButton key={index} colorVariant={button.style}>
                  {button.text}
                </NewButton>
              )
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default JoinPeaceKeepersBenifit;
