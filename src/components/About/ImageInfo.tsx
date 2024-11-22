import Image from "next/image";
import { cn, ImgUrl } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../../common/UI/Button";
import { type ButtonType, Color, Portrait } from "@/types";
import { Title } from "@/common";

type ImageInfoData = {
  title: string;
  description: string;
  portrait: Portrait;
  buttons: ButtonType[];
  textColor: Color;
  bgColor: Color;
  _type: string;
  _key: string;
};

type ImageInfoProps = {
  data: ImageInfoData;
  revert?: boolean;
};

const ImageInfo = ({ data, revert = false }: ImageInfoProps) => {
  const { title, description, buttons, bgColor, textColor, portrait } = data;
  const oneWordTitle = title?.split(" ");

  return (
    <section
      className={cn("flex flex-col w-full lg:flex-row max-w-[1920px] mx-auto", {
        "lg:flex-row-reverse": revert,
      })}
    >
      <div
        style={{
          backgroundColor: bgColor?.value || "",
          color: textColor?.value || "",
        }}
        className={
          "lg:w-[50%] bg-pka_blue text-white flex flex-col justify-between px-3 py-16 lg:py-20 gap-y-12 lg:px-12 xl:pr-28"
        }
      >
        <Title className={"text-white mb-[5vw] flex-1"}>
          {oneWordTitle?.map((word, idX) => (
            <div key={word + idX}>{word}</div>
          ))}
        </Title>
        <p className={"font-avenirThin"}>{description}</p>
        {!!buttons?.length && (
          <div className="md:gap-x-3 xl:gap-x-7 mt-6 gap-y-3 flex-col md:flex-row flex text-center items-center">
            {buttons?.map((button) =>
              button?.url ? (
                <Link
                  key={button._key}
                  href={button.url}
                  className={
                    "md:min-w-[180px] lg:min-w-[210px] w-full sm:w-auto"
                  }
                >
                  <Button fullWidth colorVariant={"secondary"}>
                    {button.text}
                  </Button>
                </Link>
              ) : (
                <Button
                  key={button._key}
                  colorVariant={"secondary"}
                  className={
                    "md:min-w-[180px] lg:min-w-[210px] w-full sm:w-auto"
                  }
                >
                  {button.text}
                </Button>
              )
            )}
          </div>
        )}
      </div>

      <div className="lg:w-[50%] aspect-[11/12]">
        <div className={"w-full h-full relative"}>
          <Image
            src={ImgUrl(portrait)}
            alt={"Join peace keepers social image"}
            fill
            className={"object-cover"}
          />
        </div>
      </div>
    </section>
  );
};

export default ImageInfo;
