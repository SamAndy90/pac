import { ReactNode } from "react";
import TextSection from "./ancillary/TextSection";
import JoinPeaceKeepersBenifit from "./ancillary/JoinPeaceKeepersBenifit";
import ImageInfo from "./ImageInfo";
import ImageSection from "./ImageSection";
import Services from "./Services";
import AboutPageHero from "./ancillary/AboutPageHero";

const AllComponents: { [key: string]: (data: any) => ReactNode } = {
  abouthero: (data: any) => <AboutPageHero data={data} />,
  textsection: (data: any) => <TextSection data={data} />,
  "page.ancillary50": (data: any) => <ImageInfo data={data} />,
  "page.services": (data: any) => <Services data={data} />,
  "page.image": (data: any) => <ImageSection data={data} />,
  "page.benifits": (data: any) => <JoinPeaceKeepersBenifit data={data} />,
  "page.imageInfo": (data: any) => <ImageInfo data={data} revert={true} />,
} as const;

export default AllComponents;
