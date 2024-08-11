import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import Image from "next/image";
import { PlayIcon } from "lucide-react";
import { client } from "../../../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import ReactPlayer from "react-player";

interface VideoCardProps {
  cardSrc: string;
  title: string;
  description: string;
  videoUrl: string;
}

const builder = imageUrlBuilder(client);

function urlFor(source: string) {
  return builder.image(source);
}

const VideoCard: React.FC<VideoCardProps> = ({
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
        className="relative hover:cursor-pointer items-center m-auto w-[202px] h-[303px] lg:h-[202px] lg:w-[135px]  gap-5 lg:gap-0 xl:h-[252.67px] xl:w-[168.67px]  2xl:w-[202px] 2xl:h-[303px]"
      >
        <Image
          src={urlFor(cardSrc).url()}
          alt="bg"
          className="rounded-lg "
          fill
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
          <div className="text-2xl text-white">{title}</div>
          <div className="text-base text-white">{description}</div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="text-base h-10 w-10 flex rounded-full bg-white items-center justify-center">
              <PlayIcon className="text-black h-5 w-5 fill-black  hover:cursor-pointer" />
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

export default VideoCard;
