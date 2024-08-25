import { ReactNode } from "react";
import CardsSection from "./ExploreSection";
import WinnersCircle from "./WinnersCircle";
import HeaderSection from "./HeroSection";
import HappeningNow from "./HappeningNow";
import AHeader from "./ancillary/AHeader";
import TextSection from "./ancillary/TextSection";
import ImageDisplaySection from "./ancillary/ImageDisplaySection";
import JoinPeaceKeepersBenifit from "./ancillary/JoinPeaceKeepersBenifit";
import JoinPeaceKeeper from "./JoinPeaceKeeper";
import ImageInfo from "./ImageInfo";
import ImageSection from "./ImageSection";
import Services from "./Services";

const AllComponents: { [key: string]: (data: any) => ReactNode } = {
  joinpeacekeeper: (data: any) => <JoinPeaceKeeper data={data} />,
  Explore: (data: any) => <CardsSection data={data} />,
  winnersCircle: (data: any) => <WinnersCircle data={data} />,
  slider: (data: any) => <HeaderSection data={data} />,
  HappeningNow: (data: any) => <HappeningNow data={data} />,
  "page.ancillaryheader": (data: any) => <AHeader data={data} />,
  "page.textsection": (data: any) => <TextSection data={data} />,
  "page.ancillaryimage": (data: any) => <ImageDisplaySection data={data} />,
  "page.ancillary50": (data: any) => <ImageInfo data={data} />,
  "page.benifits": (data: any) => <JoinPeaceKeepersBenifit data={data} />,
  "page.imageInfo": (data: any) => <ImageInfo data={data} revert={true} />,
  "page.image": (data: any) => <ImageSection data={data} />,
  "page.services": (data: any) => <Services data={data} />,
} as const;

export default AllComponents;
