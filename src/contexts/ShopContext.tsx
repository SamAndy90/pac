"use client";

import {
  cartCreate,
  cartLinesAdd,
  cartLinesUpdate,
} from "@/lib/data-fetchers/shopify/products";
import { CartItem } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

export type CartProduct = {
  id: string;
  title: string;
  handle: string;
  image: {
    id: string;
    src: string;
    alt: string;
  };
  variantQuantity: number;
  price: string;
  cartLineId: string;
};

export type TShopContext = {
  cart: CartProduct[];
  isCartOpen: boolean;
  setIsCartOpen: (v: boolean) => void;
  // checkoutId: string;
  // setCheckoutId: (v: string) => void;
  checkoutURL: string;
  // setCheckoutURL: (v: string) => void;
  addToCart: (v: any) => void;
  removeCartProduct: (v: CartProduct) => void;
};

const defaultShopValues: TShopContext = {
  cart: [],
  isCartOpen: false,
  setIsCartOpen: () => {},
  // checkoutId: "",
  // setCheckoutId: () => {},
  checkoutURL: "",
  // setCheckoutURL: () => {},
  addToCart: () => {},
  removeCartProduct: () => {},
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
      const storedCheckout = JSON.parse(localStorage.checkout_id);
      setCart(storedCheckout.cart);
      setCheckoutId(storedCheckout.id);
      setCheckoutURL(storedCheckout.checkoutUrl);
    }
  }, []);

  async function addToCart(newItem: CartItem) {
    if (cart.length === 0) {
      const checkout = await cartCreate(
        newItem.variantId,
        newItem.variantQuantity
      );
      const cartWithId = checkout.lines.edges.map((edge: any) => ({
        ...newItem,
        cartLineId: edge.node.id,
      }));

      setCart(cartWithId);
      setCheckoutId(checkout.id);
      setCheckoutURL(checkout.checkoutUrl);

      localStorage.setItem(
        "checkout_id",
        JSON.stringify({
          cart: cartWithId,
          id: checkout.id,
          checkoutUrl: checkout.checkoutUrl,
        })
      );

      console.log("Cart created successfully");
    } else {
      let updatedCart;

      const existingItem = cart.find(
        (item) => item.variantId === newItem.variantId
      );
      if (existingItem) {
        updatedCart = cart.map((item) =>
          item.variantId === newItem.variantId
            ? { ...item, variantQuantity: item.variantQuantity + 1 }
            : item
        );

        const response = await cartLinesUpdate(checkoutId, updatedCart);

        console.log("Cart updated successfully");
      } else {
        const response = await cartLinesAdd(checkoutId, [
          {
            merchandiseId: newItem.variantId,
            quantity: newItem.variantQuantity,
          },
        ]);

        updatedCart = [
          ...cart,
          {
            ...newItem,
            cartLineId: response.lines.edges[0].node.id,
          },
        ];

        console.log("New line added successfully");
      }

      setCart(updatedCart);

      localStorage.setItem(
        "checkout_id",
        JSON.stringify({
          cart: updatedCart,
          id: checkoutId,
          checkoutUrl: checkoutURL,
        })
      );
    }
  }

  async function removeCartProduct(itemToRemove: any) {
    const updatedCart = cart.filter(
      (item) => item.variantId !== itemToRemove.variantId
    );
    setCart(updatedCart);

    const newCheckout = await cartLinesUpdate(checkoutId, updatedCart);

    localStorage.setItem(
      "checkout_id",
      JSON.stringify({
        cart: updatedCart,
        id: newCheckout.id,
        checkoutUrl: newCheckout.checkoutUrl,
      })
    );
  }

  return (
    <ShopContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeCartProduct,
        checkoutURL,
        // checkoutId,
        // setCheckoutId,
        // setCheckoutURL,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShopContext() {
  return useContext(ShopContext);
}
