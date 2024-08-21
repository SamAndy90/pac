import Image from "next/image";
import React from "react";

import { ImgUrl } from "@/lib/utils";
import { Container } from "@/common";

type TImageAsset = {
  _ref: string;
  _type: "reference";
};

type TImage = {
  _type: "image";
  asset: TImageAsset;
};

type TData = {
  title: string;
  _type: string;
  _key: string;
  portrait: TImage;
};

type Props = {
  data: TData;
};

const AHeader = (props: Props) => {
  return (
    <>
      <section className={"lg:hidden mb-5"}>
        <div className={"px-3"}>
          <div className={"pt-[85px] mb-8 md:mb-12 text-center"}>
            <h1
              className={
                "text-[14vw] uppercase text-pka_blue font-thunder font-bold leading-none mx-auto"
              }
            >
              {props.data.title.split(" ").map((word) => {
                return (
                  <p className="tracking-wider" key={word}>
                    {word}
                  </p>
                );
              })}
            </h1>
          </div>
        </div>

        <div className="relative aspect-[10/11]">
          <Image
            src={ImgUrl(props.data.portrait.asset._ref)}
            alt="banner"
            className="object-cover"
            fill
          />
        </div>
      </section>

      <section className="hidden py-5 lg:block">
        <Container>
          <div>
            <div className={"pt-28 mb-4 text-center"}>
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
            <div className="relative mx-auto rounded-3xl overflow-hidden lg:w-[50dvw] xl:w-[45dvw] h-[45vh] max-h-[600px]">
              <Image
                src={ImgUrl(props.data.portrait.asset._ref)}
                alt="banner"
                className="object-cover"
                fill
              />
            </div>
            <div className={"mt-8 xl:mt-10 text-center"}>
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

export default AHeader;
