import FAQsPage from "@/components/FAQS/FAQsPage";

type FAQSTemplateProps = {
  data: any;
};

export function FAQSTemplate({ data }: FAQSTemplateProps) {
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

  return <FAQsPage data={sections} />;
}
