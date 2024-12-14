import JournalPage from "@/components/Journal/JournalPage";
import { getData } from "@/lib/data-fetchers/sanity";

type JournalTemplateProps = {
  data: any;
};

export async function JournalTemplate({ data }: JournalTemplateProps) {
  if (!data || !data?.journaltemplatesections?.sections) {
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
  const newslist = await getData(`*[_type == "newslist"]`);

  const sections = data?.journaltemplatesections?.sections;

  return <JournalPage data={sections} news={newslist[0]} />;
}
