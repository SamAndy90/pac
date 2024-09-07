import Image from "next/image";
import { cn, urlFor } from "@/lib/utils";
import { Portrait } from "@/types";

type ImageData = {
  portrait: Portrait;
  _key: string;
  _type: string;
};

type ImageSectionProps = {
  data: ImageData;
};

const ImageSection = ({ data }: ImageSectionProps) => {
  return (
    <section
      className={cn(
        "lg:aspect-[16/9] aspect-[16/11] relative max-w-[1920px] mx-auto w-full"
      )}
    >
      <Image
        src={urlFor(data.portrait.asset._ref).url()}
        alt={"Background image"}
        fill
        className={"object-cover"}
      />
    </section>
  );
};

export default ImageSection;
