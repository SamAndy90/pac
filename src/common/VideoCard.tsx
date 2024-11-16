"use client";

import { useState, useEffect } from "react";
import { Modal } from "antd";
import Image from "next/image";
import { PlayIcon } from "lucide-react";
import ReactPlayer from "react-player";
import { ImgUrl } from "@/lib/utils";
import { Portrait } from "@/types";

interface VideoCardProps {
  cardSrc: Portrait;
  title: string;
  description: string;
  videoUrl: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  cardSrc,
  title,
  description,
  videoUrl,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [play, setPlay] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    setPlay(true);
  };

  useEffect(() => {
    if (!play) {
      setIsModalOpen(false);
    }
  }, [play]);

  const handleOk = () => {
    setIsModalOpen(false);
    setPlay(false);
  };

  const handleCancel = () => {
    setPlay(false);
  };

  return (
    <>
      <div
        onClick={showModal}
        className="relative group hover:cursor-pointer w-full items-center mx-auto xl:max-w-[254px] rounded-2xl lg:rounded-[20px] overflow-hidden aspect-[2/3] bg-[#0A1200]"
      >
        <Image
          src={ImgUrl(cardSrc)}
          alt="bg"
          className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
          fill
        />

        <div className="relative h-full flex flex-col justify-center items-center text-center">
          <div className="text-2xl text-[#CED0CC] transition-colors group-hover:text-white duration-300">
            {title}
          </div>
          <div className="text-xs uppercase transition-colors group-hover:text-white duration-300 text-[#CED0CC]">
            {description}
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="size-[72px] hover:bg-pka_green_light transition-colors flex rounded-full bg-white items-center justify-center">
              <PlayIcon className="text-black size-7 fill-black hover:cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        centered
        afterClose={() => setPlay(false)}
        maskClosable={false}
      >
        <ReactPlayer
          playing={play}
          controls={true}
          url={videoUrl}
          width="auto"
          height="100%"
        />
      </Modal>
    </>
  );
};
