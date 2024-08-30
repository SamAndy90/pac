import { SanityDocument } from "next-sanity";

import { sanityFetch } from "../../sanity/lib/fetch";
import { SanityLink, Portrait } from "@/types";
import HeaderContent from "./HeaderContent";

export type HeaderContentData = {
  logo: Portrait;
  leftlinks: SanityLink[];
  rightlinks: SanityLink[];
  burgerlinks: SanityLink[];
};

async function getData() {
  return await sanityFetch<SanityDocument<HeaderContentData>[]>({
    query: `*[_type == 'header']`,
  });
}

export default async function Footer() {
  const data = await getData();

  if (data.length > 0 && !data[0])
    return (
      <div className="flex text-pka_blue justify-center py-5 font-bold">
        No Header Found, If you want to add or create header then go to CMS and
        content on Header
      </div>
    );

  return <HeaderContent data={data[0]} />;
}
