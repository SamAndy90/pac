import Image from "next/image";
import { cn, formatDate, ImgUrl } from "@/lib/utils";
import { HTMLAttributes } from "react";
import Link from "next/link";
import { Article, Post } from "./News";
import { FaRegImages } from "react-icons/fa6";

type HotNewsCardProps = {
  data: Post;
  Idx: number;
} & Pick<HTMLAttributes<HTMLDivElement>, "className">;

export function HotNewsCard({
  data,
  Idx,
  className: classes,
}: HotNewsCardProps) {
  const { article, title, created, gallery, _key } = data;
  return (
    <Link
      href={`/peace-adventures/${_key}`}
      className={cn("group border-b border-pka_blue2 lg:border-none", classes)}
    >
      <div className={"aspect-[14/10] mb-4 relative"}>
        <div
          className={cn(
            "absolute inset-0 rounded-2xl bg-pka_green transition-transform duration-500",
            Idx === 0 ? "lg:group-hover:-rotate-2" : "lg:group-hover:rotate-2"
          )}
        ></div>
        <div className={"relative h-full rounded-xl overflow-hidden"}>
          {gallery?.length > 0 ? (
            <Image
              src={ImgUrl(gallery[0])}
              alt={"News image"}
              fill
              className={
                "object-cover group-hover:scale-105 delay-75 transition-transform duration-1000"
              }
            />
          ) : (
            <div
              className={
                "bg-pka_green_light relative h-full rounded-xl flex items-center justify-center"
              }
            >
              <FaRegImages className={"text-pka_blue2 size-20"} />
            </div>
          )}
        </div>
      </div>
      <ArticleBadge type={article} className={"mb-3"} />
      <h4 className={"font-thunder text-pka_blue text-3xl lg:text-4xl"}>
        {title}
      </h4>
      <div
        className={"text-sm lg:text-base font-avenirThin text-pka_blue2 mb-4"}
      >
        {formatDate(created)}
      </div>
    </Link>
  );
}

export const ArticleBadge = ({
  type,
  className,
}: { type: Article } & Pick<HTMLAttributes<HTMLDivElement>, "className">) => {
  return (
    <div
      className={cn(
        "uppercase relative inline-block leading-none z-10 py-1 px-3 rounded-full font-avenirBold text-[8px] md:text-[10px] text-white lg:group-hover:text-pka_blue transition-colors duration-500 bg-pka_blue lg:group-hover:bg-white",
        className
      )}
    >
      {type?.replace(/_/g, " ")}
    </div>
  );
};
