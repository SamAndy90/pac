"use client";

import {
  createCheckout,
  updateCheckout,
} from "@/lib/data-fetchers/shopify/products";
import { createContext, useContext, useEffect, useState } from "react";

export type CartProduct = {
  id: string;
  title: string;
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

  // async function addToCart(newItem: any) {
  //   if (cart.length === 0) {
  //     const checkout = await createCheckout(
  //       newItem.id,
  //       newItem.variantQuantity
  //     );

  //     setCart([newItem]);
  //     setCheckoutId(checkout.id);
  //     setCheckoutURL(checkout.checkoutUrl);

  //     localStorage.setItem(
  //       "checkout_id",
  //       JSON.stringify([[newItem], checkout])
  //     );
  //   } else {
  //     let newCart = [...cart];

  //     cart.map((item) => {
  //       if (item.id === newItem.id) {
  //         item.variantQuantity++;
  //         newCart = [...cart];
  //       } else {
  //         newCart = [...cart, newItem];
  //       }
  //     });

  //     setCart(newCart);

  //     const newCheckout = await updateCheckout(checkoutId, newCart);

  //     localStorage.setItem(
  //       "checkout_id",
  //       JSON.stringify([newCart, newCheckout])
  //     );
  //   }
  // }
  async function addToCart(newItem: any) {
    const checkout = await createCheckout(newItem.id, newItem.variantQuantity);
    console.log();

    if (cart.length === 0) {
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
    } else {
      let updatedCart = [...cart];
      cart.map((item) => {
        if (item.id === newItem.id) {
          item.variantQuantity++;
          updatedCart = [...cart];
        } else {
          const cartWithId = checkout.lines.edges.map((edge: any) => ({
            ...newItem,
            cartLineId: edge.node.id,
          }));
          updatedCart = [...cart, cartWithId[0]];
        }
      });

      setCart(updatedCart);

      const updatedCheckout = await updateCheckout(checkoutId, updatedCart);

      // setCheckoutURL(updatedCheckout.checkoutURL);

      // const updatedCartWithIds = updatedCheckout.lines.edges.map(
      //   (edge: any) => ({
      //     ...updatedCart.find((item) => item.id === edge.node.merchandise.id),
      //     cartLineId: edge.node.id,
      //   })
      // );

      localStorage.setItem(
        "checkout_id",
        JSON.stringify({
          cart: updatedCart,
          id: updatedCheckout.id,
          checkoutUrl: updatedCheckout.checkoutUrl,
        })
      );
    }
  }

  async function removeCartProduct(itemToRemove: CartProduct) {
    const updatedCart = cart.filter((item) => item.id !== itemToRemove.id);
    setCart(updatedCart);

    const newCheckout = await updateCheckout(checkoutId, updatedCart);

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
