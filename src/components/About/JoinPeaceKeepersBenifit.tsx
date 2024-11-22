import Link from "next/link";
import { Button } from "../../common/UI/Button";
import { Container, Title } from "@/common";
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
    <section className={"mb-16"}>
      <Container>
        <div className={"flex flex-col items-center py-12 lg:py-14 gap-y-8"}>
          <Title className={"max-w-xl text-center"}>{data?.title}</Title>

          <div className="flex justify-center gap-y-6 gap-x-12 lg:px-40 xl:px-60 2xl:px-80 flex-col md:flex-row">
            {data?.cards?.map((card) => (
              <BenifitCard card={card} key={card._key} />
            ))}
          </div>
          {data?.buttons && (
            <div className="flex flex-col sm:flex-row gap-2 w-full md:items-center justify-center">
              {data.buttons.map((button, index) =>
                button?.url ? (
                  <Link href={button.url} key={button.url + index}>
                    <Button colorVariant={button.style} fullWidth>
                      {button.text}
                    </Button>
                  </Link>
                ) : (
                  <Button key={index} colorVariant={button.style}>
                    {button.text}
                  </Button>
                )
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default JoinPeaceKeepersBenifit;
