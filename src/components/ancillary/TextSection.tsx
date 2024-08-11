//@ts-nocheck
import React from "react";
import { PortableText } from "@portabletext/react";
import { ImgUrl } from "@/lib/utils";

type TData = {
  Intro: string;
  _type: string;
  _key: string;
  title: string;
  content: any;
};

type Props = {
  data: TData;
};

const components = {
  types: {
    image: (image: any) => (
      <div className="w-full">
        <img
          className="w-full object-cover"
          src={ImgUrl(image.value.asset._ref)}
        />
      </div>
    ),
  },
};

const TextSection = (props: Props) => {
  return (
    <div className="mx-10 my-5 lg:my-[220px] mt-20 lg:mx-[226px] flex flex-col gap-y-[79px]  text-justify richtext richtext-h2 richtext-h3">
      <PortableText value={props.data.content} components={components} />
    </div>
  );
};

export default TextSection;
