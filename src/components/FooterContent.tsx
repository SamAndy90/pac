"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { client } from "../../sanity/lib/client";
import { Container } from "@/common";
import { FooterContentData } from "./Footer";
import { SanityDocument } from "next-sanity";
import Image from "next/image";
import { cn, ImgUrl } from "@/lib/utils";
import RectangleIMG from "@/resources/svg/footer-rectangle.svg";
import { usePathname } from "next/navigation";

type FooterContentProps = {
  data: SanityDocument<FooterContentData>;
};

const FooterContent = (props: FooterContentProps) => {
  const [data, setData] = useState(props.data);
  const pathname = usePathname();

  const { links, logo, copyright } = data;

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

  if (!data)
    return (
      <div className="flex text-pka_blue justify-center py-5 font-bold">
        No Footer Found, If you want to add or create footer then go to CMS and
        content on Footer
      </div>
    );

  return (
    <footer
      className={cn("max-w-[1920px] relative z-50 w-full mx-auto", {
        hidden: pathname.startsWith("/age-restriction"),
      })}
    >
      <div className={"-mt-16 translate-y-[1px] sm:translate-y-0"}>
        <Image src={RectangleIMG} alt={"Decor"} className={"w-full"} />
      </div>
      <div className={"bg-pka_blue"}>
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
                  "relative -mt-3 -mb-4 md:-mt-5 lg:-mt-8 z-20 mx-auto max-w-[130px] aspect-square"
                }
              >
                <Image
                  src={ImgUrl(logo)}
                  alt={"Logo"}
                  fill
                  className={"object-contain"}
                  priority={true}
                />
              </div>
              {/* <h2
              className={
                "leading-[0.9] w-full break-words py-3 font-bold tracking-wider text-center text-4xl lg:text-5xl font-garamond text-pka_green_light"
              }
            >
              {title}
            </h2> */}
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
                          src={ImgUrl(logo)}
                          alt={"Logo"}
                          width={24}
                          height={24}
                        />
                      )}
                      <Link
                        href={link.slug.current}
                        className={cn(
                          "transition-colors text-pka_green active:text-pka_green_light",
                          {
                            "text-white": pathname === link.slug.current,
                            "lg:hover:text-pka_green_light":
                              pathname !== link.slug.current,
                          }
                        )}
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
      </div>
    </footer>
  );
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
