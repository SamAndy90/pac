"use client";

import { ReactNode, useEffect, useState } from "react";
import { client } from "../../../sanity/lib/client";
import AboutPageHero from "@/components/About/AboutPageHero";
import TextSection from "@/components/About/TextSection";
import ImageInfo from "@/components/About/ImageInfo";
import Services from "@/components/About/Services";
import ImageSection from "@/components/About/ImageSection";
import JoinPeaceKeepersBenifit from "@/components/About/JoinPeaceKeepersBenifit";

type AncillaryPageProps = {
  sections: any;
  title?: string;
};

const AllComponents: { [key: string]: (data: any) => ReactNode } = {
  abouthero: (data: any) => <AboutPageHero data={data} />,
  textsection: (data: any) => <TextSection data={data} />,
  "page.ancillary50": (data: any) => <ImageInfo data={data} />,
  "page.services": (data: any) => <Services data={data} />,
  "page.image": (data: any) => <ImageSection data={data} />,
  "page.benifits": (data: any) => <JoinPeaceKeepersBenifit data={data} />,
  "page.imageInfo": (data: any) => <ImageInfo data={data} revert={true} />,
} as const;

const AncillaryPage = ({ sections, title = "About" }: AncillaryPageProps) => {
  const [sectionData, setSectionsData] = useState(sections);
  const [mounted, setMounted] = useState(false);

  const DataList: ReactNode[] =
    sectionData.map((section: any) => {
      if (AllComponents[section._type]) {
        return AllComponents[section._type](section);
      }
    }) || [];

  useEffect(() => {
    const query = `*[_type == "page" && title == "${title}"]`;

    const subscription = client.listen(query).subscribe((update) => {
      if (update.result?.ancillarysections.sections) {
        setSectionsData(update.result?.ancillarysections.sections);
      }
    });

    return () => subscription.unsubscribe();
  }, [setSectionsData, client, title]);

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex w-full flex-col justify-center">{...DataList}</div>
  );
};

export default AncillaryPage;
