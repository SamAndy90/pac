"use client";

import { createCheckout } from "@/lib/data-fetchers/shopify/products";
import { createContext, useContext, useEffect, useState } from "react";
import { json } from "stream/consumers";

export type TShopContext = {
  cart: any[];
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

  useEffect(() => {
    if (localStorage.checkout_id) {
      let cartObject = JSON.parse(localStorage.checkout_id);

      setCart([...cartObject[0]]);

      setCheckoutId(cartObject[1].id);
      setCheckoutURL(cartObject[1].checkoutUrl);
    }
  }, []);

  async function addToCart(newItem: any) {
    if (cart.length === 0) {
      setCart([newItem]);

      const checkout = await createCheckout(
        newItem.id,
        newItem.variantQuantity
      );

      setCheckoutId(checkout.id);
      setCheckoutURL(checkout.checkoutUrl);

      localStorage.setItem(
        "checkout_id",
        JSON.stringify([[newItem], checkout])
      );
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

      const storageCart = JSON.parse(localStorage.checkout_id);
      localStorage.setItem(
        "checkout_id",
        JSON.stringify([[...cart], storageCart[1]])
      );
    }
  }

  return (
    <ShopContext.Provider
      value={{
        cart,
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
