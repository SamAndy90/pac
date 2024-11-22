"use client";

import Image from "next/image";
import Link from "next/link";
import { FaRegImages } from "react-icons/fa6";
import { Button } from "../../common/UI/Button";

export type ContestProductCardProps = {
  product: any;
};

export function ContestProductCard({ product }: ContestProductCardProps) {
  const { title, description, media, id, handle, variants } = product;

  const images =
    media.edges
      ?.filter((el: any) => el.node.image?.url)
      .map((el: any) => ({
        id: el.node.image.id,
        src: el.node.image.url,
        alt: el.node.image.altText || "Product Image",
      })) || [];

  return (
    <div className={"w-full lg:col-span-1 group flex flex-col"}>
      <Link
        href={`/shop/${handle}?id=${id}`}
        className={"aspect-square mb-4 lg:mb-6 relative"}
      >
        <div
          className={
            "absolute inset-0 bg-pka_green z-10 xl:h-[90%] transition-transform duration-700 rounded-2xl delay-100 lg:group-hover:rotate-[3deg]"
          }
        ></div>
        <div
          className={
            "w-full h-full bg-white relative overflow-hidden rounded-xl z-20"
          }
        >
          {images.length ? (
            <Image
              src={images[0].src}
              alt={images[0].alt}
              fill
              className={
                "object-contain lg:group-hover:scale-105 transition-transform duration-700"
              }
            />
          ) : (
            <div
              className={
                "bg-pka_green_light aspect-square rounded-xl flex items-center justify-center"
              }
            >
              <FaRegImages className={"text-pka_blue2 size-20"} />
            </div>
          )}
        </div>
      </Link>
      <h4
        className={
          "mb-2 lg:mb-3 font-garamond font-bold text-pka_blue text-center text-[8.2vw] md:text-[4vw] lg:text-[3vw] xl:text-[2.4vw] leading-none"
        }
      >
        {title}
      </h4>
      <p
        className={
          "text-pka_blue2/90 mb-6 leading-tight lg:leading-tight text-center line-clamp-5 flex-1"
        }
      >
        {description}
      </p>
      <Link href={`/shop/${handle}?id=${id}`}>
        <Button fullWidth>Go to Product</Button>
      </Link>
    </div>
  );
}
