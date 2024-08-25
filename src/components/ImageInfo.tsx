import Image from "next/image";
import { cn, urlFor } from "@/lib/utils";
import Link from "next/link";
import { NewButton } from "./ui/NewButton";
import { Button, Color, Portrait } from "@/types";

type ImageInfoData = {
  title: string;
  description: string;
  portrait: Portrait;
  buttons: Button[];
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
  const { title, description, buttons, bgColor, textColor } = data;

  return (
    <section
      className={cn("flex flex-col w-full lg:flex-row max-w-[1920px] mx-auto", {
        "lg:flex-row-reverse": revert,
      })}
    >
      <div
        style={{ backgroundColor: bgColor.value, color: textColor.value }}
        className={
          "flex-1 bg-pka_blue lg:max-w-[52%] text-white flex flex-col justify-center px-3 py-16 lg:py-20 gap-y-12 lg:px-12 xl:pr-28"
        }
      >
        <h2
          className={"uppercase font-thunder font-bold text-6xl tracking-wider"}
        >
          {title}
        </h2>
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
                  <NewButton fullWidth colorVariant={"secondary"}>
                    {button.text}
                  </NewButton>
                </Link>
              ) : (
                <NewButton
                  key={button._key}
                  colorVariant={"secondary"}
                  className={
                    "md:min-w-[180px] lg:min-w-[210px] w-full sm:w-auto"
                  }
                >
                  {button.text}
                </NewButton>
              )
            )}
          </div>
        )}
      </div>

      <div className="flex-1 lg:min-h-[320px] shrink-0">
        <div className={"aspect-[4/3] lg:aspect-auto h-full relative"}>
          <Image
            src={urlFor(data.portrait.asset._ref).url()}
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
