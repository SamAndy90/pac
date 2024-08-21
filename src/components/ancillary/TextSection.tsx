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
    <section className="mx-3 pt-20 pb-12 text-center">
      <h2
        className={
          "uppercase text-6xl lg:text-[5.2vw] mb-6 text-pka_blue tracking-wider font-thunder font-bold leading-none"
        }
      >
        {title}
      </h2>
      <p
        className={
          "md:max-w-[85%] mx-auto text-pka_black font-avenirThin text-xl lg:text-2xl 2xl:max-w-[1280px]"
        }
      >
        {description}
      </p>
      {/* <PortableText value={props.data.content} components={components} /> */}
    </section>
  );
};

export default TextSection;
