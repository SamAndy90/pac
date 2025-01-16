import CommingSoon from "@/components/CommingSoon";
import { Metadata } from "next";
import { getSlugData } from "@/lib/data-fetchers/sanity";
import {
  ContactTemplate,
  FAQSTemplate,
  HomeTemplate,
  JournalTemplate,
  PrivacyTemplate,
  ShopTemplate,
  AncillaryTemplate,
} from "@/components/Templates";
import { Suspense } from "react";
import { Loader } from "@/common";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slugData: any = await getSlugData(
    `*[_type == "page" && slug.current == "${params.slug}"][0]`
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

export default async function Page({ params }: Props) {
  const data = await getSlugData(
    `*[_type == "page" && slug.current == "${params.slug}"][0]`
  );

  if (
    data?.ancillarysections?.sections?.length === 1 &&
    data?.ancillarysections?.sections[0]._type === "page.comingsoon"
  ) {
    const section = data?.ancillarysections?.sections[0];
    const title = section?.title;
    const image = section?.portrait;

    return <CommingSoon title={title} image={image} />;
  }

  switch (data?.template) {
    case "ancillary":
      return <AncillaryTemplate data={data} />;
    case "homepageTemplate":
      return <HomeTemplate data={data} />;
    case "shoptemplate":
      return (
        <Suspense fallback={<Loader />}>
          <ShopTemplate data={data} />
        </Suspense>
      );
    case "journaltemplate":
      return (
        <Suspense fallback={<Loader />}>
          <JournalTemplate data={data} />
        </Suspense>
      );
    case "contacttemplate":
      return <ContactTemplate data={data} />;
    case "faqstemplate":
      return <FAQSTemplate data={data} />;
    case "privacytemplate":
      return <PrivacyTemplate data={data} />;
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
