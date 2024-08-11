"use client";

import { ReactNode, useEffect, useState } from "react";
import { client } from "../../../sanity/lib/client";
import AllComponents from "../AllComponents";

type Props = {
  sections: any;
  pageTitle: string;
};

const AncillarySubscription = ({ sections, pageTitle }: Props) => {
  const [sectionData, setSectionsData] = useState(sections);
  const [mounted, setMounted] = useState(false);

  const DataList: ReactNode[] =
    sectionData.map((section: any) => {
      if (AllComponents[section._type]) {
        return AllComponents[section._type](section);
      }
    }) || [];

  useEffect(() => {
    // remove everything except the characters in the string and the spaces and numbers

    const titleData = pageTitle.replace(/[^a-zA-Z0-9 &]/g, "");
    const qry = `*[_type == "page" && title == "${titleData}"]`;

    const subscription = client.listen(qry).subscribe((update) => {
      if (update.result?.ancillarysections.sections) {
        setSectionsData(update.result?.ancillarysections.sections);
      }
    });

    return () => subscription.unsubscribe();
  }, [setSectionsData, client, pageTitle]);

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex w-full flex-col justify-center">{...DataList}</div>
  );
};

export default AncillarySubscription;
