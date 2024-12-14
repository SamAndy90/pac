"use client";

import { useShopContext } from "@/contexts/ShopContext";
import { ShoppingCart } from "lucide-react";
import { CartWindow } from "./CartWindow";
import { useQuery } from "@apollo/client";
import { GET_CART_QUERY } from "@/lib/data-fetchers/queries";
import { Cart } from "@/types";

type QueryData = {
  cart: Cart;
};
export const CartButton = () => {
  const { cartId, isCartOpen, setIsCartOpen } = useShopContext();
  const { data, error } = useQuery<QueryData>(GET_CART_QUERY, {
    variables: {
      cartId,
    },
    skip: !cartId,
    pollInterval: 1000 * 60 * 30,
  });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <>
      <div className="relative" onClick={() => setIsCartOpen(true)}>
        <ShoppingCart className="lg:text-white size-5 text-white lg:hover:text-pka_green transition-colors" />
        {data?.cart?.totalQuantity && (
          <div
            className={
              "size-3.5 absolute top-0 right-0 translate-x-1.5 -translate-y-1.5 flex items-center justify-center bg-white text-pka_blue rounded-full text-[9px] font-bold overflow-hidden"
            }
          >
            <span className={"leading-[0] tracking-[0] -mb-[1.5px]"}>
              {data?.cart.totalQuantity}
            </span>
          </div>
        )}
      </div>
      <CartWindow
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={data?.cart}
      />
    </>
  );
};
