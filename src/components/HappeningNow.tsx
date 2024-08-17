import Slider from "react-slick";
import Link from "next/link";
import EventCard from "./common/EventCard";
import settings from "../app/utils/HappeningNowSettings";
import { Container } from "@/common";
import { NewButton } from "./ui/NewButton";

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
        <div className="justify-center min-h-screen items-center gap-y-24 overflow-hidden flex flex-col pt-[72px] pb-24">
          <div className="flex justify-center w-full m-auto">
            <p className="font-thunder flex flex-col items-center xl:text-7xl font-bold text-center text-white tracking-wider md:text-6xl text-5xl">
              <span>{splitTitle(title)[0]}</span>
              <span>{splitTitle(title)[1]}</span>
            </p>
          </div>
          <div className="hidden w-full lg:flex gap-7 relative justify-center">
            {cardsDisplay.map((card) => {
              console.log({ card });

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
          </div>

          {data?.newbutton?.length > 0 && (
            <Link href={data.newbutton[0].url} className={"mt-16"}>
              <NewButton variant={data.newbutton[0].style}>
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
