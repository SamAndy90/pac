import { Fragment, ReactNode } from "react";
import BannerComponent from "@/components/Shop/BannerComponent";
import JoinPeaceKeepersBenifit from "@/components/About/JoinPeaceKeepersBenifit";
import { Products } from "@/components/Shop/Products";

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
  if (!data?.length) return null;

  let Sections: any = [] as ReactNode[];

  Sections = data?.map((section: any) => {
    if (ShopPageComponents[section._type]) {
      if (section._type === "products") {
        return (
          <Fragment key={section._key}>
            {ShopPageComponents[section._type](shopifyProducts)}
          </Fragment>
        );
      }
      return (
        <Fragment key={section._key}>
          {ShopPageComponents[section._type](section)}
        </Fragment>
      );
    }
  });

  return <>{...Sections}</>;
}
