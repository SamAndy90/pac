import { Container, Title } from "@/common";

export type TPrivacy = {
  title: string;
  paragraphs: string[];
  _type: string;
  _key: string;
};

type PrivacyData = {
  title: string;
  blocks: TPrivacy[];
  _type: string;
  _key: string;
};

export type PrivacyProps = {
  data: PrivacyData;
};

export function Privacy({ data }: PrivacyProps) {
  const { title, blocks } = data;

  return (
    <section className={"py-12 mt-14 md:mt-20 mb-16"}>
      <Container>
        <div className={"max-w-[1000px] mx-auto"}>
          <Title className={"mb-6 md:mb-10 text-center"}>{title}</Title>
          <div className={"flex flex-col gap-y-8"}>
            {blocks.map((block) => (
              <div key={block._key}>
                <Title component={"h5"} className={"text-2xl mb-2 xl:text-3xl"}>
                  {block.title}
                </Title>
                <div className={"flex flex-col gap-y-2"}>
                  {block.paragraphs.map((paragraph, Idx) => (
                    <p
                      key={block._key + Idx}
                      className={"text-pka_blue2 font-avenirThin"}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
