import { Fragment, ReactNode } from "react";
import HappeningNow from "@/components/Home/HappeningNow";
import WinnersCircle from "@/components/Home/WinnersCircle";
import Explore from "@/components/Home/Explore";
import JoinPeaceKeeper from "@/components/Home/JoinPeaceKeeper";
import LiveContest from "@/components/Home/LiveContest";
import Hero from "@/components/Home/Hero";
import { getBaseUrl } from "@/lib/utils";

const HomePageComponents: { [key: string]: (data: any) => ReactNode } = {
  hero: (data: any) => <Hero data={data} />,
  "page.joinpeacekeeper": (data: any) => <JoinPeaceKeeper data={data} />,
  "page.livecontest": (data: any) => <LiveContest data={data} />,
  "page.explore": (data: any) => <Explore data={data} baseURL={getBaseUrl()} />,
  "page.happeningnow": (data: any) => <HappeningNow data={data} />,
  "page.winnersCircle": (data: any) => <WinnersCircle data={data} />,
} as const;

type HomePageProps = {
  data: any[];
};

export default function HomePage({ data }: HomePageProps) {
  if (!data?.length) return null;

  let DataList: any = [] as ReactNode[];

  DataList = data?.map((section: any) => {
    if (HomePageComponents[section._type]) {
      return (
        <Fragment key={section._key}>
          {HomePageComponents[section._type](section)}
        </Fragment>
      );
    }
  });

  return <>{...DataList}</>;
}
