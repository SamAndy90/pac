import PrivacyPage from "@/components/Privacy/PrivacyPage";
import { getData } from "@/lib/data-fetchers/sanity";

export default async function Page() {
  const data = await getData(`*[_type == "page" && title == "Support"]`);
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
