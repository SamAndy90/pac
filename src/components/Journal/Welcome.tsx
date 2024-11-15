import { Container, Title } from "@/common";
import { ImgUrl } from "@/lib/utils";
import { Portrait } from "@/types";
import Image from "next/image";

export type WelcomeProps = {
  data: {
    title: string;
    description: string;
    textsvg: Portrait;
    _type: string;
    _key: string;
  };
};

export function Welcome({ data }: WelcomeProps) {
  const { title, description, textsvg } = data;

  if (!data) return;

  return (
    <section className={"pt-28 lg:pt-32 pb-24 lg:pb-28"}>
      <Container>
        <div className={"flex flex-col items-center gap-y-4 lg:gap-y-8"}>
          {textsvg && (
            <div
              className={"relative w-[110px] h-[40px] lg:w-[140px] lg:h-[58px]"}
            >
              <Image
                src={ImgUrl(textsvg)}
                alt={"Text Image"}
                fill
                className={"object-contain"}
              />
            </div>
          )}
          {title && (
            <Title className={"text-center mb-2 lg:mb-0"}>{title}</Title>
          )}
          {title && (
            <p
              className={
                "lg:w-[60%] max-w-[800px] text-base text-center text-pka_blue2"
              }
            >
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
