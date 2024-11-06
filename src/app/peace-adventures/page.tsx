import JournalPage from "@/components/Journal/JournalPage";
import { getData } from "@/lib/data-fetchers/sanity";

export default async function Page() {
  const data = await getData(
    `*[_type == "page" && title == "Peace Adventures"]`
  );
  const newslist = await getData(`*[_type == "newslist"]`);

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

  return <JournalPage data={sections} news={newslist[0]} />;
}
