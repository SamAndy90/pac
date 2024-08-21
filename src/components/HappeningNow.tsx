import Slider from "react-slick";
import Link from "next/link";
import EventCard from "./common/EventCard";
import settings from "../app/utils/HappeningNowSettings";
import { Container } from "@/common";
import { NewButton } from "./ui/NewButton";
import { useKeenSlider } from "keen-slider/react";

type Portrait = {
  asset: {
    _ref: string;
    _type: string;
  };
  _type: string;
};

type Button = {
  url: string;
  text: string;
  style: "primary" | "secondary";
};

type Card = {
  Intro: string;
  link: string;
  subtitle: string;
  Title: string;
  style: string;
  time: string;
  _key: string;
  timerstyle: { bgcolor: Color; numcolor: Color };
  whereToShow: string;
  homepageStyle: string;
  status: string;
  starttime: string;
  portrait: Portrait;
  buttons?: Button[];
};

type TData = {
  cards: Card[];
  _type: string;
  _key: string;
  title: string;
  newbutton: Button[];
};
type Color = {
  label: string;
  value: string;
};

type HappeningNowProps = {
  data: TData;
};

const HappeningNow = ({ data }: HappeningNowProps) => {
  const { title, cards } = data;

  const [sliderRef, instanceRef] = useKeenSlider({
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

  const splitTitle = (title: string) => {
    const words = title.split(" ");
    const firstWord = words.shift();
    const remainingText = words.join(" ");

    return [firstWord, remainingText];
  };

  const cardsDisplay = cards.filter((card) => {
    return card.whereToShow === "homepage" && card.status === "active";
  });

  return (
    <section className={"bg-pka_blue w-full"}>
      <Container>
        <div className="justify-center min-h-screen items-center gap-y-12 md:gap-y-24 overflow-hidden flex flex-col pt-[72px] pb-24">
          <div className="flex justify-center w-full m-auto">
            <p className="font-thunder flex flex-col items-center xl:text-7xl font-bold text-center text-white tracking-wider md:text-6xl text-5xl">
              <span>{splitTitle(title)[0]}</span>
              <span>{splitTitle(title)[1]}</span>
            </p>
          </div>

          <div ref={sliderRef} className="keen-slider mx-auto max-w-[1400px]">
            {cardsDisplay?.map((card) => (
              <div className={"keen-slider__slide"} key={card._key}>
                <EventCard
                  subtitle={card.subtitle}
                  title={card.Title}
                  description={card.Intro}
                  backgroundImage={card.portrait?.asset._ref}
                  countdownBgColor={card.timerstyle.bgcolor.value}
                  countdownTextColor={card.timerstyle.numcolor.value}
                  exploreButtonText="Explore"
                  timer={card.time}
                  starttime={card.starttime}
                  style={card.homepageStyle}
                  className={"flex-1"}
                />
              </div>
            ))}
          </div>

          {/* <div className="hidden w-full lg:flex gap-7 relative justify-center">
            {cardsDisplay.map((card) => {
              return (
                <EventCard
                  key={card._key}
                  title={card.Title}
                  description={card.Intro}
                  backgroundImage={card.portrait?.asset._ref}
                  countdownBgColor={card.timerstyle.bgcolor.value}
                  countdownTextColor={card.timerstyle.numcolor.value}
                  exploreButtonText="Explore"
                  timer={card.time}
                  starttime={card.starttime}
                  style={card.homepageStyle}
                  className={"flex-1"}
                />
              );
            })}
          </div>

          <div className="lg:hidden w-full mx-auto flex">
            <div className="slider-container containerClass" id="happeningNow">
              <Slider {...settings}>
                {cardsDisplay.map((card: any) => (
                  <EventCard
                    key={card._key}
                    title={card.Title}
                    description={card.Intro}
                    backgroundImage={card.portrait?.asset._ref}
                    countdownBgColor={card.timerstyle.bgcolor.value}
                    countdownTextColor={card.timerstyle.numcolor.value}
                    exploreButtonText="Explore"
                    timer={card.time}
                    style={card?.homepageStyle}
                    starttime={card.starttime}
                  />
                ))}
              </Slider>
            </div>
          </div> */}

          {data?.newbutton?.length > 0 && (
            <Link href={data.newbutton[0].url} className={"mt-16"}>
              <NewButton colorVariant={"secondary"}>
                {data.newbutton[0].text}
              </NewButton>
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
};

export default HappeningNow;
