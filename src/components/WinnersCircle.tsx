"use client";
import Image from "next/image";
import Circle from "../resources/svg/circle.svg";
import VideoCard from "./common/VideoCard";
import Slider from "react-slick";
import winnerSliderSettings from "../app/utils/winnerSliderSettings";
interface CardData {
  cardSrc: string;
  title: string;
  description: string;
  videoUrl: string;
}

type Winner = {
  _key: string;
  portrait: any;
  winnerTitle: string;
  videoUrl: string;
  description: string;
};

type WinnersCircleData = {
  winners: Winner[];
  _type: "winnersCircle";
  _key: string;
  title: string;
  description: string;
};

type Props = {
  data: WinnersCircleData;
};

const WinnersCircle = ({ data }: Props) => {
  const mappedData: CardData[] = data?.winners.map((winner) => {
    return {
      cardSrc: winner.portrait.asset._ref,
      title: winner.winnerTitle,
      description: winner.description,
      videoUrl: winner.videoUrl,
    };
  });

  return (
    <div className="relative w-full mx-[103px] lg:my-20 flex justify-center overflow-hidden">
      <div className="relative flex m-auto lg:bg-transparent h-[800px] lg:h-auto   bg-[#eff178]">
        <div className=" 2xl:w-[880px] 2xl:h-[880px] xl:w-[733px] xl:h-[733px] lg:w-[586px] lg:h-[586px] ">
          <Image src={Circle} alt="circle" className="" />
        </div>
        <div className="flex justify-center  font-lodrian 2xl:top-[112px] xl:top-[95px] lg:top-[78px] top-[80px]  absolute w-full m-auto ">
          <div className=" flex-col 2xl:w-[300px] xl:w-[280px] lg:w-[200px]  justify-center m-auto flex text-center ">
            <div className="uppercase tracking-widest text-3xl lg:text-5xl font-bold text-[#33455A]">
              {data.title}
            </div>
            <div className=" mt-4  lg:hidden flex justify-center max-h-[400px]  items-center m-auto ">
              <p className=" lg:w-[380px] xl:w-[420px] text-justify  2xl:w-[504px] 2xl:text-[13px] w-[90%] 2xl:leading-5   font-avenirThin text-sm lg:text-[10px] lg:leading-3 xl:text-[11px] xl:leading-4 align-middle">
                {data?.description}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-5 w-[100%] xl:w-auto  xl:m-auto xl:flex items-center align-middle">
          <div className="hidden   xl:flex gap-5  ">
            {mappedData?.map((card, index) => (
              <div key={index} className="">
                <VideoCard
                  cardSrc={card.cardSrc}
                  title={card.title}
                  description={card.description}
                  videoUrl={card.videoUrl}
                />
              </div>
            ))}
          </div>
          <div
            id="winnerCircle"
            className=" slider-container mt-24 lg:mt-4 container  block xl:hidden containerClass"
          >
            <Slider {...winnerSliderSettings}>
              {mappedData?.map((card, index) => (
                <div key={index} className="">
                  <VideoCard
                    cardSrc={card.cardSrc}
                    title={card.title}
                    description={card.description}
                    videoUrl={card.videoUrl}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="absolute hidden lg:absolute w-full 2xl:bottom-[128px] xl:bottom-[111px] lg:bottom-[60px]  lg:flex m-auto  ">
          <div className="flex justify-center  items-center m-auto ">
            <p className=" lg:w-[380px] xl:w-[420px] 2xl:w-[504px] 2xl:text-[13px] w-[80%] 2xl:leading-5  text-center font-avenirThin text-sm lg:text-[10px] lg:leading-3 xl:text-[11px] xl:leading-4 align-middle">
              {data?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WinnersCircle;
