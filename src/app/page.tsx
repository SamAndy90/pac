import HomePage from "@/components/Home/HomePage";
import { Metadata } from "next";
import { getData } from "@/lib/data-fetchers/sanity";

const query = `*[_type == "page" && title == "Homepage"]`;

export async function generateMetadata(): Promise<Metadata> {
  const data: any = await getData(query);

  if (
    data &&
    data.length > 0 &&
    data[0].schemaMarkup &&
    data[0].schemaMarkup.length > 0
  ) {
    const headerValue = data[0]?.schemaMarkup[0];
    return {
      title: headerValue.name,
      description: headerValue.description,
    };
  }
  return {
    title: "Peace Keepers",
    description: "Coming Soon",
  };
}

export default async function Home() {
  let data = await getData(query);

  if (
    !data ||
    data.length === 0 ||
    !data[0]?.homepagetemplatesections?.sections
  ) {
    data = await getData(query);
  }

  const sections = data[0]?.homepagetemplatesections?.sections;

  return <HomePage data={sections} />;
}
