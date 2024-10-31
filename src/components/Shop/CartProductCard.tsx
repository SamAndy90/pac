"use client";

import { CartProduct, useShopContext } from "@/contexts/ShopContext";
import { formatter } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FiX } from "react-icons/fi";

export type CartProductCardProps = {
  product: CartProduct;
};

export default function CartProductCard({ product }: CartProductCardProps) {
  const { id, title, price, image, variantQuantity, cartLineId } = product;
  const { removeCartProduct } = useShopContext();

  console.log({ image });

  return (
    <div className={"px-3 py-2.5 rounded-xl bg-pka_background"}>
      <div className={"flex gap-x-3 relative"}>
        <div
          className={"w-1/3 aspect-square rounded-xl relative overflow-hidden"}
        >
          <Image
            src={image.src}
            alt={image.alt ?? "image"}
            fill
            className={"object-contain"}
          />
        </div>
        <div className={"flex flex-col justify-between py-3"}>
          {/* <Link
            href={`shop/${product.id}`}
            className={
              "font-thunder text-2xl text-pka_blue2 transition-colors hover:text-pka_green"
            }
          >
            {title}
          </Link> */}
          <h3
            className={
              "font-thunder text-2xl text-pka_blue2 transition-colors hover:text-pka_green"
            }
          >
            {title}
          </h3>
          <div className={"flex justify-between"}>
            <span className={"text-pka_black/50"}>
              Qny <span>{variantQuantity}</span>
            </span>
            <span className={"text-pka_blue font-medium font-thunder text-xl"}>
              {formatter.format(+price)}
            </span>
          </div>
        </div>
        <button
          className={"absolute right-0 top-0 outline-none"}
          type={"button"}
          onClick={() => removeCartProduct(product)}
        >
          <FiX
            className={
              "size-5 transition-colors duration-300 hover:text-pka_green text-pka_blue"
            }
          />
        </button>
      </div>
    </div>
  );
}
