"use client";

import { useShopContext } from "@/contexts/ShopContext";
import { formatter } from "@/lib/utils";
import { CartItem } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FiX } from "react-icons/fi";

export type CartProductCardProps = {
  product: CartItem;
};

export default function CartProductCard({ product }: CartProductCardProps) {
  const { title, handle, price, image, variantQuantity } = product;
  const { cart, setIsCartOpen, removeFromCart } = useShopContext();

  return (
    <div className={"px-3 py-2.5 rounded-xl bg-pka_background"}>
      <div className={"flex gap-x-3 relative"}>
        <div
          className={"w-1/3 aspect-square rounded-xl relative overflow-hidden"}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className={"object-contain"}
          />
        </div>
        <div className={"flex flex-col justify-between py-3"}>
          <Link
            href={`/shop/${handle}?id=${product.id}`}
            onClick={() => setIsCartOpen(false)}
            className={
              "font-thunder text-2xl text-pka_blue2 transition-colors hover:text-pka_green"
            }
          >
            {title}
          </Link>
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
          onClick={() => {
            removeFromCart(product);
            if (cart.length === 1) setIsCartOpen(false);
          }}
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
