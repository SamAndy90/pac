import Image from "next/image";
import { cn, ImgUrl } from "@/lib/utils";
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
        src={ImgUrl(data.portrait)}
        alt={"Background image"}
        fill
        className={"object-cover"}
      />
    </section>
  );
};

export default ImageSection;
