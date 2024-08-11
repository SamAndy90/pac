"use client";

import { ImgUrl } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import { Bell, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { client } from "../../sanity/lib/client";
import CartButton from "./shop/CartButton";
import Image from "next/image";
import Logo from "@/resources/png/pac-logo.png";

interface NavItem {
  _id: string;
  name: string;
  link: string;
}

async function getData(): Promise<[NavItem[], NavItem[], any]> {
  const fetchLeftNavs = await client.fetch("*[_type == 'headerLeft'] ");
  const fetchRightNavs = await client.fetch("*[_type == 'headerRight'] ");
  const logo = await client.fetch("*[_type == 'logo'] ");

  return [fetchLeftNavs, fetchRightNavs, logo];
}

export default function Header() {
  const [openNav, setOpenNav] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<[NavItem[], NavItem[], any]>([[], [], {}]);
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await getData();

      setData(fetchedData);
    }
    fetchData();
  }, []);

  console.log(data[0]);

  const desiredLeftSequence = ["HOME", "CONTESTS", "PEACE SOCIAL"];

  // Sort the left menu items according to the desired sequence
  const sortedLeftNavs = data[0].slice().sort((a, b) => {
    return (
      desiredLeftSequence.indexOf(a.name.toUpperCase()) -
      desiredLeftSequence.indexOf(b.name.toUpperCase())
    );
  });

  // Define the desired sequence of right menu items
  const desiredRightSequence = ["SUPPORT", "SHOP", "FACEBOOK"];

  // Sort the right menu items according to the desired sequence
  const sortedRightNavs = data[1].slice().sort((a, b) => {
    return (
      desiredRightSequence.indexOf(a.name.toUpperCase()) -
      desiredRightSequence.indexOf(b.name.toUpperCase())
    );
  });

  let logoUrl = "";
  let logoLink = "";
  if (data[2][0]?.image?.asset?._ref) {
    logoUrl = ImgUrl(data[2][0]?.image?.asset?._ref);
    logoLink = data[2][0]?.link;
  }

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted) {
    return null;
  }

  const mobileNav = [...sortedLeftNavs, ...sortedRightNavs];

  return (
    <>
      <div className="w-full justify-center h-0 flex">
        <div className="w-full flex mx-[18px] relative justify-center">
          <nav className="bg-pka_blue text-xl font-thunder font-medium w-full mx-auto inset-x-0 top-0 lg:flex items-center z-40 my-5 absolute justify-around hidden rounded-full h-[62px]">
            <div className="flex flex-1 items-center gap-[20px] xl:gap-[57px] 2xl:gap-[68.8px] justify-end ">
              {sortedLeftNavs.map((item) => (
                <Link
                  href={item.link}
                  key={item._id}
                  className={
                    "text-white hover:text-pka_green transition-colors tracking-widest"
                  }
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="items-center flex-1 justify-center self-end flex">
              <Link
                href={logoLink}
                className={"size-[177px] translate-y-2 relative"}
              >
                <Image
                  src={Logo}
                  alt="PAK Logo"
                  fill
                  className={"object-cover"}
                />
              </Link>
            </div>
            <div className="flex flex-1 items-center justify-between gap-10">
              <div className="flex gap-[20px] xl:gap-[57px] 2xl:gap-[68.8px]">
                {sortedRightNavs.map((item) => (
                  <Link
                    href={item.link}
                    key={item._id}
                    className={
                      "text-white hover:text-pka_green transition-colors tracking-widest"
                    }
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="flex gap-3 2xl:gap-4 h-6 pr-[24px] xl:pr-[44px] items-center">
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
        </div>
      </div>

      <div className="flex justify-center w-full">
        <div className="relative mx-4 flex w-full z-50">
          <nav className="lg:hidden my-2 w-full items-center h-[62px] px-4 bg-pka_blue rounded-full justify-between flex flex-col absolute lg:flex-row">
            <div className={"relative w-full h-full"}>
              <div className="flex h-full w-full items-center justify-between">
                <Link
                  href={logoLink}
                  className={"max-w-[70px] w-full relative h-full"}
                >
                  <Image
                    src={Logo}
                    alt="PAK Logo"
                    fill
                    className={"object-cover"}
                  />
                </Link>
                {openNav ? (
                  <X
                    className="text-white hover:text-pka_green transition-colors"
                    onClick={() => setOpenNav(false)}
                  />
                ) : (
                  <Menu
                    className="text-white hover:text-pka_green transition-colors"
                    onClick={() => setOpenNav(true)}
                  />
                )}
              </div>
              {openNav && (
                <div className="flex absolute top-0 flex-col w-full z-50 justify-center m-auto mt-[72px] bg-pka_background shadow-md text-black py-5 rounded-lg lg:hidden">
                  <div className="flex items-center justify-center gap-[10px] flex-col">
                    {mobileNav.map((item) => (
                      <Link
                        className="text-lg font-avenirThin hover:text-pka_green transition-colors"
                        onClick={() => setOpenNav(false)}
                        href={item.link}
                        key={item._id}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <CartButton />

                    {isSignedIn ? (
                      <UserButton afterSignOutUrl="/sign-in" />
                    ) : (
                      <Link href="/sign-in">
                        <User
                          className="hover:text-pka_green transition-colors"
                          onClick={() => setOpenNav(false)}
                        />
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
