"use client";

import { useEffect, useState } from "react";
import { client } from "../../../sanity/lib/client";
import { Welcome } from "./Welcome";
import { HotNews } from "./HotNews";
import TextSection from "../About/TextSection";
import News from "./News";
import ImageSection from "../About/ImageSection";

type PrivacyPageProps = {
  data: [any];
};

export default function JournalPage({ data }: PrivacyPageProps) {
  const [sections, setSections] = useState(data);

  useEffect(() => {
    const query = `*[_type == "page" && title == "Journal"]`;
    const subscription = client.listen(query).subscribe((update) => {
      if (update.result?.journaltemplatesections?.sections) {
        setSections(update.result?.journaltemplatesections.sections);
      }
    });
    return () => subscription.unsubscribe();
  }, [setSections, client]);

  const welcome = sections.find((data) => data._type === "welcome");
  const newslist = sections.find((data) => data._type === "newslist");
  const textsection = sections.find((data) => data._type === "textsection");
  const image = sections.find((data) => data._type === "page.image");

  return (
    <>
      <Welcome data={welcome} />
      <HotNews data={newslist} />
      <TextSection data={textsection} className={"bg-pka_background"} />
      <News data={newslist} />
      <ImageSection data={image} />
    </>
  );
}
