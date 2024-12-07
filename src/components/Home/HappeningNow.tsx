import Link from "next/link";
import { Container, Title } from "@/common";
import { useKeenSlider } from "keen-slider/react";
import { Color, Portrait } from "@/types";
import { EventCard } from "@/common/EventCard";
import { Button } from "@/common/UI/Button";

type TButton = {
  url: string;
  text: string;
  style: "primary" | "secondary";
};

type Card = {
  description: string;
  link: string;
  subtitle: string;
  title: string;
  style: string;
  time: string;
  _key: string;
  timerstyle: { bgcolor: Color; numcolor: Color };
  whereToShow: string;
  homepageStyle: string;
  status: string;
  starttime: string;
  portrait: Portrait;
  buttons?: TButton[];
};

type TData = {
  cards: Card[];
  _type: string;
  _key: string;
  title: string;
  newbutton: TButton[];
};

type HappeningNowProps = {
  data: TData;
};

const HappeningNow = ({ data }: HappeningNowProps) => {
  const { title, cards } = data;

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
    <section className={"bg-pka_blue mx-auto max-w-[1920px]"}>
      <Container>
        <div className="justify-center min-h-screen items-center gap-y-12 md:gap-y-24 overflow-hidden flex flex-col pt-[72px] pb-24">
          <Title className={"text-white text-center"}>{title}</Title>
          <div
            ref={sliderRef}
            className="keen-slider mx-auto sm:max-w-[76%] 2xl:max-w-[80%] w-full"
          >
            {cardsDisplay?.map((card) => (
              <div className={"keen-slider__slide"} key={card._key}>
                <EventCard
                  subtitle={card.subtitle}
                  title={card.title}
                  description={card.description}
                  backgroundImage={card.portrait}
                  countdownBgColor={card.timerstyle.bgcolor.value}
                  countdownTextColor={card.timerstyle.numcolor.value}
                  exploreButtonText={"Explore"}
                  timer={card.time}
                  starttime={card.starttime}
                  style={card.homepageStyle}
                  className={"flex-1"}
                />
              </div>
            ))}
          </div>

          {data?.newbutton?.length > 0 && (
            <Link href={data.newbutton[0].url} className={"mt-16"}>
              <Button colorVariant={"secondary"}>
                {data.newbutton[0].text}
              </Button>
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
};

export default HappeningNow;
