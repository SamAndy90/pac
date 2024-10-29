import { Container, Title } from "@/common";
import { ContestProducts } from "@/components/Contests/ContestProducts";
import { ListInput } from "@/components/Contests/ListInput";
import { PositionForm } from "@/components/ui/Inputs";
import { NewButton } from "@/components/ui/NewButton";
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

  const positionList = Array.from({ length: 485 }, (_, index) => ({
    value: `${index + 1}`,
    label: `Position ${index + 1}`,
  }));

  if (collection.title.toLowerCase() === "sticker") {
    return (
      <section className={"mt-14 md:mt-20 pt-12 pb-24 lg:pb-40"}>
        <Container>
          <div>
            <Title className={"text-center mb-10"}>{collection.title}</Title>
            <p
              className={
                "font-garamond text-xl lg:text-2xl sm:max-w-[85%] text-center mx-auto text-pka_blue2 mb-10"
              }
            >
              {event?.description}
            </p>
            <div className={"grid grid-cols-1 md:grid-cols-2 gap-8"}>
              <div
                className={
                  "flex items-center px-4 py-3 justify-center rounded-2xl shadow-md aspect-square md:aspect-[16/9] bg-white"
                }
              >
                <p
                  className={
                    "text-red-500 text-center font-garamond font-bold text-7xl"
                  }
                >
                  Sticker event
                </p>
              </div>
              <form className={"flex flex-col gap-y-6"}>
                <Title className={"text-3xl"}>Select entry position</Title>
                <div className={"flex-1"}>
                  <ListInput list={positionList} />
                </div>
                <NewButton type={"submit"} colorVariant={"black"} fullWidth>
                  Enter to Win
                </NewButton>
              </form>
              {/* <PositionForm list={positionList} /> */}
            </div>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className={"mt-14 md:mt-20 pt-6 lg:pt-12 pb-24 lg:pb-40"}>
      <Container>
        <div>
          <Title className={"text-center mb-10"}>{collection.title}</Title>
          <p
            className={
              "font-garamond text-xl lg:text-2xl sm:max-w-[85%] text-center mx-auto text-pka_blue2 mb-10"
            }
          >
            {event?.description}
          </p>
          <ContestProducts data={collection.products.edges} />
        </div>
      </Container>
    </section>
  );
}
