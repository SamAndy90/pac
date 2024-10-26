"use client";

import { cn, urlFor } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import { Bell, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
// import CartButton from "./shopold/CartButton";
import Image from "next/image";
import { SanityDocument } from "next-sanity";
import { HeaderContentData } from "./Header";
import { client } from "../../sanity/lib/client";
import { Container } from "@/common";
import { CartButton } from "./Shop/CartButton";

type HeaderContentProps = {
  data: SanityDocument<HeaderContentData>;
};

export default function HeaderContent(props: HeaderContentProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [data, setData] = useState(props.data);
  const { isLoaded, isSignedIn, user } = useUser();

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
      <header className="fixed z-50 w-full top-3">
        <Container>
          <nav className="bg-pka_blue text-white tracking-widest text-xl font-thunder font-medium w-full lg:flex items-center z-40 my-5 justify-around hidden rounded-full h-[62px]">
            <div className="flex flex-1 items-center gap-[20px] xl:gap-[57px] 2xl:gap-[68.8px] justify-end ">
              {leftlinks.map((item) => (
                <Link
                  href={item.slug.current}
                  key={item._key}
                  className={"hover:text-pka_green transition-colors"}
                >
                  {item.value}
                </Link>
              ))}
            </div>
            <div className="items-center h-full flex-1 justify-center flex">
              <Link href={"/"} className={"h-full w-full relative"}>
                <Image
                  src={urlFor(logo.asset._ref).url()}
                  alt="PAK Logo"
                  fill
                  className={"object-contain"}
                />
              </Link>
            </div>
            <div className="flex flex-1 items-center justify-between gap-10">
              <div className="flex gap-[20px] xl:gap-[57px] 2xl:gap-[68.8px]">
                {rightlinks.map((item) => (
                  <Link
                    href={item.slug.current}
                    key={item._key}
                    className={
                      "text-white hover:text-pka_green transition-colors tracking-widest"
                    }
                  >
                    {item.value}
                  </Link>
                ))}
              </div>
              <div className="flex gap-x-4 2xl:gap-4 h-6 pr-[24px] xl:pr-[44px] items-center">
                <Link href="/">
                  <Bell className="text-white hover:text-pka_green transition-colors size-[18px]" />
                </Link>

                <CartButton />

                {isSignedIn ? (
                  <UserButton afterSignOutUrl="/sign-in" />
                ) : (
                  <Link href="/sign-in">
                    <User className="text-white hover:text-pka_green transition-colors size-[18px]" />
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </Container>
      </header>

      <div className="flex justify-center w-full">
        <div className={cn("relative mx-3 flex w-full z-50")}>
          <nav
            className={cn(
              "lg:hidden z-50 my-2 w-full items-center h-[62px] px-4 bg-pka_blue rounded-full justify-between flex flex-col absolute lg:flex-row transition-all transform",
              {
                "fixed top-0 left-3 w-[calc(100%-24px)]": isMenuOpen,
              }
            )}
          >
            <div className={"relative w-full h-full"}>
              <div className="flex h-full w-full items-center justify-between">
                <Link
                  href={"/"}
                  className={"max-w-[70px] w-full relative h-full"}
                >
                  <Image
                    src={urlFor(logo.asset._ref).url()}
                    alt="PAK Logo"
                    fill
                    className={"object-cover"}
                  />
                </Link>
                {isMenuOpen ? (
                  <X
                    className="text-white hover:text-pka_green transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  />
                ) : (
                  <Menu
                    className="text-white hover:text-pka_green transition-colors"
                    onClick={() => setIsMenuOpen(true)}
                  />
                )}
              </div>
            </div>
          </nav>
          <div
            className={cn(
              "flex left-0 -translate-y-full transition-transform transform duration-500 pt-24 px-2 h-full fixed top-0 flex-col w-full z-40 bg-pka_blue2 shadow-md text-white pb-5 lg:hidden",
              {
                "translate-y-0": isMenuOpen,
              }
            )}
          >
            <ul className={"overflow-y-auto h-full block w-full"}>
              {burgerlinks.map((item) => (
                <li key={item._key} className={"first:border-t border-b"}>
                  <Link
                    className="text-[12vw] leading-none md:text-6xl block pt-[2vw] pb-[2vw] md:pt-4 md:pb-3 font-thunder tracking-wider hover:text-pka_green transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    href={item.slug.current}
                  >
                    <span className={"block pt-2"}>{item.value}</span>
                  </Link>
                </li>
              ))}
            </ul>
            {/* <CartButton /> */}
            {/* {isSignedIn ? (
                    <UserButton afterSignOutUrl="/sign-in" />
                  ) : (
                    <Link href="/sign-in">
                      <User
                        className="hover:text-pka_green transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      />
                    </Link>)} */}
          </div>
        </div>
      </div>
    </>
  );
}
