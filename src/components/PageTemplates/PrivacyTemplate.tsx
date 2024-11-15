import PrivacyPage from "../Privacy/PrivacyPage";

type PrivacyTemplateProps = {
  data: any;
  title: string;
};

export async function PrivacyTemplate({ data, title }: PrivacyTemplateProps) {
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

  return <PrivacyPage data={sections} title={title} />;
}
