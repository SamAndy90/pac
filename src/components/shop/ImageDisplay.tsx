"use client";

import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ImageDialogViewer from "../ImageDialogViewer";

type Props = {
  imagesUrl: string[];
};

const ImageDisplay = ({ imagesUrl }: Props) => {
  const [images, setImages] = useState<string[]>(imagesUrl);
  const [imageIndex, setImageIndex] = useState(0);

  const handleNextImage = () => {
    if (imageIndex < images.length - 1) {
      setImageIndex(imageIndex + 1);
    } else {
      setImageIndex(0);
    }
  };

  const handlePreviousImage = () => {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    } else {
      setImageIndex(images.length - 1);
    }
  };

  useEffect(() => {
    setImages(imagesUrl);
  }, [imagesUrl, setImages]);

  const selectedImage = images[imageIndex];

  return (
    <div className="flex items-center  flex-col w-full ">
      <div className="relative rounded-[20px] bg-[#e8e8e8] bg-opacity-50 w-[300px] h-[350px] xl:w-[500px] xl:h-[500px] 2xl:w-[600px] 2xl:h-[600px] flex justify-center">
        <ImageDialogViewer
          currentImageIndex={imageIndex}
          allImagesUrl={images}
        />

        {imagesUrl.length > 1 && (
          <div className="absolute  inset-x-auto bottom-12  gap-9 flex">
            <button
              className="2xl:w-[72px] 2xl:h-[72px] xl:w-16 xl:h-16 w-8 h-8 bg-white flex items-center m-auto rounded-full justify-center"
              onClick={handlePreviousImage}
            >
              <Play className=" transform rotate-180 fill-black 2xl:w-[24px] 2xl:h-[27px] xl:w-5 xh-6 w-4 h-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="2xl:w-[72px] 2xl:h-[72px] xl:w-16 xl:h-16 w-8 h-8 bg-white flex items-center m-auto rounded-full justify-center"
            >
              <Play className="fill-black 2xl:w-[24px] 2xl:h-[27px] xl:w-5 xl:h-6 w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      {imagesUrl.length > 1 && (
        <Carousel className="w-[62%] md:w-[70%] lg:w-[80%]">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem className="basis-1/3 md:basis-1/2 lg:basis-1/3  m-auto  justify-center flex-wrap my-[25px] items-center flex">
                <div
                  key={index}
                  className={cn(
                    "relative w-24 h-24 2xl:w-32 2xl:h-32 xl:w-28 xl:h-28",
                    {
                      "border-2 border-blue-500 rounded-[20px] ":
                        imageIndex === index,
                    }
                  )}
                  onClick={() => {
                    setImageIndex(index);
                  }}
                >
                  <Image
                    src={image}
                    alt="product"
                    className="rounded-[20px]"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
};

export default ImageDisplay;
