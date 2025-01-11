"use client";

import Link from "next/link";
import { Container, Title } from "@/common";
import { useKeenSlider } from "keen-slider/react";
import { ButtonType, Color, Portrait, Slug } from "@/types";
import { EventCard } from "@/common/EventCard";
import { Button } from "@/common/UI/Button";

export type Card = {
  subtitle?: string;
  subtitlePosition?: string;
  title?: string;
  titlePosition?: string;
  status: string;
  description?: string;
  descriptionPosition?: string;
  ctaComponent: string;
  cta?: {
    ctaLabel?: string;
    ctaLink?: string;
  };
  ctaPosition?: string;
  starttime: string;
  time: string;
  timerstyle: { bgcolor: Color; numcolor: Color };
  slug: Slug;
  portrait: Portrait;
  _key: string;
};

type HappeningNowProps = {
  data: {
    title?: string;
    cards?: Card[];
    buttons?: ButtonType[];
    _type: string;
    _key: string;
  };
};

const HappeningNow = ({ data }: HappeningNowProps) => {
  const { title, cards, buttons } = data;

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1,
      spacing: 30,
    },
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

  const cardsDisplay = cards?.filter((card) => {
    return card.status === "active";
  });

  return (
    <section className={"bg-pka_blue mx-auto max-w-[1920px]"}>
      <Container>
        <div className="justify-center min-h-screen items-center gap-y-12 md:gap-y-24 overflow-hidden flex flex-col pt-[72px] pb-24">
          {title && <Title className={"text-white text-center"}>{title}</Title>}
          <div
            ref={sliderRef}
            className="keen-slider mx-auto sm:max-w-[76%] 2xl:max-w-[80%] w-full"
          >
            {cardsDisplay?.map((card) => (
              <div className={"keen-slider__slide"} key={card._key}>
                <EventCard card={card} className={"flex-1"} />
              </div>
            ))}
          </div>

          {buttons &&
            buttons?.length > 0 &&
            buttons.map((button) => {
              return button?.url ? (
                <Link href={button.url} className={"mt-16"}>
                  <Button colorVariant={button?.style ?? "secondary"}>
                    {button?.text}
                  </Button>
                </Link>
              ) : (
                <Button colorVariant={button?.style ?? "secondary"}>
                  {button?.text}
                </Button>
              );
            })}
        </div>
      </Container>
    </section>
  );
};

export default HappeningNow;
