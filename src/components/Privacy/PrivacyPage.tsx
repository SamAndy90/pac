"use client";

import { ReactNode, useEffect, useState } from "react";
import { client } from "../../../sanity/lib/client";
import { Privacy } from "./Privacy";

const PrivacyPageComponents: {
  [key: string]: (data: any) => ReactNode;
} = {
  privacy: (data: any) => <Privacy data={data} />,
} as const;

type PrivacyPageProps = {
  data: [any];
  title?: string;
};

export default function PrivacyPage({
  data,
  title = "Privacy",
}: PrivacyPageProps) {
  const [sections, setSections] = useState(data);
  const [pageTitle] = useState(title);

  let Sections: any = [] as ReactNode[];

  Sections = sections?.map((section: any) => {
    if (PrivacyPageComponents[section._type]) {
      return PrivacyPageComponents[section._type](section);
    }
  });

  useEffect(() => {
    const query = `*[_type == "page" && title == "${pageTitle}"]`;
    const subscription = client.listen(query).subscribe((update) => {
      if (update.result?.privacytemplatesections?.sections) {
        setSections(update.result?.privacytemplatesections.sections);
      }
    });
    return () => subscription.unsubscribe();
  }, [setSections, client]);

  return <>{...Sections}</>;
}
