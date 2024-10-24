"use client";

import { ReactNode, useEffect, useState } from "react";
import BannerComponent from "../product/BannerComponent";
import { client } from "../../../sanity/lib/client";
import JoinPeaceKeepersBenifit from "@/components/About/JoinPeaceKeepersBenifit";
import { Products } from "./Products";

const ShopPageComponents: {
  [key: string]: (data: any) => ReactNode;
} = {
  "page.shopBanner": (data: any) => <BannerComponent data={data} />,
  "page.benifits": (data: any) => <JoinPeaceKeepersBenifit data={data} />,
  products: (data: any) => <Products data={data} />,
} as const;

type ShopPageProps = {
  data: [any];
  shopifyProducts: [any];
};

export default function ShopPage({ data, shopifyProducts }: ShopPageProps) {
  const [sections, setSections] = useState(data);

  let Sections: any = [] as ReactNode[];

  Sections = sections?.map((section: any) => {
    if (ShopPageComponents[section._type]) {
      if (section._type === "products") {
        return ShopPageComponents[section._type](shopifyProducts);
      }
      return ShopPageComponents[section._type](section);
    }
  });

  useEffect(() => {
    const query = `*[_type == "page" && title == "Shop"]`;
    const subscription = client.listen(query).subscribe((update) => {
      if (update.result?.shoptemplatesections?.sections) {
        setSections(update.result?.shoptemplatesections.sections);
      }
    });
    return () => subscription.unsubscribe();
  }, [setSections, client]);

  return <>{...Sections}</>;
}
