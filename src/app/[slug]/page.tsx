import React from "react";
import { client } from "../../../sanity/lib/client";
import CommingSoon from "@/components/CommingSoon";
import { urlFor } from "@/lib/utils";
import { Metadata } from "next";
import { SanityDocument } from "next-sanity";
import { sanityFetch } from "../../../sanity/lib/fetch";
import Ancillary from "@/components/templates/Ancillary";
import ShopTemplate from "@/components/shoptemplate/ShopTemplate";
type Props = {
  params: {
    slug: string;
  };
};

async function getData() {
  const fetchData = await sanityFetch<SanityDocument[]>({
    query: `*[_type == "page"]`,
  });
  return fetchData;
}
export async function generateMetadata(props: Props): Promise<Metadata> {
  const data: any = await getData();

  const slugData = data.find(
    (item: any) => item.slug.current === props.params.slug
  );

  if (slugData?.schemaMarkup) {
    const headerValue = slugData?.schemaMarkup[0];
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

export default async function page(props: Props) {
  await getData();
  const data = await getData();

  const slugData = data.find(
    (item: any) => item.slug?.current === props.params.slug
  );

  if (
    slugData?.ancillarysections?.sections?.length === 1 &&
    slugData?.ancillarysections?.sections[0]._type === "page.comingsoon"
  ) {
    const section = slugData?.ancillarysections?.sections[0];
    const title = section?.title;
    const image = section?.portrait?.asset?._ref;

    return <CommingSoon title={title} image={urlFor(image).url()} />;
  }

  switch (slugData?.template) {
    case "ancillary":
      if (slugData.ancillarysections.sections.length === 0) {
        return null;
      }
      return (
        <Ancillary
          title={slugData.title}
          sections={slugData.ancillarysections.sections}
        />
      );
    case "shoptemplate":
      return <ShopTemplate title={slugData.title} data={slugData} />;
    default:
      return <div>Content not found</div>;
  }
}
