import HomePage from "@/components/Home/HomePage";

type HomeTemplateProps = {
  data: any;
};

export function HomeTemplate({ data }: HomeTemplateProps) {
  if (!data || !data?.homepagetemplatesections?.sections) {
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

  const sections = data?.homepagetemplatesections?.sections;

  return <HomePage data={sections} />;
}
