"use client";

import JoinPeaceKeepersBenifit from "@/components/ancillary/JoinPeaceKeepersBenifit";
import BannerComponent from "@/components/banner/BannerComponent";
import ProductListing from "@/components/product/ProductListing";
import React, { useEffect, useState } from "react";
import { client } from "../../../../sanity/lib/client";

type Props = {
  sections: any;
  title: string;
};

const MercesTemplateSubComp = ({ title, sections }: Props) => {
  const [sectionsData, setSectionsData] = useState(sections);

  useEffect(() => {
    const query = `*[_type == "page" && title == "${title.replace(
      /[^a-zA-Z0-9]/g,
      ""
    )}"]`;

    const subscription = client.listen(query).subscribe((update) => {
      if (update.result) {
        const sections = update.result.shoptemplatesections.sections;

        setSectionsData(sections);
      }
    });

    return () => subscription.unsubscribe();
  }, [setSectionsData, client, title]);

  const banner = sectionsData.find(
    (section: any) => section._type === "page.shopBanner"
  );

  const benifits = sectionsData.find(
    (section: any) => section._type === "page.benifits"
  );

  return (
    <div className="max-w-[1400px] w-full mx-auto lg:mt-40">
      <div className="max-w-[1440px] w-full mx-auto">
        {banner && (
          <BannerComponent
            variant={banner.bannerStyle.replace(/[^a-zA-Z0-9]/g, "")}
            data={banner}
          />
        )}
      </div>
      <ProductListing />
      {benifits && <JoinPeaceKeepersBenifit data={benifits} />}
    </div>
  );
};

export default MercesTemplateSubComp;
