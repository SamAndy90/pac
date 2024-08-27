//@ts-nocheck
import React from "react";
import { PortableText } from "@portabletext/react";
import { ImgUrl } from "@/lib/utils";

type TData = {
  Intro: string;
  _type: string;
  _key: string;
  title: string;
  description: string;
};

type Props = {
  data: TData;
};

// const components = {
//   types: {
//     image: (image: any) => (
//       <div className="w-full">
//         <img
//           className="w-full object-cover"
//           src={ImgUrl(image.value.asset._ref)}
//         />
//       </div>
//     ),
//   },
// };

const TextSection = ({ data }: Props) => {
  const { title, description } = data;
  return (
    <section className="px-3 pt-[16vw] text-pka_black lg:pt-[10vw] pb-[20vw] lg:pb-[10vw] bg-white text-center">
      {title && (
        <h2
          className={
            "uppercase text-6xl lg:text-[5.2vw] mb-6 text-pka_blue tracking-wider leading-none"
          }
        >
          {title}
        </h2>
      )}
      <div className={"mb-8 lg:text-xl leading-none"}>Our Mission.</div>
      <p
        className={
          "font-garamond font-medium md:w-[90%] mx-auto lg:w-[85%] text-center text-[8vw] md:text-[6vw] lg:text-[4.2vw] leading-[1] md:leading-[0.9] lg:leading-[0.9]"
        }
      >
        {description}
      </p>
      {/* <PortableText value={props.data.content} components={components} /> */}
    </section>
  );
};

export default TextSection;
