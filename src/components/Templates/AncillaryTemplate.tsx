import AncillaryPage from "@/components/About/AncillaryPage";

type AncillaryTemplateProps = {
  data: any;
};

export function AncillaryTemplate({ data }: AncillaryTemplateProps) {
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

  return <AncillaryPage sections={sections} />;
}
