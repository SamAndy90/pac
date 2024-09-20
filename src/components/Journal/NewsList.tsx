import { Post } from "./News";
import NewsCard from "./NewsCard";

export type NewsListProps = {
  news: Post[];
};

export default function NewsList({ news }: NewsListProps) {
  return (
    <ul>
      {news.map((post) => (
        <li
          key={post._key}
          className={"relative px-2 [&:first-child_a]:border-t"}
        >
          <NewsCard post={post} />
        </li>
      ))}
    </ul>
  );
}
