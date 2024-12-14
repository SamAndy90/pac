import { Fragment, ReactNode } from "react";
import AboutPageHero from "@/components/About/AboutPageHero";
import TextSection from "@/components/About/TextSection";
import ImageInfo from "@/components/About/ImageInfo";
import Services from "@/components/About/Services";
import ImageSection from "@/components/About/ImageSection";
import JoinPeaceKeepersBenifit from "@/components/About/JoinPeaceKeepersBenifit";

type AncillaryPageProps = {
  sections: any[];
};

const AllComponents: { [key: string]: (data: any) => ReactNode } = {
  abouthero: (data: any) => <AboutPageHero data={data} />,
  textsection: (data: any) => <TextSection data={data} />,
  "page.ancillary50": (data: any) => <ImageInfo data={data} />,
  "page.services": (data: any) => <Services data={data} />,
  "page.image": (data: any) => <ImageSection data={data} />,
  "page.benifits": (data: any) => <JoinPeaceKeepersBenifit data={data} />,
} as const;

export default function AncillaryPage({ sections }: AncillaryPageProps) {
  if (!sections?.length) return null;

  let DataList: any = [] as ReactNode[];

  DataList = sections?.map((section: any) => {
    if (AllComponents[section._type]) {
      return (
        <Fragment key={section._key}>
          {AllComponents[section._type](section)}
        </Fragment>
      );
    }
  });

  return <>{...DataList}</>;
}
