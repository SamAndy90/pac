import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { client } from "../../sanity/lib/client";
import { Button } from "./ui/button";
import { Container } from "@/common";

const builder = imageUrlBuilder(client);

function urlFor(source: string) {
  return builder.image(source);
}
//Deine return types for sanity response
type TImageAsset = {
  _ref: string;
  _type: "reference";
};

type TImage = {
  _type: "image";
  asset: TImageAsset;
};

type TData = {
  portrait: TImage;
  Intro: string;
  _type: "hero";
  name: string;
  Title: string;
  SubTitle: string;
  style: string;
  _key: string;
};

type Props = {
  data: TData;
};

export default function HeroSection({ data }: Props) {
  switch (data.style) {
    case "style1":
      return <Style1 data={data} />;
    case "style2":
      return <Style2 data={data} />;
    case "style3":
      return <Style3 data={data} />;
    default:
      return <Style1 data={data} />;
  }
}

const Style1 = ({ data }: { data: any }) => {
  return (
    <div className="flex flex-col pt-2 lg:flex-row justify-center items-center  max-w-[1920px]">
      <div className="flex flex-col">
        <div className="flex flex-col w-full z-30">
          <p className="font-lodrian flex flex-col text-[#5DCBF9] text-5xl lg:text-[220px] m-auto tracking-widest text-center lg:text-left">
            {data.Title}
            <span className="text-xl capitalize font-extrabold text-[#5DCBF9] text-right font-inter tracking-wider mr-3">
              {data.SubTitle}
            </span>
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex flex-col lg:flex-row -mt-14">
            <div className="lg:w-1/2">
              {data.data?.portrait?.asset && (
                <Image
                  src={urlFor(data?.portrait?.asset?._ref)?.url() || ""}
                  width={921}
                  height={941}
                  alt="banner"
                />
              )}
            </div>
            <div className="lg:w-1/2 flex flex-col justify-between text-blue-500">
              <div className="mt-5 lg:mt-0 w-full lg:flex lg:flex-col mr-0 flex justify-end"></div>
              <div className="mb-10 ml-8 w-full lg:w-3/4">
                <p className="text-lg font-thin lg:text-lg leading-6 text-[#33455A] font-avenirThin">
                  {data.Intro}
                </p>

                <Button
                  size={"lg"}
                  className="text-white mt-12 font-bold font-inter text-lg capitalize align-middle rounded-lg w-52 border-2 bg-[#33455AE5]"
                >
                  ABOUT
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Style2 = ({ data }: { data: any }) => {
  return (
    <section className="max-w-[1920px] w-full relative">
      <Image
        src={urlFor(data.portrait.asset._ref).url()}
        alt={"Hero image"}
        fill
        className={"object-cover"}
      />
      <div className={"bg-slate-900 opacity-30 absolute h-full w-full"}></div>
      <Container>
        <div
          className={
            "flex flex-col justify-between gap-16 min-h-[calc(100vh-72px)]"
          }
        >
          <div className="w-full mt-[90px] text-white text-center">
            <p className="font-thunder uppercase w-full font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,.25)] text-5xl md:text-6xl lg:text-7xl xl:text-9xl 2xl:text-[144px] tracking-[.3em]">
              <span>{data.Title}</span>
              <span className="text-xl lg:-ml-4 xl:-ml-6 2xl:-ml-8 font-extrabold font-inter tracking-[.3em] text-[#96D8E0]">
                co
              </span>
            </p>
          </div>

          <div className="bottom-0 relative inset-x-0 flex lg:mr-[24px] mb-[37px] justify-end">
            <p className="max-w-[852px] text-pretty xl:text-xl 2xl:text-2xl text-white font-avenirThin">
              {data.Intro}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

const Style3 = ({ data }: { data: any }) => {
  return (
    <div className=" max-w-[1920px] w-full min-h-[1536px]">
      <div className="min-h-[1536px] flex relative ">
        <div className="absolute top-[92px] w-full">
          <div className=" flex flex-col mx-auto  z-30 relative items-center justify-center">
            <div className="flex flex-col items-center w-auto mx-auto">
              <p className="font-lodrian text-white md:text-5xl lg:text-[220px] tracking-widest text-center">
                {data.Title}
              </p>
              <p className="text-xl capitalize font-extrabold text-white md:self-center lg:self-center 2xl:self-end font-inter tracking-wider mr-3">
                {data.SubTitle}
              </p>
            </div>
          </div>
        </div>
        <div className="flex min-h-full w-full">
          <div className="bg-[#2E3B4D] flex-1 flex flex-col justify-end">
            <div className="flex flex-col ml-[40px] mb-[34px]">
              <div className="w-[584px]">
                <p className="text-lg leading-[29px] font-thin lg:text-[19.2px]  text-white font-avenirThin">
                  {data.Intro}
                </p>
              </div>
              <div className="flex gap-[23px] mt-[24px]">
                {data.buttons?.map((button: any, index: number) => (
                  <Button
                    key={button.text + index}
                    variant={"default"}
                    className={button.className}
                  >
                    {button.text}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <Image
              src={urlFor(data?.portrait?.asset?._ref)?.url()}
              fill
              className="object-cover"
              alt="banner"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
