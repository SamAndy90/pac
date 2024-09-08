import { SanityDocument } from "next-sanity";
import { sanityFetch } from "../../../sanity/lib/fetch";
import PrivacyPage from "@/components/Privacy/PrivacyPage";

async function getData() {
  return await sanityFetch<SanityDocument[]>({
    query: `*[_type == "page" && title == "Privacy"]`,
  });
}

export default async function Page() {
  const data = await getData();
  if (
    !data ||
    data.length === 0 ||
    !data[0]?.privacytemplatesections?.sections
  ) {
    return (
      <div className={"text-center text-2xl mt-28 text-pka_blue"}>
        Content not found
      </div>
    );
  }
  const sections = data[0]?.privacytemplatesections?.sections;

  return <PrivacyPage data={sections} />;
}
