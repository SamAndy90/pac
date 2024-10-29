"use client";

import Image from "next/image";
import Link from "next/link";
import { FaRegImages } from "react-icons/fa6";
import { NewButton } from "../ui/NewButton";
import { useShopContext } from "@/contexts/ShopContext";

export type ContestProductCardProps = {
  data: any;
};

export function ContestProductCard({ data }: ContestProductCardProps) {
  const { title, description, images, id, handle, variants } = data;
  const { cart, addToCart } = useShopContext();

  const allVariantsOptions = variants.edges.map((v: any) => {
    return {
      id: v.node.id,
      price: v.node.price.amount,
      variantQuantity: 1,
    };
  });

  const imageSrc = images.edges ? images.edges[0]?.node.url : "";
  const imageAltText = images.edges
    ? images.edges[0]?.node.altText
    : "Product image";

  return (
    <div
      // href={`/shop/${handle}?id=${id}`}
      className={"w-full lg:col-span-1 group flex flex-col"}
    >
      <div className={"aspect-square mb-4 lg:mb-6 relative"}>
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
              // src={urlFor(portrait.asset._ref).url()}
              // alt={"Product photo"}
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
                "bg-pka_green_light aspect-square rounded-2xl flex items-center justify-center"
              }
            >
              <FaRegImages className={"text-pka_blue2 size-20"} />
            </div>
          )}
        </div>
      </div>
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
      <NewButton
        fullWidth
        colorVariant={"danger"}
        onClick={() => addToCart(allVariantsOptions[0])}
      >
        Buy
      </NewButton>
    </div>
  );
}
