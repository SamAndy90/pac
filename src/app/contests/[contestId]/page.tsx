import { Container, Title } from "@/common";
import { ListInput } from "@/components/Contests/ListInput";
import { PositionForm } from "@/components/ui/Inputs";
import { NewButton } from "@/components/ui/NewButton";
import { getCollection } from "@/lib/data-fetchers/shopify/products";

export type ContestPageType = {
  params: { contestId: string };
};

export default async function ContestPage({ params }: ContestPageType) {
  const collection = await getCollection(params.contestId);

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

  return (
    <section className={"mt-14 md:mt-20 pt-12 pb-24 lg:pb-40"}>
      <Container>
        <div>
          <Title className={"text-center mb-8"}>{collection.title}</Title>
          <div className={"grid grid-cols-2 gap-x-3"}>
            <div
              className={
                "flex items-center justify-center rounded-2xl shadow-md aspect-[16/9] bg-white"
              }
            >
              <p className={"text-red-500 font-garamond font-bold text-7xl"}>
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
