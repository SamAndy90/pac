"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  currentImageIndex: number;
  allImagesUrl: string[];
};

const ImageDialogViewer = ({ allImagesUrl, currentImageIndex }: Props) => {
  const [imageIndex, setImageIndex] = useState(currentImageIndex);

  const handleNextImage = () => {
    if (imageIndex < allImagesUrl.length - 1) {
      setImageIndex(imageIndex + 1);
    } else {
      setImageIndex(0);
    }
  };

  useEffect(() => {
    setImageIndex(currentImageIndex);
  }, [currentImageIndex, setImageIndex]);

  const handlePreviousImage = () => {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    } else {
      setImageIndex(allImagesUrl.length - 1);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Image
          className="rounded-[20px] object-contain"
          src={allImagesUrl[currentImageIndex]}
          alt="product"
          layout="fill"
          style={{ width: "100%", height: "100%" }}
        />
      </DialogTrigger>
      <DialogContent
        closeClassname="bg-white -top-5 -right-5 rounded-full shadow-lg"
        className="bg-transparent border-none w-4/5 lg:w-full h-[90vh] md:h-[70vh]"
      >
        <div className="relative w-full h-full inset-x">
          <Image
            className="rounded-[20px] object-contain"
            src={allImagesUrl[imageIndex]}
            alt="product"
            // layout="fill"
            fill
          />

          {allImagesUrl.length > 1 && (
            <div className="absolute  inset-x-auto top-1/2 lg:bottom-12 w-full justify-center  gap-9 flex">
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
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialogViewer;
