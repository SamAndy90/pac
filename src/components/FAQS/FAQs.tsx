import { Container, Title } from "@/common";
import { Disclosure, DisclosureItem } from "@/common/Disclosure";

export type FAQ = {
  question: string;
  answer: string;
  _type: string;
  _key: string;
};

type FAQsData = {
  title: string;
  faqs: FAQ[];
  _type: string;
  _key: string;
};

export type FAQsProps = {
  data: FAQsData;
};

export function FAQs({ data }: FAQsProps) {
  const { title, faqs } = data;

  return (
    <section className={"py-12 mt-14 md:mt-20 mb-16"}>
      <Container>
        <div className={"max-w-[900px] mx-auto"}>
          <Title className={"mb-10 text-center"}>{title}</Title>
          <div>
            <Disclosure>
              {faqs.map((faq) => (
                <DisclosureItem
                  key={faq._key}
                  trigger={
                    <p className={"font-bold font-garamond text-2xl"}>
                      {faq.question}
                    </p>
                  }
                >
                  <p>{faq.answer}</p>
                </DisclosureItem>
              ))}
            </Disclosure>
          </div>
        </div>
      </Container>
    </section>
  );
}
