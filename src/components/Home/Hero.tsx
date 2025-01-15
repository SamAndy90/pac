"use client";

import Image from "next/image";
import { Container, Title } from "@/common";
import { Portrait, Video } from "@/types";
import { getVideoURL, ImgUrl } from "@/lib/utils";
import ReactPlayer from "react-player";
import { Suspense } from "react";

type HeroProps = {
  data: {
    bg?: string;
    picture?: Portrait;
    videoLink?: string;
    videoFile?: Video;
    description: string;
    title: string;
    _key: string;
    _type: string;
  };
};

export default function Hero({ data }: HeroProps) {
  const { title, description, bg, picture, videoLink, videoFile } = data;

  const url = getVideoURL(videoFile);

  return (
    <section className={"mt-16 lg:mt-24 mb-16 md:mb-24 lg:mb-32"}>
      <Container>
        <div>
          <Title className={"text-center mb-4"}>{title}</Title>
          <div className={"flex flex-col lg:flex-row gap-y-16"}>
            <div
              className={
                "relative aspect-[10/9] pointer-events-none select-none flex-1 rounded-2xl overflow-hidden bg-pka_green_light"
              }
            >
              {bg === "image" && picture && (
                <Image
                  src={ImgUrl(picture)}
                  alt={"Main image"}
                  fill
                  className={"object-cover z-0"}
                  priority
                />
              )}
              {bg === "file" && url && (
                <Suspense>
                  <ReactPlayer
                    className={"react-player"}
                    playing={true}
                    controls={false}
                    muted={true}
                    url={url}
                    loop={true}
                    width={"100%"}
                    height={"100%"}
                  />
                </Suspense>
              )}
              {bg === "url" && videoLink && (
                <Suspense>
                  <ReactPlayer
                    className={"react-player"}
                    playing={true}
                    controls={false}
                    muted={true}
                    url={videoLink}
                    loop={true}
                    width={"100%"}
                    height={"100%"}
                    config={{
                      youtube: {
                        playerVars: { controls: 0, modestbranding: 1, rel: 0 },
                      },
                      vimeo: {
                        playerOptions: {
                          controls: false,
                          title: false,
                          byline: false,
                        },
                      },
                      file: {
                        attributes: {
                          controls: false,
                          muted: true,
                          autoPlay: true,
                        },
                      },
                    }}
                  />
                </Suspense>
              )}
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
