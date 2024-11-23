import { SanityDocument } from "next-sanity";

import { sanityFetch } from "../../sanity/lib/fetch";
import FooterContent from "./FooterContent";
import { Portrait, SanityLink } from "@/types";

export type FooterContentData = {
  title: string;
  copyright: string;
  logo: Portrait;
  links: SanityLink[];
};

async function getData() {
  return await sanityFetch<SanityDocument<FooterContentData>[]>({
    query: `*[_type == 'footer']`,
  });
}

export default async function Footer() {
  const data = await getData();

  return <FooterContent data={data[0]} />;
}
