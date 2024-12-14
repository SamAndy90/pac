import Image from "next/image";
import { Container } from "@/common";
import { Portrait } from "@/types";
import { ImgUrl } from "@/lib/utils";

type HeroProps = {
  data: {
    background: Portrait;
    description: string;
    title: string;
    _key: string;
    _type: string;
  };
};

export default function Hero({ data }: HeroProps) {
  const { title, description, background } = data;

  return (
    <section className={"mt-16 lg:mt-24 mb-16 md:mb-24 lg:mb-32"}>
      <Container>
        <div>
          <h1
            className={
              "font-garamond font-bold text-center text-pka_blue text-[9vw] sm:text-[9.3vw] md:text-[9.5vw] leading-none mb-4"
            }
          >
            {title}
          </h1>
          <div className={"flex flex-col lg:flex-row gap-y-16"}>
            <div
              className={
                "relative aspect-[10/9] flex-1 rounded-2xl overflow-hidden"
              }
            >
              <Image
                src={ImgUrl(background)}
                alt={"Main image"}
                fill
                className={"object-cover"}
                priority
              />
            </div>
            <p className="flex-1 lg:self-end xl:text-xl 2xl:text-2xl lg:pl-6 text-pka_blue2 font-avenirThin">
              {description}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
