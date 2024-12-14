"use client";

import { motion, useScroll } from "motion/react";

import Image from "next/image";
import React from "react";

import { cn, ImgUrl } from "@/lib/utils";
import { Container, Title } from "@/common";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Portrait } from "@/types";

type AboutPageHeroProps = {
  data: {
    title?: string;
    portrait: Portrait;
    _type: string;
    _key: string;
  };
};

const AboutPageHero = ({ data }: AboutPageHeroProps) => {
  const container = useRef<HTMLElement | any>(null);
  const imgRef = useRef(null);
  const { title, portrait } = data;

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(".scaleimage", {
        scale: 2.6,
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          pinSpacing: false,
        },
      });

      gsap.to(".uptitle", {
        y: -170,
        scrollTrigger: {
          trigger: container.current,
          start: "-1% top",
          end: "=+500px top",
          scrub: 1,
        },
      });

      gsap.to(".downtitle", {
        y: 170,
        scrollTrigger: {
          trigger: container.current,
          start: "-1% top",
          end: "=+500px top",
          scrub: 1,
        },
      });
    },
    { scope: container }
  );

  return (
    <>
      <section className={"lg:hidden"}>
        <div className={"px-3"}>
          <div className={"pt-[95px] mb-8 md:mb-12 text-center"}>
            {title && (
              <Title>
                <div>{title.split(" ")[0]}</div>
                <div>
                  {title
                    .split(" ")
                    .slice(1)
                    .map((i) => i.trim())
                    .join(" ")}
                </div>
              </Title>
            )}
          </div>
        </div>

        <div className={"relative aspect-[10/11] md:aspect-[4/3] bg-pka_green"}>
          <Image
            src={ImgUrl(portrait)}
            alt={"banner"}
            className={"object-cover"}
            fill
          />
        </div>
      </section>

      <section className="hidden lg:block overflow-hidden min-h-[200vh]">
        <Container className={"h-full"} ref={container}>
          <div
            className={cn("flex flex-col items-center", {
              "pt-[27vh]": !title,
            })}
          >
            {title && (
              <div className={"pt-28 uptitle mb-4 text-center"}>
                <h1
                  className={
                    "text-[calc(13.3dvh)] uppercase text-pka_blue font-thunder font-bold leading-none mx-auto"
                  }
                >
                  <p className="tracking-wider">{title.split(" ")[0]}</p>
                </h1>
              </div>
            )}
            <div className="relative z-[100] scaleimage mx-auto rounded-3xl overflow-hidden lg:w-[50dvw] xl:w-[45dvw] h-[45vh] max-h-[600px]">
              <Image
                ref={imgRef}
                src={ImgUrl(portrait)}
                alt={"banner"}
                className={"object-cover"}
                fill
              />
            </div>
            {title && (
              <div className={"mt-8 downtitle xl:mt-10 text-center"}>
                <h1
                  className={
                    "text-[calc(13.3dvh)] text-pka_blue font-thunder font-bold leading-none mx-auto"
                  }
                >
                  <p className="tracking-wider">
                    {title
                      .split(" ")
                      .slice(1)
                      .map((i) => i.trim())
                      .join(" ")}
                  </p>
                </h1>
              </div>
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export default AboutPageHero;
