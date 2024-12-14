"use client";

import Link from "next/link";
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

const FooterContent = ({ data }: FooterContentProps) => {
  const pathname = usePathname();
  const { links, logo, copyright } = data;

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
