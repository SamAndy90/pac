import Image from "next/image";
import { Post } from "./News";
import Link from "next/link";
import { cn, formatDate, ImgUrl } from "@/lib/utils";
import { ArticleBadge } from "./HotNewsCard";
import { FaArrowRight } from "react-icons/fa";
import { FaRegImages } from "react-icons/fa6";

export type NewsCardProps = {
  post: Post;
};

export default function NewsCard({ post }: NewsCardProps) {
  const { article, title, gallery, created, _key } = post;
  return (
    <Link
      href={`/peace-adventures/${_key}`}
      className={
        "gap-x-5 group flex gap-5 border-pka_black hover:border-pka_blue py-5 lg:py-8 border-b"
      }
    >
      <div
        className={
          "absolute bottom-0 -inset-x-2 transition-all duration-500 bg-pka_blue h-0 lg:group-hover:h-full z-0 rounded-2xl"
        }
      ></div>

      <div
        className={
          "lg:w-[22%] lg:max-w-[300px] relative hidden lg:block aspect-square rounded-xl overflow-hidden"
        }
      >
        {gallery ? (
          <Image
            src={ImgUrl(gallery[0])}
            alt={"News image"}
            fill
            className={
              "object-cover group-hover:scale-[1.03] transition-transform duration-700"
            }
          />
        ) : (
          <div
            className={
              "bg-pka_green_light h-full rounded-xl flex items-center justify-center"
            }
          >
            <FaRegImages className={"text-pka_blue2 size-20"} />
          </div>
        )}
      </div>

      <div
        className={
          "flex-1 transition-colors duration-500 flex flex-col justify-between gap-y-3"
        }
      >
        <ArticleBadge type={article} className={cn("self-start")} />
        <div className={"flex items-center justify-between relative"}>
          <div>
            <h4
              className={
                "font-thunder text-pka_blue text-3xl lg:text-4xl lg:group-hover:text-white transition-colors duration-300"
              }
            >
              {title}
            </h4>
            <div
              className={
                "text-sm lg:text-base font-avenirThin text-pka_blue2 lg:group-hover:text-white transition-colors duration-300"
              }
            >
              {formatDate(created)}
            </div>
          </div>
          <button
            className={
              "hidden lg:flex bg-pka_black rounded-full size-10 lg:size-12 items-center justify-center text-white lg:group-hover:bg-pka_green lg:group-hover:text-pka_blue2 transition-colors duration-500"
            }
          >
            <FaArrowRight className={"size-5"} />
          </button>
        </div>
      </div>
    </Link>
  );
}
