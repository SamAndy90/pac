import ContactTemplate from "@/components/Contact/ContactTemplate";
import { getData } from "@/lib/data-fetchers/sanity";

export default async function Page() {
  const data = await getData(`*[_type == "page" && title == "FAQs"]`);
  if (!data || data.length === 0 || !data[0]?.faqstemplatesections?.sections) {
    return (
      <div className={"text-center text-2xl mt-28 text-pka_blue"}>
        Content not found
      </div>
    );
  }
  const sections = data[0]?.faqstemplatesections?.sections;

  return <ContactTemplate data={sections} />;
}
