"use cient";

import Image from "next/image";
import React from "react";

import { ImgUrl } from "@/lib/utils";
import { Container } from "@/common";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Portrait } from "@/types";

type AboutPageHeroData = {
  title: string;
  _type: string;
  _key: string;
  portrait: Portrait;
};

type AboutPageHeroProps = {
  data: AboutPageHeroData;
};

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const AboutPageHero = (props: AboutPageHeroProps) => {
  const container = useRef<HTMLElement | any>();

  useGSAP(
    () => {
      gsap.to(".scaleimage", {
        scale: 2.5,
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          pinSpacing: false,
        },
      });
    },
    { scope: container }
  );

  useGSAP(
    () => {
      gsap.to(".uptitle", {
        y: -150,
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: container }
  );

  useGSAP(
    () => {
      gsap.to(".downtitle", {
        y: 150,
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
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
            <h1
              className={
                "text-6xl max-w-[460px] sm:text-7xl sm:max-w-[520px] tracking-wider text-pka_blue font-thunder font-bold leading-none mx-auto"
              }
            >
              <p>About Peace</p>
              <p>
                Keepers <em className={"font-normal"}>Adventures</em>
              </p>
            </h1>
          </div>
        </div>

        <div className="relative aspect-[10/11]">
          <Image
            src={ImgUrl(props.data.portrait.asset._ref)}
            alt="banner"
            className="object-cover scaleimage"
            fill
          />
        </div>
      </section>

      <section className="hidden lg:block overflow-hidden min-h-[200vh]">
        <Container className={"h-full"} ref={container}>
          <div className={"h-full"}>
            <div className={"pt-28 uptitle mb-4 text-center"}>
              <h1
                className={
                  "text-[calc(13.3dvh)] uppercase text-pka_blue font-thunder font-bold leading-none mx-auto"
                }
              >
                <p className="tracking-wider">
                  {props.data.title.split(" ")[0]}
                </p>
              </h1>
            </div>
            <div className="relative z-[100] scaleimage mx-auto rounded-3xl overflow-hidden lg:w-[50dvw] xl:w-[45dvw] h-[45vh] max-h-[600px]">
              <Image
                src={ImgUrl(props.data.portrait.asset._ref)}
                alt="banner"
                className="object-cover "
                fill
              />
            </div>
            <div className={"mt-8 downtitle xl:mt-10 text-center"}>
              <h1
                className={
                  "text-[calc(13.3dvh)] text-pka_blue font-thunder font-bold leading-none mx-auto"
                }
              >
                <p className="tracking-wider">
                  {props.data.title
                    .split(" ")
                    .slice(1)
                    .map((i) => i.trim())
                    .join(" ")}
                </p>
              </h1>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default AboutPageHero;
