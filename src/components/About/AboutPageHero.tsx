"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";

import Image from "next/image";
import React from "react";

import { cn, ImgUrl } from "@/lib/utils";
import { Container, Title } from "@/common";

import { useRef } from "react";
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
  const upTitleRef = useRef(null);
  const downTitleRef = useRef(null);
  const { title, portrait } = data;

  const { scrollYProgress } = useScroll({
    target: container,
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.03,
  });
  const scale = useTransform(progress, [0, 1], [1, 2.5]);
  const upTitlePosition = useTransform(progress, [0, 1], [0, -150]);
  const downTitlePosition = useTransform(progress, [0, 1], [0, 150]);
  return (
    <>
      <section className="min-h-[200vh] hidden lg:block" ref={container}>
        <Container className={"sticky h-screen top-0 overflow-hidden"}>
          <div
            className={cn(
              "flex flex-col items-center justify-center xl:gap-4 h-full"
            )}
          >
            <motion.div
              className={"text-center flex-1 flex flex-col justify-end"}
              style={{ y: upTitlePosition }}
              ref={upTitleRef}
            >
              {title && (
                <h1
                  className={
                    "text-[calc(13.3dvh)] uppercase text-pka_blue font-thunder font-bold leading-[0.9] tracking-wider mx-auto"
                  }
                >
                  {title.split(" ")[0]}
                </h1>
              )}
            </motion.div>
            <motion.div
              style={{ scale }}
              transition={{
                ease: "easeOut",
                delay: 1,
              }}
              className="relative z-[100] mx-auto rounded-3xl overflow-hidden w-[50dvw] xl:w-[45dvw] h-[45vh] max-h-[600px]"
            >
              <Image
                ref={imgRef}
                src={ImgUrl(portrait)}
                alt={"banner"}
                className={"object-cover"}
                fill
              />
            </motion.div>
            <motion.div
              className={"text-center flex-1"}
              ref={downTitleRef}
              style={{ y: downTitlePosition }}
            >
              {title && (
                <h1
                  className={
                    "text-[calc(13.3dvh)] text-pka_blue font-thunder font-bold leading-[0.9] pt-4 tracking-wider mx-auto"
                  }
                >
                  {title
                    .split(" ")
                    .slice(1)
                    .map((i) => i.trim())
                    .join(" ")}
                </h1>
              )}
            </motion.div>
          </div>
        </Container>
      </section>
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
    </>
  );
};

export default AboutPageHero;
