import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { client } from "../../sanity/lib/client";
import CountdownComponent from "./countdownCounter";

const builder = imageUrlBuilder(client);
function urlFor(source: string) {
  return builder.image(source);
}

type Portrait = {
  asset: {
    _ref: string;
    _type: string;
  };
  _type: string;
};

type TData = {
  _key: string;
  portrait: Portrait;
  title: string;
  _type: string;
  time: string;
  endtime: string;
};

type Props = {
  data: TData;
};

export default function LiveContest({ data }: Props) {
  const currentTime = new Date().getTime();

  let time = true;
  if (currentTime < new Date(data.time).getTime()) {
    time = false;
  }

  const timerDisplay = () => {
    const currentTime = new Date();
    const endTime = new Date(data.endtime);
    const startTime = new Date(data.time);

    if (currentTime > startTime && currentTime < endTime) {
      return (
        <CountdownComponent
          timer={data.endtime}
          bgColor="#2E3B4D"
          textColor={"text-white"}
        />
      );
    } else if (currentTime > endTime) {
      return (
        <div className="text-5xl text-[#2E3B4D] font-bold font-lodrian">
          Event Ended
        </div>
      );
    } else {
      return (
        <div className="text-5xl text-[#2E3B4D] font-bold font-lodrian">
          Coming Soon!
        </div>
      );
    }
  };

  return (
    <div className="relative w-full h max-w-[1920px] overflow-hidden">
      <div className="w-full relative h-[500px] lg:h-screen">
        <Image
          src={urlFor(data.portrait.asset._ref).url()}
          alt="banner"
          className="object-cover"
          fill
        />
      </div>
      <div className="absolute lg:w-[500px] text-4xl flex-col font-lodrian text-wrap top-0 left-0 right-0 bottom-0 m-auto flex lg:mt-[106px] text-center lg:h-[136px] mt-16 lg:justify-center text-[#2E3B4D] lg:text-7xl font-bold">
        {data.title.split(" ").map((word, index) => (
          <span className="uppercase">{word}</span>
        ))}
      </div>
      <div className="absolute bottom-0 m-auto lg:mb-[119px] mb-10  flex justify-center w-full">
        {timerDisplay()}
      </div>
    </div>
  );
}
