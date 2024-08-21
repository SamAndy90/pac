import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { client } from "../../sanity/lib/client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { NewButton } from "./ui/NewButton";
// Define TypeScript types for peace keeper data
interface PeaceKeeperData {
  _id: string;
  portrait: {
    _type: string;
    asset: {
      _ref: string;
    };
  };
  title: string;
  description: string;
  buttons: any[];
  _updatedAt: string;
  _createdAt: string;
  _rev: string;
  name: string;
  textColor: {
    label: string;
    value: string;
  };

  bgColor: {
    label: string;
    value: string;
  };
  _type: string;
}

const builder = imageUrlBuilder(client);
function urlFor(source: string) {
  return builder.image(source);
}

type Props = {
  data: PeaceKeeperData;
};

const GivingBack = ({ data }: Props) => {
  const { title, description, buttons } = data;

  return (
    <section className="flex flex-col w-full lg:flex-row max-w-[1920px] mx-auto">
      <div
        className={
          "flex-1 bg-pka_blue text-white flex flex-col justify-center px-3 py-16 lg:py-20 gap-y-12 lg:px-12 xl:pr-36"
        }
      >
        <h2
          className={"uppercase font-thunder font-bold text-6xl tracking-wider"}
        >
          {title}
        </h2>
        <p className={"font-avenirThin mb-6"}>{description}</p>
        <div className="md:gap-x-3 xl:gap-x-7 gap-y-3 flex-col md:flex-row flex text-center items-center">
          {buttons?.map((button) => (
            <NewButton
              key={button._key}
              colorVariant={"secondary"}
              className={"md:min-w-[180px] lg:min-w-[210px]"}
            >
              {button?.url ? (
                <Link href={button.url}>{button.text}</Link>
              ) : (
                button.text
              )}
            </NewButton>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[320px] lg:max-w-[48%] shrink-0">
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

export default GivingBack;
