import { Container } from "@/common";
import { HotNewsCard } from "./HotNewsCard";
import { Post } from "./News";

export type HotNewsProps = {
  data: {
    news: Post[];
    _type: string;
    _key: string;
  };
};

export function HotNews({ data }: HotNewsProps) {
  if (!data) return;
  const { news } = data;
  return (
    <section>
      <Container>
        <div className={"flex flex-col lg:flex-row gap-x-4 gap-y-5"}>
          {news
            ?.sort(
              (a, b) =>
                new Date(b.created).getTime() - new Date(a.created).getTime()
            )
            ?.slice(0, 2)
            ?.map((post, Idx) => (
              <HotNewsCard
                data={post}
                Idx={Idx}
                key={post._key}
                className={"flex-1"}
              />
            ))}
        </div>
      </Container>
    </section>
  );
}
