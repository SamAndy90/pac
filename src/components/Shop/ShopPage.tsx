import { Fragment, ReactNode } from "react";
import BannerComponent from "@/components/Shop/BannerComponent";
import JoinPeaceKeepersBenifit from "@/components/About/JoinPeaceKeepersBenifit";
import { Products, ProductType } from "@/components/Shop/Products";

const ShopPageComponents: {
  [key: string]: (
    data: any,
    shopifyProducts?: { node: ProductType }[]
  ) => ReactNode;
} = {
  "page.shopBanner": (data: any) => <BannerComponent data={data} />,
  "page.benifits": (data: any) => <JoinPeaceKeepersBenifit data={data} />,
  products: (data: any, shopifyProducts: any) => (
    <Products data={data} products={shopifyProducts} />
  ),
} as const;

type ShopPageProps = {
  data: any[];
  shopifyProducts: { node: ProductType }[];
};

export default function ShopPage({ data, shopifyProducts }: ShopPageProps) {
  if (!data?.length) return null;

  let Sections: any = [] as ReactNode[];

  Sections = data?.map((section: any) => {
    if (ShopPageComponents[section._type]) {
      if (section._type === "products") {
        return (
          <Fragment key={section._key}>
            {ShopPageComponents[section._type](section, shopifyProducts)}
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
