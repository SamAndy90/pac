"use client";

import { useState } from "react";
import { Post } from "./News";
import NewsCard from "./NewsCard";
import { NewButton } from "../ui/NewButton";
import { cn } from "@/lib/utils";

export type NewsListProps = {
  news: Post[];
};

export default function NewsList({ news }: NewsListProps) {
  const [newsCount, setNewsCount] = useState(1);

  return (
    <div className={"flex flex-col gap-8"}>
      <ul>
        {news.slice(0, newsCount).map((post) => (
          <li className={"relative px-2 [&:first-child_a]:border-t"}>
            <NewsCard key={post._key} post={post} />
          </li>
        ))}
      </ul>
      <div className={cn(news.length === newsCount && "hidden")}>
        <NewButton
          className={"tracking-wider mx-auto border-pka_background"}
          onClick={() =>
            setNewsCount((count) =>
              news.length > count ? count + 1 : news.length
            )
          }
        >
          Load More
        </NewButton>
      </div>
    </div>
  );
}
