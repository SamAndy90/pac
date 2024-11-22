import CommingSoon from "@/components/CommingSoon";
import { Metadata } from "next";
import { getData } from "@/lib/data-fetchers/sanity";
import {
  ContactTemplate,
  FAQSTemplate,
  HomeTemplate,
  JournalTemplate,
  PrivacyTemplate,
  ShopTemplate,
  AncillaryTemplate,
} from "@/components/Templates";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
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

export default async function Page(props: Props) {
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
    const image = section?.portrait;

    return <CommingSoon title={title} image={image} />;
  }

  switch (slugData?.template) {
    case "ancillary":
      return <AncillaryTemplate title={slugData.title} data={slugData} />;
    case "homepageTemplate":
      return <HomeTemplate data={slugData} title={slugData.title} />;
    case "shoptemplate":
      return <ShopTemplate data={slugData} title={slugData.title} />;
    case "journaltemplate":
      return <JournalTemplate data={slugData} title={slugData.title} />;
    case "contacttemplate":
      return <ContactTemplate data={slugData} />;
    case "faqstemplate":
      return <FAQSTemplate data={slugData} title={slugData.title} />;
    case "privacytemplate":
      return <PrivacyTemplate data={slugData} title={slugData.title} />;

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
