import { Container, Title } from "@/common";
import { ContestCard } from "@/common/ContestCard";
import { getData } from "@/lib/data-fetchers/sanity";
import { Portrait } from "@/types";

export type EventType = {
  _key: string;
  _type: string;
  starttime: string;
  endtime: string;
  portrait: Portrait;
  title: string;
  timerstyle: {
    bgcolor: string;
    numcolor: string;
  };
  collection_name: string;
  subtitle: string;
  description: string;
};

export default async function ContestsPage() {
  const data = await getData(`*[_type == "contests"]`);

  if (!data || !data.length) {
    return (
      <div className={"text-center text-2xl mt-28 text-pka_blue"}>
        Content not found
      </div>
    );
  }
  const events: EventType[] = data[0]?.contestsList;
  console.log({ data: events });

  return (
    <section className={"mt-14 md:mt-20 pt-12 pb-40"}>
      <Container>
        <div>
          <Title className={"mb-8"}>{data[0]?.title}</Title>
          <div
            className={
              "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-[5vw] lg:px-[8vw] gap-y-[12vw] md:gap-x-[8vw] lg:gap-x-[5vw] lg:gap-y-[6vw]"
            }
          >
            {events.map((event) => {
              const {
                collection_name,
                subtitle,
                title,
                description,
                starttime,
                endtime,
                timerstyle,
                portrait,
              } = event;
              return (
                <ContestCard
                  key={event._key}
                  collectionName={collection_name}
                  subtitle={subtitle}
                  title={title}
                  description={description}
                  eventStart={starttime}
                  eventEnd={endtime}
                  countdownBgColor={timerstyle.bgcolor}
                  countdownTextColor={timerstyle.numcolor}
                  backgroundImage={portrait.asset._ref}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
