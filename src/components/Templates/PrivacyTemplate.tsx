import PrivacyPage from "@/components/Privacy/PrivacyPage";

type PrivacyTemplateProps = {
  data: any;
};

export function PrivacyTemplate({ data }: PrivacyTemplateProps) {
  if (!data || !data?.privacytemplatesections?.sections) {
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

  const sections = data?.privacytemplatesections?.sections;

  return <PrivacyPage data={sections} />;
}
