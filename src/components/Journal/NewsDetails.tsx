import { Container, Title } from "@/common";
import { Post } from "./News";
import { NewButton } from "../ui/NewButton";
import Link from "next/link";
import { ArticleBadge } from "./HotNewsCard";
import { formatDate, ImgUrl } from "@/lib/utils";
import Image from "next/image";

export type NewsDetailsProps = {
  data?: Post;
};

export default function NewsDetails({ data }: NewsDetailsProps) {
  if (!data) return;

  const { article, gallery, title, created, paragraphs } = data;

  return (
    <section className={"mb-24 lg:mb-40 mt-28 lg:mt-32"}>
      <Container>
        <div>
          <ArticleBadge
            type={article}
            className={"inline-block mb-3 lg:mb-5"}
          />
          <Title className={"mb-8 lg:mb-16 xl:mb-20 text-7xl xl:text-8xl"}>
            {title}
          </Title>

          <div className={"flex flex-col lg:flex-row gap-y-10"}>
            <div className={"flex-1"}>
              <div className={"grid grid-cols-2 gap-3 lg:gap-5"}>
                {gallery.map((img) => (
                  <div
                    key={JSON.stringify(img)}
                    className={
                      "relative aspect-square rounded-2xl overflow-hidden"
                    }
                  >
                    <Image
                      src={ImgUrl(img)}
                      alt={"Image"}
                      fill
                      className={"object-cover"}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className={"flex-1"}>
              <div
                className={
                  "w-[90%] lg:w-[65%] lg:max-w-[520px] lg:mx-auto pt-4 md:pt-9 xl:pt-12"
                }
              >
                <div className={"font-avenirThin text-pka_blue2 mb-4"}>
                  {formatDate(created)}
                </div>
                <div className={"flex flex-col gap-y-3"}>
                  {paragraphs.map((p) => (
                    <p key={p.slice(0, 21)}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
