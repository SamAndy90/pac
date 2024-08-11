import { ReactNode } from "react";
import Card50 from "./JoinPeaceKeeper";
import CardsSection from "./ExploreSection";
import WinnersCircle from "./WinnersCircle";
import HeaderSection from "./HeroSection";
import HappeningNow from "./HappeningNow";
import AHeader from "./ancillary/AHeader";
import TextSection from "./ancillary/TextSection";
import ImageDisplaySection from "./ancillary/ImageDisplaySection";
import JoinPeaceKeepersBenifit from "./ancillary/JoinPeaceKeepersBenifit";

const AllComponents: { [key: string]: (data: any) => ReactNode } = {
  joinpeacekeeper: (data: any) => <Card50 data={data} />,
  Explore: (data: any) => <CardsSection data={data} />,
  winnersCircle: (data: any) => <WinnersCircle data={data} />,
  slider: (data: any) => <HeaderSection data={data} />,
  HappeningNow: (data: any) => <HappeningNow data={data} />,
  "page.ancillaryheader": (data: any) => <AHeader data={data} />,
  "page.textsection": (data: any) => <TextSection data={data} />,
  "page.ancillaryimage": (data: any) => <ImageDisplaySection data={data} />,
  "page.ancillary50": (data: any) => <Card50 data={data} />,
  "page.benifits": (data: any) => <JoinPeaceKeepersBenifit data={data} />,
} as const;

export default AllComponents;
