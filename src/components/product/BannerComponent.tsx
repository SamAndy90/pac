"use client";
import React, { useEffect, useState } from "react";
import { client } from "../../../sanity/lib/client";
import BannerCard from "./BannerCard";
import { ImgUrl } from "@/lib/utils";

type Props = {
  data: any;
};

export default function BannerComponent({ data }: Props) {
  const [mounted, setMounted] = useState(false);
  const [sectionData, setSectionData] = useState(data);
  useEffect(() => {
    const query = `*[_type == "page" && title == "Shop"]`;

    const subscription = client.listen(query).subscribe((update) => {
      if (update.result?.sections) {
        setSectionData(update.result?.sections[0]);
      }
    });

    return () => subscription.unsubscribe();
  }, [client, setSectionData]);

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted) return null;
  return (
    <BannerCard
      title={sectionData?.title}
      imageUrl={ImgUrl(sectionData?.portrait)}
    />
  );
}
