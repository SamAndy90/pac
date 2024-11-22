import Image from "next/image";
import Link from "next/link";
import { Button } from "../../common/UI/Button";
import { Color, Portrait } from "@/types";
import { ImgUrl } from "@/lib/utils";
import { Title } from "@/common";

interface PeaceKeeperData {
  _id: string;
  portrait: Portrait;
  title: string;
  description: string;
  buttons: any[];
  _updatedAt: string;
  _createdAt: string;
  _rev: string;
  name: string;
  textColor: Color;
  bgColor: Color;
  _type: string;
}

type Props = {
  data: PeaceKeeperData;
};

const JoinPeaceKeeper = ({ data }: Props) => {
  const { title, description, buttons } = data;

  return (
    <section className="flex w-full max-w-[1920px] lg:min-h-screen mx-auto">
      <div
        className={
          "flex-1 py-16 lg:pt-[116px] lg:pb-[136px] px-3 lg:px-12 xl:pr-36"
        }
      >
        <div
          className={
            "flex h-full flex-col justify-center gap-10 md:gap-12 lg:gap-14 xl:gap-20"
          }
        >
          <Title className={"max-w-[400px]"}>{title}</Title>
          <p className={"text-pka_blue mb-3 font-avenirThin"}>{description}</p>
          <div className="md:gap-x-3 xl:gap-x-7 gap-y-2 flex-col md:flex-row flex text-center items-center">
            {buttons?.map((button) =>
              button?.url ? (
                <Link
                  key={button._key}
                  href={button.url}
                  className={
                    "md:min-w-[180px] lg:min-w-[210px] w-full sm:w-auto"
                  }
                >
                  <Button colorVariant={button.style} fullWidth>
                    {button.text}
                  </Button>
                </Link>
              ) : (
                <Button
                  key={button._key}
                  className={
                    "md:min-w-[180px] lg:min-w-[210px] w-full sm:w-auto border-pka_background"
                  }
                >
                  {button.text}
                </Button>
              )
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-[50%] min-w-[50%] relative hidden md:block">
        <Image
          src={ImgUrl(data.portrait)}
          alt={"Join peace keepers social image"}
          fill
          className={"object-cover"}
        />
      </div>
    </section>
  );
};

export default JoinPeaceKeeper;
