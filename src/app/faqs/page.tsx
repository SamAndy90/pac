import { SanityDocument } from "next-sanity";
import { sanityFetch } from "../../../sanity/lib/fetch";
import FAQsPage from "@/components/FAQS/FAQsPage";

async function getData() {
  return await sanityFetch<SanityDocument[]>({
    query: `*[_type == "page" && title == "FAQs"]`,
  });
}

export default async function Page() {
  const data = await getData();
  if (!data || data.length === 0 || !data[0]?.faqstemplatesections?.sections) {
    return (
      <div className={"text-center text-2xl mt-20"}>Content not found</div>
    );
  }
  const sections = data[0]?.faqstemplatesections?.sections;

  return <FAQsPage data={sections} />;
}
