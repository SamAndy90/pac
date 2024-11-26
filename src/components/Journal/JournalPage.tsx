"use client";

import { ReactNode, useEffect, useState } from "react";
import { client } from "../../../sanity/lib/client";
import { Welcome } from "./Welcome";
import { HotNews } from "./HotNews";
import TextSection from "../About/TextSection";
import News from "./News";
import ImageSection from "../About/ImageSection";

const JournalPageComponents: { [key: string]: (data: any) => ReactNode } = {
  welcome: (data: any) => <Welcome data={data} />,
  hotnews: (data: any) => <HotNews data={data} />,
  textsection: (data: any) => (
    <TextSection data={data} className={"bg-pka_background"} />
  ),
  news: (data: any) => <News data={data} />,
  "page.image": (data: any) => <ImageSection data={data} />,
} as const;

type PrivacyPageProps = {
  data: [any];
  news: any;
  title?: string;
};

export default function JournalPage({
  data,
  news,
  title = "Journal",
}: PrivacyPageProps) {
  const [sections, setSections] = useState(data);

  let Sections: any = [] as ReactNode[];

  Sections = sections?.map((section: any) => {
    if (JournalPageComponents[section._type]) {
      return JournalPageComponents[section._type](
        section._type === "news" || section._type === "hotnews" ? news : section
      );
    }
  });

  useEffect(() => {
    const query = `*[_type == "page" && title == "${title}"]`;
    const subscription = client.listen(query).subscribe((update) => {
      if (update.result?.journaltemplatesections?.sections) {
        setSections(update.result?.journaltemplatesections.sections);
      }
    });
    return () => subscription.unsubscribe();
  }, [setSections, client]);

  return <>{...Sections}</>;
}
