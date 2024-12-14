"use client";

import { VideoCard } from "@/common/VideoCard";
import { Container, Title } from "@/common";
import { Portrait } from "@/types";
import { useKeenSlider } from "keen-slider/react";

export type Winner = {
  winnerTitle?: string;
  description?: string;
  videoUrl?: string;
  portrait: Portrait;
  _key: string;
};

type WinnersCircleProps = {
  data: {
    title: string;
    description: string;
    winners: Winner[];
    _type: string;
    _key: string;
  };
};

const WinnersCircle = ({ data }: WinnersCircleProps) => {
  const { title, description, winners } = data;
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1.2,
      spacing: 20,
    },
    breakpoints: {
      "(min-width: 460px)": {
        slides: {
          perView: 1.7,
          spacing: 24,
        },
      },
      "(min-width: 530px)": {
        slides: {
          perView: 2.2,
          spacing: 24,
        },
      },
      "(min-width: 768px)": {
        slides: {
          perView: 3.4,
          spacing: 24,
          origin: "center",
        },
        initial: 1,
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 4,
          spacing: 30,
          origin: "auto",
        },
      },
      "(min-width: 1280px)": {
        slides: {
          perView: 5,
          spacing: 30,
          origin: "auto",
        },
      },
      "(min-width: 1400px)": {
        slides: {
          perView: 6,
          spacing: 30,
          origin: "auto",
        },
      },
    },
  });

  return (
    <section className="w-full overflow-hidden mb-16">
      <Container className={"2xl:max-w-[1680px]"}>
        <div className="relative py-20">
          <div className="max-w-[1100px] gap-y-6 flex flex-col items-center justify-start lg:justify-between mx-auto aspect-square bg-pka_green_light top-0 w-full rounded-full">
            {title && (
              <Title className={"text-center mt-[8.81%]"}>{title}</Title>
            )}
            {description && (
              <p className="text-pka_blue2 font-avenirBold text-lg lg:text-2xl lg:max-w-[645px] max-w-[520px] text-center lg:mb-[13.36%]">
                {description}
              </p>
            )}
            <div className="lg:absolute lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 w-full">
              <div ref={sliderRef} className="keen-slider">
                {winners?.map((card) => (
                  <div className={"keen-slider__slide"} key={card._key}>
                    <VideoCard card={card} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
export default WinnersCircle;
