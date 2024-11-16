import { ImgUrl } from "@/lib/utils";
import { Portrait } from "@/types";
import Image from "next/image";

type Props = {
  title: string;
  image: Portrait;
};

const BannerCard = async ({ title, image }: Props) => {
  return (
    <div className="w-full mt-28 mb-20 h-[300px] md:h-[450px] lg:h-[638px] rounded-lg relative flex justify-center items-center overflow-hidden">
      <div className="w-full mx-2 relative rounded-lg h-full">
        <div className="absolute inset-0 bg-pka_green bg-opacity-20 rounded-lg"></div>
        <Image
          src={ImgUrl(image)}
          alt="banner"
          className="object-cover rounded-lg"
          layout="fill"
        />
      </div>

      <div className="absolute flex justify-center items-center inset-0">
        <div className="text-center flex items-center justify-center w-full text-opacity-70 text- h-full font-avenir text-white text-[80px] leading-[80px] md:text-[120px] md:leading-[80px] lg:text-[160px] lg:leading-3 xl:text-[180px] 2xl:text-[200px] 2xl:leading-3 font-black relative z-10">
          {title}
        </div>
      </div>
    </div>
  );
};

export default BannerCard;
