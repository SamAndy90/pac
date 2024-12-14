import { Fragment, ReactNode } from "react";
import { FAQs } from "./FAQs";

const FAQsPageComponents: {
  [key: string]: (data: any) => ReactNode;
} = {
  faqs: (data: any) => <FAQs data={data} />,
} as const;

type FAQsPageProps = {
  data: [any];
};

export default function FAQsPage({ data }: FAQsPageProps) {
  if (!data?.length) return null;

  let Sections: any = [] as ReactNode[];

  Sections = data?.map((section: any) => {
    if (FAQsPageComponents[section._type]) {
      return (
        <Fragment key={section._key}>
          {FAQsPageComponents[section._type](section)}
        </Fragment>
      );
    }
  });

  return <>{...Sections}</>;
}
