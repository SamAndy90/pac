import { SanityDocument } from "next-sanity";
import { sanityFetch } from "../../../sanity/lib/fetch";
import JournalPage from "@/components/Journal/JournalPage";

async function getData() {
  return await sanityFetch<SanityDocument[]>({
    query: `*[_type == "page" && title == "Journal"]`,
  });
}

export default async function Page() {
  const data = await getData();
  if (
    !data ||
    data.length === 0 ||
    !data[0]?.journaltemplatesections?.sections
  ) {
    return (
      <div className={"text-center text-2xl mt-28 text-pka_blue"}>
        Content not found
      </div>
    );
  }
  const sections = data[0]?.journaltemplatesections?.sections;

  return <JournalPage data={sections} />;
}
