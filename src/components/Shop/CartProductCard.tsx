"use client";

import { useShopContext } from "@/contexts/ShopContext";
import { CART_LINES_REMOVE_MUTATION } from "@/lib/data-fetchers/queries";
import client from "@/lib/shopifyClient";
import { formatter } from "@/lib/utils";
import { CartLine } from "@/types";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { FaRegImages } from "react-icons/fa6";
import { FiX } from "react-icons/fi";

export type CartProductCardProps = {
  product: CartLine;
};

export default function CartProductCard({ product }: CartProductCardProps) {
  const { id: lineId, quantity, merchandise } = product.node;
  const {
    id: productId,
    handle,
    title,
    priceRange,
    media,
  } = merchandise.product;

  const { setIsCartOpen, cartId, setCartId } = useShopContext();

  const [cartLinesRemove] = useMutation(CART_LINES_REMOVE_MUTATION, {
    onCompleted(data) {
      client.refetchQueries({
        include: ["getCart"],
      });
      if (data.cartLinesRemove.cart.lines.edges.length === 0) {
        setIsCartOpen(false);
        setCartId("");
        localStorage.removeItem("cart_id");
      }
    },
  });

  const handleRemove = async () => {
    try {
      const response = await cartLinesRemove({
        variables: {
          cartId,
          lineIds: [lineId],
        },
      });

      if (response.data.cartLinesRemove.userErrors.length) {
        console.error("User error:", response.data.cartLinesRemove.userErrors);
      } else {
        console.log(
          "Product removed successfully:",
          response.data.cartLinesRemove.cart
        );
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  return (
    <div className={"px-3 py-2.5 rounded-xl bg-pka_background"}>
      <div className={"flex gap-x-3 relative"}>
        <div
          className={
            "w-1/3 aspect-square rounded-xl relative overflow-hidden bg-pka_green_light"
          }
        >
          {media.edges[0].node.image && media.edges[0].node.image.url ? (
            <Image
              src={media.edges[0].node.image.url}
              alt={media.edges[0].node.image.altText || "Image"}
              fill
              className={"object-cover"}
            />
          ) : (
            <div
              className={
                "bg-pka_green_light aspect-square rounded-xl flex items-center justify-center"
              }
            >
              <FaRegImages className={"text-pka_blue2 size-8"} />
            </div>
          )}
        </div>
        <div className={"flex-1 flex flex-col justify-between py-3"}>
          <Link
            href={`/shop/${handle}?id=${productId}`}
            onClick={() => setIsCartOpen(false)}
            className={
              "font-thunder text-2xl text-pka_blue2 transition-colors hover:text-pka_green"
            }
          >
            {title}
          </Link>
          <div className={"flex justify-between"}>
            <span className={"text-pka_black/50"}>
              Qny <span>{quantity}</span>
            </span>
            <span className={"text-pka_blue font-medium font-thunder text-xl"}>
              {formatter.format(parseInt(priceRange.minVariantPrice.amount))}
            </span>
          </div>
        </div>
        <button
          className={"absolute right-0 top-0 outline-none"}
          type={"button"}
          onClick={handleRemove}
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
