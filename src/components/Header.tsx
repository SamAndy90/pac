import { SanityLink, Portrait } from "@/types";
import HeaderContent from "./HeaderContent";
import { getData } from "@/lib/data-fetchers/sanity";

export type HeaderContentData = {
  logo: Portrait;
  leftlinks: SanityLink[];
  rightlinks: SanityLink[];
  burgerlinks: SanityLink[];
};

export async function Header() {
  const data = await getData<HeaderContentData>(`*[_type == 'header']`);

  return <HeaderContent data={data[0]} />;
}
