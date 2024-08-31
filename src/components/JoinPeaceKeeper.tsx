import Image from "next/image";
import Link from "next/link";
import { NewButton } from "./ui/NewButton";
import { Color, Portrait } from "@/types";
import { urlFor } from "@/lib/utils";
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
    <section className="flex w-full max-w-[1920px] min-h-screen mx-auto">
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
          <h2
            className={
              "uppercase max-w-[400px] font-thunder font-bold xl:text-7xl text-6xl text-pka_blue tracking-wider"
            }
          >
            {title}
          </h2>
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
                  <NewButton colorVariant={button.style} fullWidth>
                    {button.text}
                  </NewButton>
                </Link>
              ) : (
                <NewButton
                  key={button._key}
                  className={
                    "md:min-w-[180px] lg:min-w-[210px] w-full sm:w-auto"
                  }
                >
                  {button.text}
                </NewButton>
              )
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-[45%] min-w-[45%] shrink-0 relative hidden md:block">
        <Image
          src={urlFor(data.portrait.asset._ref).url()}
          alt={"Join peace keepers social image"}
          fill
          className={"object-cover"}
        />
      </div>
    </section>
  );
};

export default JoinPeaceKeeper;
