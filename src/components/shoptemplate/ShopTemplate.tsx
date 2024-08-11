import React from "react";
import MercesTemplate from "./MercesTemplate";
import ContestTemplate from "./ContestTemplate";

type Props = {
  data: any;
  title: string;
};

const ShopTemplate = ({ data, title }: Props) => {
  const shoptemplatesections = data.shoptemplatesections;

  switch (shoptemplatesections.shoptype.replace(/[^a-zA-Z0-9]/g, "")) {
    case "contest":
      return (
        <ContestTemplate
          title={title}
          sections={shoptemplatesections.sections}
        />
      );
    case "merces":
      return (
        <MercesTemplate
          title={title}
          sections={shoptemplatesections.sections}
        />
      );
    default:
      return <div>Not Found</div>;
  }
};

export default ShopTemplate;
