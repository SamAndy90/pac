"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { client } from "../../sanity/lib/client";
import { Container } from "@/common";
import { FooterContentData } from "./Footer";
import { SanityDocument } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/lib/utils";

type FooterContentProps = {
  data: SanityDocument<FooterContentData>;
};

const FooterContent = (props: FooterContentProps) => {
  const [data, setData] = useState(props.data);

  const { links, title, logo, copyright } = data;

  useEffect(() => {
    const query = `*[_type == 'footer']`;
    const subscription = client
      .listen<SanityDocument<FooterContentData>>(query)
      .subscribe((update) => {
        if (update.result) {
          setData(update.result);
        }
      });

    return () => subscription.unsubscribe();
  }, [setData, client]);

  return (
    <footer
      className={
        "bg-pka_blue w-full max-w-[1920px] mx-auto relative mt-14 overflow-x-clip z-10 before:absolute before:z-0 after:z-0 before:-translate-y-10 lg:before:-translate-y-14 before:top-0 before:-left-[5%] before:h-10 lg:before:h-14 before:-rotate-[4deg] before:origin-top-right before:bg-pka_blue before:w-[55%] after:absolute after:top-0 after:-translate-y-10 lg:after:-translate-y-14 after:-right-[5%] after:h-10 lg:after:h-14 after:rotate-[4deg] after:origin-top-left after:bg-pka_blue after:w-[55%]"
      }
    >
      <Container>
        <div
          className={
            "pb-3 gap-y-3 gap-x-1 lg:pb-4 flex flex-col lg:flex-row lg:items-end items-center justify-between"
          }
        >
          <p
            className={
              "flex-1 order-3 lg:order-1 font-avenirThin text-xs text-white"
            }
          >
            {copyright}
          </p>
          <div className="flex-1 w-full order-1 lg:order-2">
            <div
              className={
                "relative -my-10 z-20 mx-auto max-w-[150px] aspect-square"
              }
            >
              <Image
                src={urlFor(logo.asset._ref).url()}
                alt={"Logo"}
                fill
                className={"object-contain"}
              />
            </div>
            <h2
              className={
                "leading-[0.9] w-full break-words py-3 font-bold tracking-wider text-center text-4xl lg:text-5xl font-garamond text-pka_green_light"
              }
            >
              {title}
            </h2>
          </div>
          <nav className={"flex-1 order-2 lg:order-3"}>
            <ul
              className={
                "flex flex-wrap text-white font-thunder tracking-wider lg:text-lg justify-center items-center gap-x-2 text-center"
              }
            >
              {links.map((link, idX) => {
                return (
                  <li
                    key={link.value}
                    className={"gap-x-2 flex items-center justify-center"}
                  >
                    {!!idX && (
                      <Image
                        src={urlFor(logo.asset._ref).url()}
                        alt={"Logo"}
                        width={24}
                        height={24}
                      />
                    )}
                    <Link
                      href={link.slug.current}
                      className={"transition-colors hover:text-pka_green"}
                    >
                      {link.value}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
  // return (
  //   <footer className={"bg-pka_blue"}>
  //     <Container>
  //       <div className={"py-1"}>
  //         <nav className={"py-16"}>
  //           <ul
  //             className={
  //               "flex flex-col md:flex-row text-white font-averia text-[17px] justify-center md:justify-evenly items-center text-center gap-y-5 gap-x-4"
  //             }
  //           >
  //             {links.map((link: any) => {
  //               return (
  //                 <li
  //                   key={link.value}
  //                   className={
  //                     "transition-colors uppercase hover:text-pka_green_light"
  //                   }
  //                 >
  //                   <Link href={link.slug.current}>{link.value}</Link>
  //                 </li>
  //               );
  //             })}
  //           </ul>
  //         </nav>
  //         <div className="py-10 leading-none font-bold tracking-wider text-center text-7xl font-thunder text-pka_green_light">
  //           <p>{title}</p>
  //         </div>
  //       </div>
  //     </Container>
  //   </footer>
  // );
};

export default FooterContent;

// type SocialData = {
//   platform: string;
//   url: string;
// };
// const formatUrl = (url: string): string => {
//   return url?.startsWith("http://") || url?.startsWith("https://")
//     ? url
//     : `http://${url}`;
// };

// const SocialComponents: { [key: string]: (data: any) => ReactNode } = {
//   Facebook: (data: SocialData) =>
//     data.url ? (
//       <Link
//         href={formatUrl(data.url)}
//         target="_blank"
//         key={data.platform}
//         passHref={true}
//         className="bg-[#1466E2] h-[36px] w-[36px] rounded-2xl items-center justify-center flex"
//       >
//         <FaFacebookF className="w-[9.82px] h-[18px]" />
//       </Link>
//     ) : null,
//   Twitter: (data: SocialData) =>
//     data.url ? (
//       <Link
//         href={formatUrl(data.url)}
//         key={data.platform}
//         target="_blank"
//         className="bg-[#2FB787] h-[36px] w-[36px] rounded-2xl items-center justify-center flex"
//       >
//         <FaTwitter className="w-[18px] h-[14.6px]" />
//       </Link>
//     ) : null,
//   Linkedin: (data: SocialData) =>
//     data.url ? (
//       <Link
//         href={formatUrl(data.url)}
//         target="_blank"
//         key={data.platform}
//         className="bg-[#F8E168] h-[36px] w-[36px] rounded-2xl items-center justify-center flex"
//       >
//         <FaLinkedinIn className="w-[18px] h-[17px]" />
//       </Link>
//     ) : null,
//   Instagram: (data: SocialData) =>
//     data.url ? (
//       <Link
//         href={formatUrl(data.url)}
//         target="_blank"
//         key={data.platform}
//         className="bg-[#B7A92F] h-[36px] w-[36px] rounded-2xl items-center justify-center flex"
//       >
//         <RiInstagramFill className="w-[18px] h-[18px]" />
//       </Link>
//     ) : null,
//   Youtube: (data: SocialData) =>
//     data.url ? (
//       <Link
//         href={formatUrl(data.url)}
//         target="_blank"
//         key={data.platform}
//         className="bg-[#F46073] h-[36px] w-[36px] rounded-2xl items-center justify-center flex"
//       >
//         <FaYoutube className="w-[19.8px] h-[14px]" />
//       </Link>
//     ) : null,
// };

// type TNavLinks = {
//   title: string;
//   generallink: {
//     title: string;
//     url: string;
//   }[];
// };

// function NavLinksSection(navlinks: TNavLinks) {
//   return (
//     <div
//       key={navlinks.title}
//       className="text-[#FFC52E] font-extrabold  md:text-4xl  2xl:text-[38px] 2xl:leading-[46px] tracking-wider items-center md:items-start   flex flex-col text-4xl   font-lodrian uppercase "
//     >
//       {navlinks.title}
//       <div className="text-white mt-4 tracking-wider md:mt-9 mb-2 md:mb-0   space-y-4 md:space-y-9   uppercase font-avenirThin text-[10px] md:text-[14px] lg:text-lg font-normal">
//         {navlinks.generallink.map((linkData) => (
//           <div
//             key={linkData.url}
//             className="flex items-center text-center text-sm text-white font-avenirThin tracking-widest  justify-center m-auto  md:justify-start md:gap-2.5 hover:cursor-pointer"
//           >
//             <Link
//               href={linkData.url}
//               className="flex justify-center items-center gap-2"
//             >
//               {linkData.title}
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// return (
//   <div className="bg-pka_blue w-full  items-center m-auto flex-col justify-center flex">
//     <div className="  md:flex-col lg:flex-row   flex flex-col  pt-2">
//       <div className="flex md:justify-center">
//         <div className=" md:justify-start mt-10">
//           <Link href={logoLink}>
//             <img
//               alt="logo"
//               src={logoUrl}
//               className="md:m-auto lg:m-0 m-auto hover:cursor-pointer"
//             />
//           </Link>
//           <div className="mt-8">
//             <div className="flex m-auto  justify-center flex-row gap-4 md:flex md:flex-row md:justify-center lg:hidden lg:justify-start xl:flex xl:flex-row">
//               {socialLinks.length > 0 &&
//                 socialLinks.map((item: SocialData) => {
//                   const SocialPlatform = item.platform.replace(
//                     /[^a-zA-Z0-9]/g,
//                     ""
//                   );
//                   if (SocialComponents[SocialPlatform]) {
//                     return SocialComponents[SocialPlatform](item);
//                   }
//                   return null;
//                 })}
//             </div>
//             <div className="md:hidden hidden lg:block xl:hidden">
//               <div className="flex gap-2 justify-center">
//                 {socialLinks.length > 0 &&
//                   socialLinks.map((item: SocialData) => {
//                     const SocialPlatform = item.platform.replace(
//                       /[^a-zA-Z0-9]/g,
//                       ""
//                     );
//                     if (SocialComponents[SocialPlatform]) {
//                       return SocialComponents[SocialPlatform](item);
//                     }
//                     return null;
//                   })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="flex 2xl:w-[1018px]   xl:w-[900px] lg:w-[700px] lg:m-auto lg:justify-center    md:m-auto ">
//         <div className=" justify-center m-auto  w-full   flex-col md:flex-row flex 2xl:gap-32 lg:ml-28 lg:gap-16 mt-[91px] lg:justify-around md:gap-14  md:mt-8">
//           {generalLinks.length > 0 &&
//             generalLinks.map((genData: any, index: number) => {
//               return (
//                 <NavLinksSection
//                   key={`${genData.title}-${index}`}
//                   {...genData}
//                 />
//               );
//             })}
//         </div>
//       </div>
//     </div>

//     <div className="font-bold tracking-wider text-center text-7xl font-thunder text-pka_green_light">
//       <p>{title}</p>
//     </div>

//     <div className="marquee">
//       <div className="mt-4 w-full md:w-full m-auto  justify-center flex  ">
//         <div className=" font-bold tracking-wider text-center text-5xl text-pka_green_light justify-center flex font-lodrian">
//           <p>{rotatingtitle}</p>
//         </div>
//       </div>
//     </div>

//     <div className="text-white   font-avenirThin  mb-7 mt-4 justify-center text-center m-auto font-medium text-xs mx-3 md:mx-0">
//       {copyright}
//     </div>
//   </div>
// );
