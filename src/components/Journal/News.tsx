"use client";

import { Container } from "@/common";
import { Portrait } from "@/types";
import NewsList from "./NewsList";
import { Button } from "../../common/UI/Button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { AddPostComponent } from "./AddPostComponent";

export type Article =
  | "sweepstakes_insights"
  | "adventure_stories"
  | "community_&_service"
  | "outdoor_gear_&_lifestyle"
  | "transparency_&_accountability"
  | "tips_&_how-tos";

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
          <AddPostComponent />
          <NewsList news={news?.slice(0, newsCount)} />
          <div className={cn(news?.length <= newsCount && "hidden")}>
            <Button
              fullWidth
              className={
                "tracking-wider mx-auto sm:w-auto border-pka_background"
              }
              onClick={() =>
                setNewsCount((count) =>
                  news?.length > count + 5 ? count + 5 : news?.length
                )
              }
            >
              Load More
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
