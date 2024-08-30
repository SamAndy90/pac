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

  if (data.length > 0 && !data[0])
    return (
      <div className="flex text-pka_blue justify-center py-5 font-bold">
        No Footer Found, If you want to add or create footer then go to CMS and
        content on Footer
      </div>
    );

  return <FooterContent data={data[0]} />;
}
