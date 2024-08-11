import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image";
import { client } from "../../sanity/lib/client";
import { Button } from "./ui/button";
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

const Card50 = ({ data }: Props) => {
  // Function to split the title into two lines
  const splitTitle = (title: string) => {
    const words = title.split(" ");
    const firstWord = words.shift();
    const remainingText = words.join(" ");
    return [firstWord, remainingText];
  };

  const { title, description, buttons, bgColor, textColor } = data;

  const colorImage = cn(
    "w-full lg:h-full bg-opacity-80 lg:bg-opacity-100",
    `bg-[${bgColor?.value.replace(/[^a-zA-Z0-9,#() ]/g, "")}]`
  );

  return (
    <section className="flex w-full py-12 md:pt-[116px] md:pb-[136px] max-w-[1920px] min-h-screen mx-auto">
      <div className={"flex-1 py-16 px-3 lg:px-12 xl:pr-36"}>
        <div className={"flex flex-col justify-center gap-20"}>
          <h2
            className={
              "uppercase font-thunder font-bold text-7xl text-pka_blue tracking-wider"
            }
          >
            {title}
          </h2>
          <p className={"text-pka_blue font-avenirThin"}>{description}</p>
          <div className="md:gap-x-3 xl:gap-x-7 gap-y-3 flex-col md:flex-row flex text-center items-center">
            {buttons?.map((button) => (
              <NewButton
                key={button._key}
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

export default Card50;

// <section className="flex flex-col lg:flex-row w-full max-w-[1920px] lg:h-screen mx-auto">
//   <div
//     className={cn("w-full flex !lg:bg-none lg:h-full lg:w-1/2")}
//     style={{
//       backgroundImage: `url(${urlFor(data.portrait.asset._ref).url()})`,
//       backgroundSize: "cover",
//       backgroundPosition: "center",
//       backgroundRepeat: "no-repeat",
//     }}
//   >
//     <div className={colorImage}>
//       <div className=" mt-10  tracking-widest 2xl:mt-[92px] xl:mt-[98px] lg:mt-[78px] lg:text-[25px] lg:leading-[30px] 2xl:text-[38px] xl:text-[32px] xl:w-[250px] lg:w-[200px] 2xl:w-[300px] 2xl:leading-[46px] justify-center m-auto lg:ml-[50px] flex flex-col font-extrabold text-6xl lg:text-7xl font-lodrian text-[#EFF178] text-center lg:text-left">
//         <span>{splitTitle(title)[0]}</span>
//         <span>{splitTitle(title)[1]}</span>
//       </div>
//       <div
//         className={cn(
//           "text-justify lg:text-left w-4/5 lg:ml-[50px] justify-center lg:w-[373px] m-auto flex text-lg lg:mt-[38px] 2xl:leading-[28px] mt-[68px] xl:mt-[46px] 2xl:mt-[56px] lg:text-[12px] lg:leading-5 text-balance 2xl:text-[19px] xl:text-[16px] xl:leading-[24px] xl:w-[466px] 2xl:w-[560px] font-avenirThin"
//         )}
//         style={{
//           color: textColor?.value.replace(/[^a-zA-Z0-9,#() ]/g, ""),
//         }}
//       >
//         {description}
//       </div>
//       <div className=" mt-10 mb-16 gap-y-3 lg:gap-y-0  lg:ml-[50px] lg:mt-[54px]  lg:gap-4 m-auto  flex-col lg:flex-row 2xl:mt-[50px] xl:mt-[68px] xl:gap-[19px] 2xl:gap-[23px] flex align-middle text-center items-center">
//         {buttons?.map((button, index) => (
//           <Button key={button._key} variant={button.style}>
//             {button?.url ? (
//               <Link href={button.url}>{button.text}</Link>
//             ) : (
//               button.text
//             )}
//           </Button>
//         ))}
//       </div>
//     </div>
//   </div>
//   <div className="w-full hidden  lg:w-1/2 relative lg:flex">
//     <img
//       style={{ width: "100%", height: "100%" }}
//       src={urlFor(data.portrait.asset._ref).url()}
//       alt="banner"
//       className="object-fill lg:object-cover "
//     />
//   </div>
// </section>
