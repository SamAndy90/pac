import Slider from "react-slick";
import Link from "next/link";
import EventCard from "./common/EventCard";
import { Button } from "./ui/button";
import settings from "../app/utils/HappeningNowSettings";
type Portrait = {
  asset: {
    _ref: string;
    _type: string;
  };
  _type: string;
};

type Button = {
  url: string;
  className: string;
  text: string;
  style: string;
};

type Card = {
  Intro: string;
  link: string;
  Title: string;
  style: string;
  time: string;
  _key: string;
  Color: Color;
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
  buttons: Button[];
};
type Color = {
  label: string;
  value: string;
};

type Props = {
  data: TData;
};

const HappeningNow = ({ data }: Props) => {
  const { title } = data;

  const splitTitle = (title: string) => {
    const words = title.split(" ");
    const firstWord = words.shift();
    const remainingText = words.join(" ");

    return [firstWord, remainingText];
  };

  const cardsDisplay = data.cards
    .filter((card) => {
      return (
        card.whereToShow.replace(/[^a-zA-Z0-9]/g, "") === "homepage" &&
        card.status.replace(/[^a-zA-Z0-9]/g, "") === "active"
      );
    })
    .slice(0, 3);

  return (
    <div className="w-full max-w-[1920px] justify-center items-center overflow-hidden lg:px-10 bg-[#33455A] flex flex-col ">
      <div className="flex justify-center w-full m-auto mt-[68px] mb-[88px]  ">
        <p
          className="font-lodrian  font-extrabold text-center text-[#62CCB4] tracking-wider m-auto
          md:text-4xl md:w-96 2xl:text-[38px] 2xl:leading-[46px] justify-center 2xl:w-[392px] 2xl:h-[92px] 2xl:justify-center
          text-4xl sm:w-80"
        >
          <span className="flex justify-center m-auto">
            {splitTitle(title)[0]}
          </span>
          <span className="flex justify-center m-auto">
            {splitTitle(title)[1]}
          </span>
        </p>
      </div>
      <div className="hidden lg:flex flex-col md:flex-col lg:flex-row  xl:flex-row  gap-5 lg:relative justify-center">
        {cardsDisplay.map((card) => {
          return (
            <EventCard
              title={card.Title}
              description={card.Intro}
              backgroundImage={card.portrait?.asset._ref.replace(
                /[^a-zA-Z0-9-]/g,
                ""
              )}
              countdownBgColor={card.Color.value}
              countdownTextColor="text-black"
              exploreButtonText="Explore"
              timer={card.time}
              starttime={card.starttime}
              style={card.homepageStyle.replace(/[^a-zA-Z0-9]/g, "")}
            />
          );
        })}
      </div>

      <div className="w-full mx-auto flex ">
        <div
          className="lg:hidden slider-container containerClass  "
          id="happeningNow"
        >
          <Slider {...settings}>
            {cardsDisplay.map((card: any, index: number) => (
              <div className="">
                <EventCard
                  title={card.Title}
                  description={card.Intro}
                  backgroundImage={card.portrait?.asset._ref.replace(
                    /[^a-zA-Z0-9-]/g,
                    ""
                  )}
                  countdownBgColor={card.Color.value}
                  countdownTextColor="text-black"
                  exploreButtonText="Explore"
                  timer={card.time}
                  style={card?.homepageStyle?.replace(/[^a-zA-Z0-9]/g, "")}
                  starttime={card.starttime}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="flex mt-[125px] justify-center w-full m-auto lg:mt-[95px] lg:mb-[49px] xl:mt-[118px] xl:mb-[61px]  2xl:mt-[152px] 2xl:mb-[82px] mb-[88px] ">
        {data?.buttons?.length > 0 && (
          <Button variant={data.buttons[0].style as any}>
            <Link href={data.buttons[0].url}>{data.buttons[0].text}</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default HappeningNow;
