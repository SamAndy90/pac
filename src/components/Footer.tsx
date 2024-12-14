import FooterContent from "./FooterContent";
import { Portrait, SanityLink } from "@/types";
import { getData } from "@/lib/data-fetchers/sanity";

export type FooterContentData = {
  title: string;
  copyright: string;
  logo: Portrait;
  links: SanityLink[];
};

export async function Footer() {
  const data = await getData<FooterContentData>(`*[_type == 'footer']`);

  return <FooterContent data={data[0]} />;
}
