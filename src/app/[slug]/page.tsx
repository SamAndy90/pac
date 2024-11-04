import CommingSoon from "@/components/CommingSoon";
import { Metadata } from "next";
import Ancillary from "@/components/templates/Ancillary";
import ShopTemplate from "@/components/shoptemplate/ShopTemplate";
import { getData } from "@/lib/data-fetchers/sanity";
import { ImgUrl } from "@/lib/utils";

type MetadataProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(
  props: MetadataProps
): Promise<Metadata> {
  const data: any = await getData(`*[_type == "page"]`);

  const slugData = data.find(
    (item: any) => item.slug?.current === props.params.slug
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

export default async function Page(props: MetadataProps) {
  const data = await getData(`*[_type == "page"]`);

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

    return <CommingSoon title={title} image={ImgUrl(image)} />;
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
      return (
        <div
          className={
            "font-thunder tracking-wider text-pka_blue uppercase text-3xl h-screen flex items-center justify-center"
          }
        >
          <p>Content not found</p>
        </div>
      );
  }
}
