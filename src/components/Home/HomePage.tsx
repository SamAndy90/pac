import { Fragment, ReactNode } from "react";
import HappeningNow from "@/components/Home/HappeningNow";
import HowToGetEntered from "@/components/Home/HowToGetEntered";
import WinnersCircle from "@/components/Home/WinnersCircle";
import Explore from "@/components/Home/Explore";
import JoinPeaceKeeper from "@/components/Home/JoinPeaceKeeper";
import LiveContest from "@/components/Home/LiveContest";
import Hero from "@/components/Home/Hero";
import { getBaseUrl } from "@/lib/utils";
import { getData } from "@/lib/data-fetchers/sanity";
import { ContestType } from "@/types";

const HomePageComponents: {
  [key: string]: (data: any, events?: any) => ReactNode;
} = {
  hero: (data: any) => <Hero data={data} />,
  "page.joinpeacekeeper": (data: any) => <JoinPeaceKeeper data={data} />,
  "page.livecontest": (data: any) => <LiveContest data={data} />,
  "page.explore": (data: any) => <Explore data={data} baseURL={getBaseUrl()} />,
  howToGetEntered: (data: any) => <HowToGetEntered data={data} />,
  "page.happeningnow": (data: any, events?: ContestType[]) => (
    <HappeningNow data={data} events={events} />
  ),
  "page.winnersCircle": (data: any) => <WinnersCircle data={data} />,
} as const;

type HomePageProps = {
  data: any[];
};

export default async function HomePage({ data }: HomePageProps) {
  if (!data?.length) return null;
  const events = await getData(`*[_type == "contests"]`);

  let DataList: any = [] as ReactNode[];

  DataList = data?.map((section: any) => {
    if (HomePageComponents[section._type]) {
      if (section._type === "page.happeningnow") {
        return (
          <Fragment key={section._key}>
            {HomePageComponents[section._type](
              section,
              events?.[0]?.contestsList
            )}
          </Fragment>
        );
      }
      return (
        <Fragment key={section._key}>
          {HomePageComponents[section._type](section)}
        </Fragment>
      );
    }
  });

  return <>{...DataList}</>;
}
