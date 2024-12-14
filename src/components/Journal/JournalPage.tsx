import { Welcome } from "./Welcome";
import { HotNews } from "./HotNews";
import TextSection from "../About/TextSection";
import News from "./News";
import ImageSection from "../About/ImageSection";
import { Fragment, ReactNode } from "react";

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
};

export default function JournalPage({ data, news }: PrivacyPageProps) {
  if (!data?.length) return null;

  let Sections: any = [] as ReactNode[];

  Sections = data?.map((section: any) => {
    if (JournalPageComponents[section._type]) {
      return (
        <Fragment key={section._key}>
          {JournalPageComponents[section._type](
            section._type === "news" || section._type === "hotnews"
              ? news
              : section
          )}
        </Fragment>
      );
    }
  });

  return <>{...Sections}</>;
}
