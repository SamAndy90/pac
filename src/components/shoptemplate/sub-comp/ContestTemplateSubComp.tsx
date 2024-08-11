"use client";

import React, { useEffect, useState } from "react";
import { client } from "../../../../sanity/lib/client";
import PLPContestCard2 from "@/components/cards/PLPContestCard2";
import PLPContestCard from "@/components/cards/PLPContestCard";
import EventCard from "@/components/common/EventCard";
import JoinPeaceKeepersBenifit from "@/components/ancillary/JoinPeaceKeepersBenifit";
import BannerComponent from "../../banner/BannerComponent";
import Slider from "react-slick";
import settings from "../../../app/utils/HappeningNowSettings";

type Props = {
  title: string;
  happeningnowSections: any;
  sections: any;
};

const ContestTemplateSubComp = ({
  title,
  happeningnowSections,
  sections,
}: Props) => {
  const [happeningnowDataSections, setHappeningnowDataSections] =
    useState(happeningnowSections);
  const [sectionData, setSectionData] = useState(sections);

  useEffect(() => {
    const query = `*[_type == "page" && title == "Home Page"]`;

    const subscription = client.listen(query).subscribe((update) => {
      if (update.result) {
        const sections = update.result.homepagetemplatesections.sections;

        const happeningNowSection = sections.find((sectionData: any) => {
          return sectionData._type === "page.happeningnow";
        });

        setHappeningnowDataSections(happeningNowSection.cards);
      }
    });

    return () => subscription.unsubscribe();
  }, [setHappeningnowDataSections, client]);

  useEffect(() => {
    const query = `*[_type == "page" && title == "${title.replace(
      /[^a-zA-Z0-9 ]/g,
      ""
    )}"]`;

    const subscription = client.listen(query).subscribe((update) => {
      if (update.result) {
        const sections = update.result.shoptemplatesections.sections;

        setSectionData(sections);
      }
    });

    return () => subscription.unsubscribe();
  }, [setSectionData, client, title]);

  const PlpContestCards = happeningnowDataSections.filter((cardData: any) => {
    if (
      cardData.whereToShow.replace(/[^a-zA-Z0-9]/g, "") === "plpcontest" &&
      cardData.status.replace(/[^a-zA-Z0-9]/g, "") === "active"
    ) {
      return true;
    }
    return false;
  });

  const HomeCards = happeningnowDataSections.filter((cardData: any) => {
    if (
      cardData.whereToShow.replace(/[^a-zA-Z0-9]/g, "") === "homepage" &&
      cardData.status.replace(/[^a-zA-Z0-9]/g, "") === "active"
    ) {
      return true;
    }
    return false;
  });

  const banner = sectionData.find(
    (section: any) => section._type === "page.shopBanner"
  );

  const benifits = sectionData.find(
    (section: any) => section._type === "page.benifits"
  );

  return (
    <div className="max-w-[1400px] w-full mx-auto lg:mt-40">
      <div className="max-w-[1400px] w-full mx-auto">
        <div className="mx-8 lg:mx-16 2xl:mx-0">
          {banner && (
            <BannerComponent
              variant={banner.bannerStyle.replace(/[^a-zA-Z0-9]/g, "")}
              data={banner}
            />
          )}
        </div>
      </div>
      <div className="w-full">
        {PlpContestCards?.map((data: any) => {
          if (
            data.contestStyle.replace(/[^a-zA-Z0-9]/g, "") === "conteststyle2"
          ) {
            return <PLPContestCard2 data={data} />;
          }
          return <PLPContestCard data={data} />;
        })}
      </div>
      <div className="hidden overflow-hidden lg:flex flex-col md:flex-col lg:flex-row  xl:flex-row  gap-5 lg:relative justify-center">
        {HomeCards.map((card: any) => {
          return (
            <EventCard
              title={card.Title}
              description={card.Intro}
              backgroundImage={card.portrait?.asset._ref.replace(
                /[^a-zA-Z0-9-]/g,
                ""
              )}
              countdownBgColor={card.Color.value}
              countdownTextColor="text-black"
              exploreButtonText="Explore"
              timer={card.time}
              starttime={card.starttime}
              style={card.homepageStyle.replace(/[^a-zA-Z0-9]/g, "")}
            />
          );
        })}
      </div>

      <div className="w-full mx-auto flex ">
        <div
          className="lg:hidden overflow-hidden slider-container containerClass  "
          id="plpContest"
        >
          <Slider {...settings}>
            {HomeCards.map((card: any, index: number) => (
              <div className="mb-8">
                <EventCard
                  title={card.Title}
                  description={card.Intro}
                  backgroundImage={card.portrait?.asset._ref.replace(
                    /[^a-zA-Z0-9-]/g,
                    ""
                  )}
                  countdownBgColor={card.Color.value}
                  countdownTextColor="text-black"
                  exploreButtonText="Explore"
                  timer={card.time}
                  style={card?.homepageStyle?.replace(/[^a-zA-Z0-9]/g, "")}
                  starttime={card.starttime}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {benifits && <JoinPeaceKeepersBenifit data={benifits} />}
    </div>
  );
};

export default ContestTemplateSubComp;
