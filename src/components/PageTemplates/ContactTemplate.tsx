import ContactPage from "@/components/Contact/ContactPage";

type ContactTemplateProps = {
  data: any;
};

export async function ContactTemplate({ data }: ContactTemplateProps) {
  if (
    !data ||
    data.length === 0 ||
    !data[0]?.contacttemplatesections?.sections
  ) {
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

  const sections = data[0]?.contacttemplatesections?.sections;

  return <ContactPage data={sections} />;
}
