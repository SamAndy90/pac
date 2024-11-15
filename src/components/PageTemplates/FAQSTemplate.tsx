import FAQsPage from "../FAQS/FAQsPage";

type FAQSTemplateProps = {
  data: any;
  title: string;
};

export async function FAQSTemplate({ data, title }: FAQSTemplateProps) {
  if (!data || !data?.faqstemplatesections?.sections) {
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

  const sections = data?.faqstemplatesections?.sections;

  return <FAQsPage data={sections} title={title} />;
}
