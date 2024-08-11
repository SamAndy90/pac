"use client";

import Image from "next/image";
import Link from "next/link";
import React, { ReactNode, useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa6";
import logo from "../resources/svg/logo.svg";
import { client } from "../../sanity/lib/client";
import { ImgUrl } from "@/lib/utils";

type SocialData = {
  platform: string;
  url: string;
};
const formatUrl = (url: string): string => {
  return url?.startsWith("http://") || url?.startsWith("https://")
    ? url
    : `http://${url}`;
};

const SocialComponents: { [key: string]: (data: any) => ReactNode } = {
  Facebook: (data: SocialData) =>
    data.url ? (
      <Link
        href={formatUrl(data.url)}
        target="_blank"
        key={data.platform}
        passHref={true}
        className="bg-[#1466E2] h-[36px] w-[36px] rounded-2xl items-center justify-center flex"
      >
        <FaFacebookF className="w-[9.82px] h-[18px]" />
      </Link>
    ) : null,
  Twitter: (data: SocialData) =>
    data.url ? (
      <Link
        href={formatUrl(data.url)}
        key={data.platform}
        target="_blank"
        className="bg-[#2FB787] h-[36px] w-[36px] rounded-2xl items-center justify-center flex"
      >
        <FaTwitter className="w-[18px] h-[14.6px]" />
      </Link>
    ) : null,
  Linkedin: (data: SocialData) =>
    data.url ? (
      <Link
        href={formatUrl(data.url)}
        target="_blank"
        key={data.platform}
        className="bg-[#F8E168] h-[36px] w-[36px] rounded-2xl items-center justify-center flex"
      >
        <FaLinkedinIn className="w-[18px] h-[17px]" />
      </Link>
    ) : null,
  Instagram: (data: SocialData) =>
    data.url ? (
      <Link
        href={formatUrl(data.url)}
        target="_blank"
        key={data.platform}
        className="bg-[#B7A92F] h-[36px] w-[36px] rounded-2xl items-center justify-center flex"
      >
        <RiInstagramFill className="w-[18px] h-[18px]" />
      </Link>
    ) : null,
  Youtube: (data: SocialData) =>
    data.url ? (
      <Link
        href={formatUrl(data.url)}
        target="_blank"
        key={data.platform}
        className="bg-[#F46073] h-[36px] w-[36px] rounded-2xl items-center justify-center flex"
      >
        <FaYoutube className="w-[19.8px] h-[14px]" />
      </Link>
    ) : null,
};

type TNavLinks = {
  title: string;
  generallink: {
    title: string;
    url: string;
  }[];
};

function NavLinksSection(navlinks: TNavLinks) {
  return (
    <div
      key={navlinks.title}
      className="text-[#FFC52E] font-extrabold  md:text-4xl  2xl:text-[38px] 2xl:leading-[46px] tracking-wider items-center md:items-start   flex flex-col text-4xl   font-lodrian uppercase "
    >
      {navlinks.title}
      <div className="text-white mt-4 tracking-wider md:mt-9 mb-2 md:mb-0   space-y-4 md:space-y-9   uppercase font-avenirThin text-[10px] md:text-[14px] lg:text-lg font-normal">
        {navlinks.generallink.map((linkData) => (
          <div
            key={linkData.url}
            className="flex items-center text-center text-sm text-white font-avenirThin tracking-widest  justify-center m-auto  md:justify-start md:gap-2.5 hover:cursor-pointer"
          >
            <Link
              href={linkData.url}
              className="flex justify-center items-center gap-2"
            >
              {linkData.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

type Props = {
  data: any;
  logo: any;
};

const FooterSubscribeComp = (props: Props) => {
  const [dataValue, setDataValue] = useState(props.data);
  const [logo, setLogo] = useState(props.logo[0]);

  useEffect(() => {
    const query = `*[_type == 'newfooter']`;
    const subscription = client.listen(query).subscribe((update) => {
      if (update.result) {
        setDataValue(update.result);
      }
    });

    return () => subscription.unsubscribe();
  }, [setDataValue, client]);

  useEffect(() => {
    const query = `*[_type == 'logo']`;
    const subscription = client.listen(query).subscribe((update) => {
      if (update.result) {
        setLogo(update.result);
      }
    });

    return () => subscription.unsubscribe();
  }, [client, setLogo]);

  const { generalLinks, socialLinks, copyright, rotatingtitle } = dataValue;

  let logoUrl = "";
  let logoLink = "";
  if (logo?.image?.asset?._ref) {
    logoUrl = ImgUrl(logo?.image?.asset?._ref);
    logoLink = logo?.link;
  }

  return (
    <div className="bg-[#33455a] w-full  items-center m-auto flex-col justify-center flex">
      <div className="  md:flex-col lg:flex-row   flex flex-col  pt-2">
        <div className="flex md:justify-center">
          <div className=" md:justify-start mt-10">
            <Link href={logoLink}>
              <img
                alt="logo"
                src={logoUrl}
                className="md:m-auto lg:m-0 m-auto hover:cursor-pointer"
              />
            </Link>
            <div className="mt-8">
              <div className="flex m-auto  justify-center flex-row gap-4 md:flex md:flex-row md:justify-center lg:hidden lg:justify-start xl:flex xl:flex-row">
                {socialLinks.length > 0 &&
                  socialLinks.map((item: SocialData) => {
                    const SocialPlatform = item.platform.replace(
                      /[^a-zA-Z0-9]/g,
                      ""
                    );
                    if (SocialComponents[SocialPlatform]) {
                      return SocialComponents[SocialPlatform](item);
                    }
                    return null;
                  })}
              </div>
              <div className="md:hidden hidden lg:block xl:hidden">
                <div className="flex gap-2 justify-center">
                  {socialLinks.length > 0 &&
                    socialLinks.map((item: SocialData) => {
                      const SocialPlatform = item.platform.replace(
                        /[^a-zA-Z0-9]/g,
                        ""
                      );
                      if (SocialComponents[SocialPlatform]) {
                        return SocialComponents[SocialPlatform](item);
                      }
                      return null;
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex 2xl:w-[1018px]   xl:w-[900px] lg:w-[700px] lg:m-auto lg:justify-center    md:m-auto ">
          <div className=" justify-center m-auto  w-full   flex-col md:flex-row flex 2xl:gap-32 lg:ml-28 lg:gap-16 mt-[91px] lg:justify-around md:gap-14  md:mt-8">
            {generalLinks.length > 0 &&
              generalLinks.map((genData: any, index: number) => {
                return (
                  <NavLinksSection
                    key={`${genData.title}-${index}`}
                    {...genData}
                  />
                );
              })}
          </div>
        </div>
      </div>

      <div className="marquee">
        <div className="mt-4 w-full md:w-full m-auto  justify-center flex  ">
          <div className=" font-bold  tracking-wider text-center text-5xl text-[#FFC52E] justify-center flex font-lodrian">
            <p>{rotatingtitle}</p>
          </div>
        </div>
      </div>

      <div className="text-white   font-avenirThin  mb-7 mt-4 justify-center text-center m-auto font-medium text-xs mx-3 md:mx-0">
        {copyright}
      </div>
    </div>
  );
};

export default FooterSubscribeComp;
