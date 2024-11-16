import { Container } from "@/common";
import { Portrait } from "@/types";
import NewsList from "./NewsList";
import { NewButton } from "../../common/UI/NewButton";
import { cn } from "@/lib/utils";
import { useState } from "react";

export type Article = "company" | "team" | "project";

export type Post = {
  article: Article;
  title: string;
  paragraphs: string[];
  gallery: Portrait[];
  created: string;
  _key: string;
  _type: string;
};

export type NewsProps = {
  data: {
    news: Post[];
    _type: string;
    _key: string;
  };
};

export default function News({ data }: NewsProps) {
  const [newsCount, setNewsCount] = useState(5);
  if (!data) return;
  const { news } = data;

  return (
    <section className={"mb-16"}>
      <Container>
        <div className={"flex flex-col gap-8"}>
          <NewsList news={news.slice(0, newsCount)} />
          <div className={cn(news.length === newsCount && "hidden")}>
            <NewButton
              fullWidth
              className={
                "tracking-wider mx-auto sm:w-auto border-pka_background"
              }
              onClick={() =>
                setNewsCount((count) =>
                  news.length > count + 5 ? count + 5 : news.length
                )
              }
            >
              Load More
            </NewButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
