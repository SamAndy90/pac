import { SanityDocument } from "next-sanity";
import { sanityFetch } from "../../../sanity/lib/fetch";
import ShopPage from "@/components/Shop/ShopPage";

async function getData() {
  return await sanityFetch<SanityDocument[]>({
    query: `*[_type == "page" && title == "Shop"]`,
  });
}

export default async function Page() {
  const data = await getData();
  if (!data || data.length === 0 || !data[0]?.shoptemplatesections?.sections) {
    return (
      <div className={"text-center text-2xl mt-24"}>Content not found</div>
    );
  }
  const sections = data[0]?.shoptemplatesections?.sections;

  return <ShopPage data={sections} />;
}
