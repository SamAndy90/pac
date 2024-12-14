import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = {
  data: {
    title: string;
    description: string;
    _type: string;
    _key: string;
  };
} & Pick<HTMLAttributes<HTMLElement>, "className">;

const TextSection = ({ data, className }: Props) => {
  const { title, description } = data;
  return (
    <section
      className={cn(
        "px-3 pt-[16vw] text-pka_blue lg:pt-[10vw] pb-[20vw] lg:pb-[10vw] bg-white text-center",
        className
      )}
    >
      {title && <h2 className={"mb-8 lg:text-xl leading-none"}>{title}</h2>}
      {description && (
        <p
          className={
            "font-garamond font-medium md:w-[90%] mx-auto lg:w-[85%] text-center text-[8vw] md:text-[6vw] lg:text-[4.2vw] leading-none md:leading-[0.9] lg:leading-none"
          }
        >
          {description}
        </p>
      )}
    </section>
  );
};

export default TextSection;
