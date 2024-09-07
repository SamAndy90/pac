"use client";

import { ReactNode, useEffect, useState } from "react";
import { client } from "../../../sanity/lib/client";
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
  const [sections, setSections] = useState(data);

  let Sections: any = [] as ReactNode[];

  Sections = sections?.map((section: any) => {
    if (FAQsPageComponents[section._type]) {
      return FAQsPageComponents[section._type](section);
    }
  });

  useEffect(() => {
    const query = `*[_type == "page" && title == "FAQs"]`;
    const subscription = client.listen(query).subscribe((update) => {
      if (update.result?.faqstemplatesections?.sections) {
        setSections(update.result?.faqstemplatesections.sections);
      }
    });
    return () => subscription.unsubscribe();
  }, [setSections, client]);

  return <>{...Sections}</>;
}
