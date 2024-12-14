"use client";

import { SanityDocument } from "next-sanity";
import age18IMG from "@/resources/png/age-restriction.png";
import Image from "next/image";
import { cn, ImgUrl } from "@/lib/utils";
import { Title } from "@/common";
import { Button } from "@/common/UI/Button";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AgeRestrictionData } from "@/app/age-restriction/page";

export type RestrictionContentProps = {
  data: SanityDocument & AgeRestrictionData;
};
export function RestrictionContent({ data }: RestrictionContentProps) {
  const [ageData, setAgeData] = useState(data);
  const router = useRouter();

  useEffect(() => {
    setAgeData(data);
  }, [data]);

  const {
    title = "Welcome to our website",
    message = "Please confirm your age to log in. Are you over 18?",
    logo,
  } = ageData;

  const handleConfirm = () => {
    Cookies.set("ageVerified", "true", { expires: 1 });
    setTimeout(() => {
      router.push("/");
    }, 0);
  };

  const handleReject = () => {
    window.location.assign("https://www.google.com");
  };

  return (
    <div className={"flex flex-col items-center gap-y-7 sm:gap-y-10 py-2"}>
      <div className={"flex flex-col items-center text-center"}>
        <div
          className={
            "relative size-20 rounded-full bg-pka_blue p-1 mb-4 xl:mb-6"
          }
        >
          <Image
            src={logo ? ImgUrl(logo) : age18IMG}
            alt={"Logo"}
            fill
            className={cn("object-contain", { "translate-y-1": logo })}
          />
        </div>
        <Title className={"xl:text-5xl text-4xl"}>{title}</Title>
        <p>{message}</p>
      </div>
      <div
        className={
          "flex flex-col sm:flex-row gap-x-4 gap-y-1 items-center justify-center w-full"
        }
      >
        <Button fullWidth className={"sm:w-auto"} onClick={handleReject}>
          No
        </Button>
        <Button fullWidth className={"sm:w-auto"} onClick={handleConfirm}>
          Yes
        </Button>
      </div>
    </div>
  );
}
