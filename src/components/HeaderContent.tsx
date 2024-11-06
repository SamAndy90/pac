"use client";

import { cn, ImgUrl } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import { Bell, Menu, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { SanityDocument } from "next-sanity";
import { HeaderContentData } from "./Header";
import { client } from "../../sanity/lib/client";
import { Container } from "@/common";
import { CartButton } from "./Shop/CartButton";
import { FiX } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { LinkType } from "@/types";

const social: LinkType[] = [
  {
    label: "LinkedIn",
    url: "http://www.linkedin.com",
  },
  {
    label: "Instagram",
    url: "http://www.instagram.com",
  },
];

type HeaderContentProps = {
  data: SanityDocument<HeaderContentData>;
};

export default function HeaderContent(props: HeaderContentProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [data, setData] = useState(props.data);
  const { isLoaded, isSignedIn, user } = useUser();
  const pathname = usePathname();

  const { logo, leftlinks, rightlinks, burgerlinks } = data;

  useEffect(() => {
    const query = `*[_type == 'header']`;
    const subscription = client
      .listen<SanityDocument<HeaderContentData>>(query)
      .subscribe((update) => {
        if (update.result) {
          setData(update.result);
        }
      });

    return () => subscription.unsubscribe();
  }, [setData, client]);

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) return;
    body.style.overflow = isMenuOpen ? "hidden" : "";
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed z-50 w-full lg:top-3">
        <Container>
          <div className={"py-2 lg:py-5 flex gap-x-2"}>
            <nav className="bg-pka_blue flex-1 px-4 lg:px-10 text-white tracking-widest text-base font-thunder font-medium flex items-center z-40 justify-between lg:justify-around rounded-full h-12 lg:h-[62px] relative">
              <div className="hidden lg:flex flex-1 items-center gap-x-3">
                {leftlinks.map((item, Idx) => (
                  <div
                    key={item._key}
                    className={"gap-x-3 flex items-center justify-center"}
                  >
                    {!!Idx && (
                      <Image
                        src={ImgUrl(logo)}
                        alt={"Logo"}
                        width={24}
                        height={24}
                      />
                    )}
                    <Link
                      href={item.slug.current}
                      className={cn(
                        "relative before:bg-white before:absolute before:w-0 before:transition-all hover:before:w-full before:rounded-sm before:bottom-1 before:h-0.5 before:duration-500 tracking-widest",
                        {
                          "before:w-full before:bg-pka_green before:hover:bg-pka_green":
                            pathname === item.slug.current,
                        }
                      )}
                    >
                      {item.value}
                    </Link>
                  </div>
                ))}
              </div>
              <div className="items-center h-full absolute w-16 top-1/2 left-4 sm:left-1/2 sm:-translate-x-1/2 -translate-y-1/2 lg:justify-center flex">
                <Link href={"/"} className={"h-full w-12 lg:w-full relative"}>
                  <Image
                    src={ImgUrl(logo)}
                    alt="PAK Logo"
                    fill
                    className={"object-contain"}
                  />
                </Link>
              </div>
              <div className="flex flex-1 items-center justify-end gap-x-6 lg:gap-x-10">
                <div className="lg:flex hidden gap-x-3">
                  {rightlinks.map((item, Idx) => (
                    <div
                      key={item._key}
                      className={"gap-x-3 flex items-center justify-center"}
                    >
                      {!!Idx && (
                        <Image
                          src={ImgUrl(logo)}
                          alt={"Logo"}
                          width={24}
                          height={24}
                        />
                      )}
                      <Link
                        href={item.slug.current}
                        className={cn(
                          "relative before:bg-white before:absolute before:w-0 before:transition-all hover:before:w-full before:rounded-sm before:bottom-1 before:h-0.5 before:duration-500 tracking-widest",
                          {
                            "before:w-full before:bg-pka_green before:hover:bg-pka_green":
                              pathname === item.slug.current,
                          }
                        )}
                      >
                        {item.value}
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="flex gap-x-4 2xl:gap-4 h-6 items-center">
                  <Bell className="text-white lg:hover:text-pka_green transition-colors size-5" />
                  <CartButton />
                  {isSignedIn ? (
                    <UserButton
                      afterSignOutUrl={"/sign-in"}
                      appearance={{
                        elements: {
                          userButtonTrigger:
                            "size-8 focus:shadow-none lg:!shadow-pka_green lg:focus:shadow-[0_0_0_2px]",
                          userButtonPopoverActionButtonIcon:
                            "text-pka_blue size-5",
                          userButtonPopoverActionButtonText: "text-pka_blue2",
                          userButtonPopoverCard: "ml-3 sm:ml-0",
                        },
                      }}
                    />
                  ) : (
                    <Link href="/sign-in">
                      <User className="text-white lg:hover:text-pka_green transition-colors size-5" />
                    </Link>
                  )}
                </div>
              </div>
            </nav>
            <div
              className={
                "lg:hidden size-12 bg-pka_blue rounded-full flex items-center justify-center"
              }
            >
              {isMenuOpen ? (
                <FiX
                  className="text-white size-6 active:text-pka_green transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                />
              ) : (
                <Menu
                  className="text-white size-6 active:text-pka_green transition-colors"
                  onClick={() => setIsMenuOpen(true)}
                />
              )}
            </div>
          </div>
        </Container>
      </header>

      <div
        className={cn(
          "flex left-0 -translate-y-full transition-transform transform duration-500 pt-28 px-3 h-full fixed top-0 flex-col w-full z-40 bg-pka_blue2 shadow-md text-white pb-5 lg:hidden",
          {
            "translate-y-0": isMenuOpen,
          }
        )}
      >
        <ul className={"overflow-y-auto h-full block w-full"}>
          {burgerlinks.map((item) => (
            <li
              key={item._key}
              className={"first:border-t border-pka_green_light border-b "}
            >
              <Link
                className={cn(
                  "text-[12vw] leading-none md:text-6xl block pt-[2vw] pb-[2vw] md:pt-4 md:pb-3 font-thunder tracking-wider active:text-pka_green transition-colors",
                  {
                    "text-pka_green": pathname === item.slug.current,
                  }
                )}
                onClick={() => setIsMenuOpen(false)}
                href={item.slug.current}
              >
                <span className={"block pt-2"}>{item.value}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className={"pt-14"}>
          <ul
            className={
              "flex flex-wrap text-white tracking-wider lg:text-lg items-center gap-x-2 text-center"
            }
          >
            {social.map(({ label, url }, idX) => {
              return (
                <li
                  key={url}
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
                    href={url}
                    target={"_blank"}
                    className={cn(
                      "transition-colors text-pka_green active:text-pka_green_light hover:text-white"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
