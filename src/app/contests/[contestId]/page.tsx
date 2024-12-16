import { Container, Title } from "@/common";
import { ContestProducts } from "@/components/Contests/ContestProducts";
import { getData } from "@/lib/data-fetchers/sanity";
import { getCollection } from "@/lib/data-fetchers/shopify/products";
import { EventType } from "../page";

export type ContestPageType = {
  params: { contestId: string };
};

export default async function ContestPage({ params }: ContestPageType) {
  const collection = await getCollection(params.contestId);
  const data = await getData(`*[_type == "contests"]`);
  const events: EventType[] = data[0]?.contestsList;
  const event = events.find(
    (event) => event.collection_name === params.contestId
  );

  if (!collection) {
    return (
      <section className={"mt-14 md:mt-20 py-12"}>
        <Container>
          <div className={"text-center text-4xl text-pka_blue"}>
            Sorry, products not found
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className={"mt-14 md:mt-20 pt-12 pb-24 lg:pb-40"}>
      <Container>
        <div>
          <Title className={"text-center mb-5"}>{event?.title}</Title>
          <p
            className={
              "sm:max-w-[85%] text-center mx-auto text-pka_blue2 mb-14"
            }
          >
            {event?.description}
          </p>
          <ContestProducts
            products={collection.products.edges}
            button={data[0]?.buttonText}
          />
        </div>
      </Container>
    </section>
  );
}
