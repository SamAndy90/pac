import { Container, EventCard, Title } from "@/common";
import { getData } from "@/lib/data-fetchers/sanity";
import { Color, ContestType, Portrait } from "@/types";

// export type EventType = {
//   _key: string;
//   _type: string;
//   starttime: string;
//   endtime: string;
//   portrait: Portrait;
//   title: string;
//   timerstyle: {
//     bgcolor: Color;
//     numcolor: Color;
//   };
//   collection_name: string;
//   subtitle: string;
//   description: string;
// };

export default async function ContestsPage() {
  const data = await getData(`*[_type == "contests"]`);

  if (!data || !data?.length) {
    return (
      <div className={"text-center text-2xl mt-28 text-pka_blue"}>
        Content not found
      </div>
    );
  }
  const events: ContestType[] = data[0]?.contestsList;
  return (
    <section className={"mt-14 md:mt-20 pt-12 pb-40"}>
      <Container>
        <div>
          <Title className={"mb-8 text-center"}>{data[0]?.title}</Title>
          <div
            className={
              "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 sm:px-12 lg:px-40 2xl:px-[15vw] gap-x-8 lg:gap-x-10 lg:gap-y-8 gap-y-6"
            }
          >
            {events?.map((event) => (
              <EventCard key={event._key} data={event} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
