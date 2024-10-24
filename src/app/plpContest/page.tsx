"use client";

import React, { useEffect, useState } from "react";
import banner from "../../resources/png/Explore.png";
import { ArrowRight, ArrowLeft } from "lucide-react";
import CountdownComponent from "@/components/countdownCounter";

function PLPContest(data: any) {
  const [click, setClicked] = useState(false);
  const [clickTwo, setClickedTwo] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setClicked(false);
        setClickedTwo(false);
      } else {
        setClicked(true);
        setClickedTwo(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="flex-col">
        <div className="mx-10  md:mx-[100px] lg:mx-[160px] xl:mx-[200px] 2xl:mx-[260px] my-32 justify-center flex">
          <div className="!flex flex-col  md:flex-row  md:relative w-[100%] md:h-[300] lg:h-[638px]">
            <div
              className={`flex bg-red-700 relative w-[100%] h-[500px] md:h-[638px] rounded-t-[20px] bg-cover bg-center  ${
                clickTwo
                  ? "md:w-[50%] w-full animate-once animate-out duration-500 transition-all md:rounded-r-none md:rounded-l-[20px] "
                  : "rounded-[20px] animate-out transition-all duration-500 ease-in-out"
              }`}
              style={{
                backgroundImage: `url(${banner.src})`,
                backgroundSize: "96% auto",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="flex ml-auto justify-end items-center">
                  {clickTwo ? (
                    <ArrowRight
                      className="md:w-[20px] text-pka_blue md:h-[21px] lg:w-[30px] lg:h-[31px] xl:w-[40px] xl:h-[41px] 2xl:w-[49px] 2xl:h-[47px] md:block hidden"
                      onClick={() => setClickedTwo(!clickTwo)}
                    />
                  ) : (
                    <ArrowLeft
                      className="md:w-[20px] text-pka_blue md:h-[21px] lg:w-[30px] lg:h-[31px] xl:w-[40px] xl:h-[41px] 2xl:w-[49px] 2xl:h-[47px] md:block hidden"
                      onClick={() => setClickedTwo(!clickTwo)}
                    />
                  )}
                </div>
              </div>
              <div
                className={
                  "w-full h-[638px] justify-center ml-auto items-center"
                }
              >
                <div className="w-[50%]  md:h-[381px]  md:mt-[86px] mb-[171px] flex flex-col items-center  justify-center m-auto">
                  <div className="w-[353.45px] h-[281.17px] flex items-center justify-center">
                    <p className="font-avenirThin text-5xl text-center xl:text-[60px] leading-[68.4px] text-white md:text-4xl">
                      CONTEST 1
                    </p>
                  </div>

                  <div className="   flex justify-center items-center m-auto w-full">
                    <CountdownComponent
                      timer={data.endtime}
                      bgColor="#2E3B4D"
                      textColor={"text-white"}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`w-full md:w-[50%] h-[500px] md:h-[638px] rounded-b-[20px] md:rounded-l-none md:absolute md:right-0  mr-auto bg-[#33455A] items-center ${
                clickTwo
                  ? "block md:rounded-r-[20px] fade-in"
                  : "hidden fade-out"
              }`}
            >
              <div className="w-[90%]  mt-12 md:w-[220px] lg:w-[330px] lg:h-[200px] 2xl:w-[450px] 2xl:h-[276px] m-auto md:justify-center text-balance font-normal md:mt-[145px] font-avenirThin  2xl:text-[24px] md:text-xs lg:text-sm xl:text-base 2xl:leading-[28.8px] text-white">
                Lorem ipsum dolor sit amet consectetur. Laoreet ornare tincidunt
                tortor velit hendrerit facilisi. Amet vulputate ante vitae
                libero tortor eleifend. Morbi in fusce massa mus elit pharetra
                massa. Vulputate vitae placerat pharetra vitae scelerisque nisi
                in eros tellus. Nulla facilisi risus duis vitae risus platea
                pellentesque. Aliquam potenti faucibus fames.
              </div>
              <div className="flex justify-center items-center  flex-col md:items-center m-auto gap-[30px] mt-7 md:flex-col 2xl:flex-row lg:justify-center lg:align-middle">
                <div className="w-[209px] h-[41.28px] flex text-center justify-center items-center uppercase rounded-[8px] border-4 border-white bg-white text-[#33455A] text-[18px] leading-[24px] font-avenirBold">
                  Enter Contest
                </div>
                <div className="w-[209px] h-[41.28px] flex justify-center items-center uppercase rounded-[8px] border-4 border-white text-white bg-pka_blue text-[18px] leading-[24px] font-avenirBold">
                  Join to Enter
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PLPContest;
