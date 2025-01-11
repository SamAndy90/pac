"use client";

import Image from "next/image";
import { Portrait } from "@/types";
import { Container, Title } from "@/common";
import { cn, ImgUrl } from "@/lib/utils";
import { motion } from "motion/react";

type Card = {
  title: string;
  description: string;
  icon: Portrait;
  _key: string;
};

type ExploreProps = {
  data: {
    title: string;
    display: string;
    cards: Card[];
  };
};

export default function HowToGetEntered({ data }: ExploreProps) {
  const { title, display, cards } = data;
  return (
    <section className={cn("bg-pka_blue2", { hidden: display === "hide" })}>
      <div className={"pb-8 md:pb-10 lg:pb-12"}>
        <div className={"bg-pka_blue pt-8 md:pt-10 lg:pt-12 pb-2 mb-6"}>
          {title && <Title className={"text-center text-white"}>{title}</Title>}
        </div>
        <Container>
          <motion.div
            initial={"hidden"}
            whileInView={"visible"}
            transition={{
              staggerChildren: 0.3,
            }}
            viewport={{ once: true }}
            className={
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10"
            }
          >
            {cards?.map((card, Idx) => (
              <motion.div
                key={card._key}
                className={"px-3"}
                variants={{
                  hidden: {
                    opacity: 0,
                    x: 600 / (1 + Idx),
                  },
                  visible: {
                    opacity: 1,
                    x: 0,
                  },
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
              >
                <Card data={card} />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </div>
    </section>
  );
}

function Card({ data }: { data: Card }) {
  const { title, description, icon } = data;
  return (
    <div className={"flex flex-col items-center text-center px-3 text-white"}>
      <Image
        src={ImgUrl(icon)}
        alt={"Icon"}
        width={35}
        height={35}
        className={"mb-5"}
      />
      <h5 className={"mb-4 text-2xl"}>{title}</h5>
      <p className={"text-xl"}>{description}</p>
    </div>
  );
}
