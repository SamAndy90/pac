import React from "react";
import SmallBanner from "./SmallBanner";
import { ImgUrl } from "@/lib/utils";
import LargeBanner from "./LargeBanner";

type Props = {
  data: any;
  variant: "small" | "large";
};

const BannerComponent = ({ data, variant = "small" }: Props) => {
  switch (variant) {
    case "small":
      return (
        <SmallBanner
          title={data.title}
          imageUrl={ImgUrl(data.portrait.asset._ref)}
        />
      );

    case "large":
      return (
        <LargeBanner
          title={data.title}
          imageUrl={ImgUrl(data.portrait.asset._ref)}
        />
      );

    default:
      return (
        <SmallBanner
          title={data.title}
          imageUrl={ImgUrl(data.portrait.asset._ref)}
        />
      );
  }
};

export default BannerComponent;
