"use client";

import { createCheckout } from "@/lib/data-fetchers/shopify/products";
import { addToCart } from "@/lib/store/slices/cartSlice";
import { createContext, useContext, useState } from "react";

export type TShopContext = {
  cart: any[];
  setCart: (v: any) => void;
  isCartOpen: boolean;
  setIsCartOpen: (v: boolean) => void;
  checkoutId: string;
  setCheckoutId: (v: string) => void;
  checkoutURL: string;
  setCheckoutURL: (v: string) => void;
  addToCart: (v: any) => void;
};

const defaultShopValues = {
  cart: [],
  setCart: () => {},
  isCartOpen: false,
  setIsCartOpen: () => {},
  checkoutId: "",
  setCheckoutId: () => {},
  checkoutURL: "",
  setCheckoutURL: () => {},
  addToCart: () => {},
};

const ShopContext = createContext<TShopContext>(defaultShopValues);

export type ShopProviderProps = {
  children?: React.ReactNode;
};

export function ShopProvider(props: ShopProviderProps) {
  const { children } = props;
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [checkoutId, setCheckoutId] = useState<string>("");
  const [checkoutURL, setCheckoutURL] = useState<string>("");

  async function addToCart(newItem: any) {
    if (cart.length === 0) {
      setCart([newItem]);

      const checkout = await createCheckout(
        newItem.id,
        newItem.variantQuantity
      );

      setCheckoutId(checkout.id);
      setCheckoutURL(checkout.url);

      localStorage.setItem("checkout_id", JSON.stringify([newItem, checkout]));
    } else {
      let newCart = [...cart];

      cart.map((item) => {
        if (item.id === newItem.id) {
          item.variantQuantity++;
          newCart = [...cart];
        } else {
          newCart = [...cart, newItem];
        }
      });

      setCart(newCart);
    }

    return;
  }

  return (
    <ShopContext.Provider
      value={{
        cart,
        setCart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        checkoutURL,
        checkoutId,
        setCheckoutId,
        setCheckoutURL,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShopContext() {
  return useContext(ShopContext);
}
