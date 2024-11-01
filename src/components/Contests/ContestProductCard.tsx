"use client";

import Image from "next/image";
import Link from "next/link";
import { FaRegImages } from "react-icons/fa6";
import { NewButton } from "../ui/NewButton";
import { useShopContext } from "@/contexts/ShopContext";
import { CartItem } from "@/types";

export type ContestProductCardProps = {
  product: any;
};

export function ContestProductCard({ product }: ContestProductCardProps) {
  const { title, description, media, id, handle, variants } = product;
  const { cart, addToCart } = useShopContext();

  const images = media.edges?.map((el: any) => {
    if (!el.node.image.url) return;
    return {
      id: el.node.image.id,
      src: el.node.image.url,
      alt: el.node.image.altText ? el.node.image.altText : "Product Image",
    };
  });

  const imageSrc = media.edges[0]?.node.image.url
    ? media.edges[0]?.node.image.url
    : null;
  const imageAltText = media.edges[0]?.node.image.altText
    ? media.edges[0]?.node.image.altText
    : "Product image";

  const allVariantsOptions: CartItem[] = variants.edges.map((v: any) => {
    return {
      id,
      title,
      handle,
      variantId: v.node.id,
      image: images[0],
      price: v.node.price.amount,
      variantQuantity: 1,
    };
  });

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
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAltText}
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
          "mb-1 lg:mb-2 font-garamond font-bold text-pka_blue text-center text-[8.2vw] md:text-[4vw] lg:text-[3vw] xl:text-[2.4vw] leading-none"
        }
      >
        {title}
      </h4>
      <p
        className={
          "text-pka_blue2/90 mb-6 lg:text-lg leading-tight lg:leading-tight text-center line-clamp-5 flex-1"
        }
      >
        {description}
      </p>
      <NewButton fullWidth onClick={() => addToCart(allVariantsOptions[0])}>
        Buy
      </NewButton>
    </div>
  );
}
