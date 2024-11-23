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

  return <HeaderContent data={data[0]} />;
}
