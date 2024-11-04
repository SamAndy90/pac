import Image from "next/image";
import { Container } from "@/common";
import { Portrait } from "@/types";
import { ImgUrl } from "@/lib/utils";
import { SanityDocument } from "next-sanity";

export type HeroData = {
  background: Portrait;
  description: string;
  title: string;
};

type HeroProps = {
  data: SanityDocument<HeroData>;
};

export default function Hero({ data }: HeroProps) {
  const { title, description, background } = data;

  return (
    <section className={"mt-16 lg:mt-24 mb-16 md:mb-24 lg:mb-32"}>
      <Container>
        <div>
          <h1
            className={
              "font-garamond font-bold text-center text-pka_blue text-[9vw] sm:text-[9.3vw] md:text-[9.5vw] leading-none mb-4"
            }
          >
            {title}
          </h1>
          <div className={"flex flex-col lg:flex-row gap-y-16"}>
            <div
              className={
                "relative aspect-[10/9] flex-1 rounded-2xl overflow-hidden"
              }
            >
              <Image
                src={ImgUrl(background)}
                alt={"Main image"}
                fill
                objectFit={"cover"}
              />
            </div>
            <p className="flex-1 lg:self-end xl:text-xl 2xl:text-2xl lg:pl-6 text-pka_blue2 font-avenirThin">
              {description}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

// return (
//   <section className="max-w-[1920px] mx-auto w-full relative">
//     <Image
//       src={urlFor(background.asset._ref).url()}
//       alt={"Hero image"}
//       fill
//       className={"object-cover z-0"}
//     />
//     <div
//       className={"bg-slate-900 opacity-30 absolute h-full w-full z-0"}
//     ></div>
//     <Container>
//       <div
//         className={
//           "flex relative z-10 flex-col justify-between gap-16 min-h-screen"
//         }
//       >
//         {/* <div className="w-full mt-[90px] relative text-white text-center">
//           <Image src={TitleImage} alt={"Title"} className={"mx-auto"} />
//         </div> */}
//         <div className={"flex-1"}>
//           {title && (
//             <h1
//               className={
//                 "mt-32 text-white w-full text-center self-center tracking-widest font-garamond font-bold break-words text-5xl sm:text-7xl md:text-8xl lg:text-9xl"
//               }
//             >
//               {title}
//             </h1>
//           )}
//         </div>

//         <div className="lg:mr-[24px] mb-[37px] justify-end self-end">
//           <p className="max-w-[852px] text-pretty xl:text-xl 2xl:text-2xl text-white font-avenirThin">
//             {description}
//           </p>
//         </div>
//       </div>
//     </Container>
//   </section>
// );
