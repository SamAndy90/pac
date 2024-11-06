import { Post } from "@/components/Journal/News";
import MoreNews from "@/components/Journal/MoreNews";
import NewsDetails from "@/components/Journal/NewsDetails";
import { getData } from "@/lib/data-fetchers/sanity";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getData(`*[_type == "newslist"]`);
  if (!data) return;

  const { news } = data[0];

  const singleNews = news.find((n: Post) => n._key === params.id);
  const moreNews = news.filter((n: Post) => n._key !== params.id);

  return (
    <div>
      <NewsDetails data={singleNews} />
      <MoreNews data={moreNews} />
    </div>
  );
}
