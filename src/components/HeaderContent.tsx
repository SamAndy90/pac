"use client";

import { cn, urlFor } from "@/lib/utils";
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
            <nav className="bg-pka_blue flex-1 px-4 lg:px-10 text-white tracking-widest text-xl font-thunder font-medium flex items-center z-40 justify-between lg:justify-around rounded-full h-12 lg:h-[62px]">
              <div className="hidden lg:flex flex-1 items-center gap-[20px] xl:gap-[57px] 2xl:gap-[68.8px] justify-end">
                {leftlinks.map((item) => (
                  <Link
                    href={item.slug.current}
                    key={item._key}
                    className={cn(
                      "lg:hover:text-pka_green active:text-pka_green transition-colors",
                      {
                        "text-pka_green": pathname === item.slug.current,
                      }
                    )}
                  >
                    {item.value}
                  </Link>
                ))}
              </div>
              <div className="items-center h-full flex-1 lg:justify-center flex">
                <Link href={"/"} className={"h-full w-12 lg:w-full relative"}>
                  <Image
                    src={urlFor(logo.asset._ref).url()}
                    alt="PAK Logo"
                    fill
                    className={"object-contain"}
                  />
                </Link>
              </div>
              <div className="flex lg:flex-1 items-center justify-between gap-x-6 lg:gap-x-10">
                <div className="lg:flex hidden gap-[20px] xl:gap-[57px] 2xl:gap-[68.8px]">
                  {rightlinks.map((item) => (
                    <Link
                      href={item.slug.current}
                      key={item._key}
                      className={cn(
                        "text-white lg:hover:text-pka_green active:text-pka_green transition-colors tracking-widest",
                        {
                          "text-pka_green": pathname === item.slug.current,
                        }
                      )}
                    >
                      {item.value}
                    </Link>
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
          "flex left-0 -translate-y-full transition-transform transform duration-500 pt-[74px] px-3 h-full fixed top-0 flex-col w-full z-40 bg-pka_blue2 shadow-md text-white pb-5 lg:hidden",
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
      </div>
    </>
  );
}
