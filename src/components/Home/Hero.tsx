"use client";

import Image from "next/image";
import { Container, Title } from "@/common";
import { Portrait } from "@/types";
import { ImgUrl } from "@/lib/utils";
import ReactPlayer from "react-player";

type HeroProps = {
  data: {
    background?: Portrait;
    description: string;
    title: string;
    videoLink?: string;
    _key: string;
    _type: string;
  };
};

export default function Hero({ data }: HeroProps) {
  const { title, description, background, videoLink } = data;

  return (
    <section className={"mt-16 lg:mt-24 mb-16 md:mb-24 lg:mb-32"}>
      <Container>
        <div>
          {/* <h1
            className={
              "font-garamond font-bold text-center text-pka_blue text-[9vw] sm:text-[9.3vw] md:text-[9.5vw] leading-none mb-4"
            }
          >
            {title}
          </h1> */}
          <Title className={"text-center mb-4"}>{title}</Title>
          <div className={"flex flex-col lg:flex-row gap-y-16"}>
            <div
              className={
                "relative aspect-[10/9] flex-1 rounded-2xl overflow-hidden bg-pka_green_light"
              }
            >
              {background && (
                <Image
                  src={ImgUrl(background)}
                  alt={"Main image"}
                  fill
                  className={"object-cover"}
                  priority
                />
              )}
              {/* {videoLink && (
                <ReactPlayer
                  className={"absolute inset-0 object-cover w-full h-full"}
                  playing={true}
                  controls={true}
                  muted={true}
                  url={videoLink}
                  width={"auto"}
                  height={"100%"}
                  config={{
                    youtube: {
                      playerVars: {
                        playsinline: 0,
                        controls: 0,
                        modestbranding: 1,
                        rel: 0,
                        showinfo: 0,
                      },
                    },
                  }}
                />
              )} */}
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
