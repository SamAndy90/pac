import { Container } from "@/common";
import { Portrait } from "@/types";
import NewsList from "./NewsList";

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
  return (
    <section className={"mb-16"}>
      <Container>
        <NewsList news={data.news} />
      </Container>
    </section>
  );
}
