import AncillaryPage from "../About/AncillaryPage";

type AncillaryTemplateProps = {
  data: any;
  title: string;
};

export async function AncillaryTemplate({
  data,
  title,
}: AncillaryTemplateProps) {
  if (!data || !data?.ancillarysections?.sections) {
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
  const sections = data?.ancillarysections?.sections;

  return <AncillaryPage sections={sections} title={title} />;
}
