"use client";

import { ReactNode, useEffect, useState } from "react";
import HappeningNow from "@/components/Home/HappeningNow";
import WinnersCircle from "@/components/Home/WinnersCircle";
import Explore from "@/components/Home/Explore";
import JoinPeaceKeeper from "@/components/Home/JoinPeaceKeeper";
import LiveContest from "@/components/Home/LiveContest";

import { client } from "../../../sanity/lib/client";

import {
  useConsent,
  ConsentBanner,
  ConsentOptions,
  ConsentProvider,
} from "react-hook-consent";
import "react-hook-consent/dist/styles/style.css";
import Hero from "@/components/Home/Hero";

const HomePageComponents: { [key: string]: (data: any) => ReactNode } = {
  hero: (data: any) => <Hero data={data} />,
  "page.joinpeacekeeper": (data: any) => <JoinPeaceKeeper data={data} />,
  "page.livecontest": (data: any) => <LiveContest data={data} />,
  "page.explore": (data: any) => <Explore data={data} />,
  "page.happeningnow": (data: any) => <HappeningNow data={data} />,
  "page.winnersCircle": (data: any) => <WinnersCircle data={data} />,
} as const;

type HomePageProps = {
  data: any[];
};

export default function HomePage({ data }: HomePageProps) {
  const [sections, setSections] = useState<any[]>(data);
  const [mounted, setMounted] = useState(false);
  const { toggleBanner, hasConsent } = useConsent();
  const [consent, setConsent] = useState(true);
  {
    consent ? () => toggleBanner() : setConsent(false);
  }

  let DateList: any = [] as ReactNode[];

  const consentOptions: ConsentOptions = {
    services: [
      {
        id: "myid",
        name: "Essential cookies",
        description:
          "Essential cookies are those strictly necessary to operate our site or allow you to access the content and services requested. This type of cookie cannot be disabled, as this would compromise the functioning of our site or the use of its contents and services. If you do not wish to install this type of cookie on your device, you are advised not to use our site",
        scripts: [],
        mandatory: true,
      },
      {
        id: "myid2",
        name: "Functional cookies",
        description:
          "Functional cookies are used to enable specific site features as well as a number of options (e.g. preferred language, products selected for purchase) in order to improve the service provided. By disabling this type of cookie, certain services or functions of our site may not be available or may not function properly, and you may be forced to modify or manually enter certain information or preferences each time you visit our site.",
        scripts: [],
      },
      {
        id: "myid3",
        name: "Analytical cookies",
        description:
          "Analytical cookies, including third party analytical cookies, help us understand how you navigate our site. These cookies do not contain any information about your identity or any personal data. Information is processed in an aggregated and anonymous way.",
        scripts: [],
      },
      {
        id: "myid4",
        name: "Advertising cookies",
        description:
          "Advertising (or “Profiling”) cookies, including those from third parties, are cookies aimed at creating user profiles and are used to display advertisements based on your preferences when browsing the web.",
        scripts: [],
      },
    ],
    theme: "light",
  };

  DateList = sections?.map((section: any) => {
    if (HomePageComponents[section._type]) {
      return HomePageComponents[section._type](section);
    }
  });

  useEffect(() => {
    const query = `*[_type == "page" && title == "Homepage"]`;
    const subscription = client.listen(query).subscribe((update) => {
      if (update.result?.homepagetemplatesections?.sections) {
        setSections(update.result?.homepagetemplatesections.sections);
      }
    });

    return () => subscription.unsubscribe();
  }, [setSections, client]);

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted) return null;

  return (
    <ConsentProvider options={consentOptions}>
      {...DateList}
      <ConsentBanner
        settings={{
          hidden: false,
          label: "Decide",
          modal: { title: "Cookies" },
        }}
        decline={{ label: "No", hidden: true }}
        approve={{ label: "That's ok" }}
      >
        <>
          <div className="flex text-2xl lg:3xl">
            Cookies improve your experience
          </div>
          We use cookies and similar technologies to give you a personalised
          shopping experience, personalised advertising and to analyse our web
          traffic. Click ‘That's ok' if you'd like to allow all cookies.
          Alternatively, you can choose which types of cookies you'd like to
          accept or disable by clicking 'Let me choose' below. For more
          information, please see our
        </>
      </ConsentBanner>
    </ConsentProvider>
  );
}
