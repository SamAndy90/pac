"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type TShopContext = {
  cartId: string;
  setCartId: (v: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (v: boolean) => void;
};

const defaultShopValues: TShopContext = {
  cartId: "",
  setCartId: () => {},
  isCartOpen: false,
  setIsCartOpen: () => {},
};

const ShopContext = createContext<TShopContext>(defaultShopValues);

export type ShopProviderProps = {
  children?: React.ReactNode;
};

export function ShopProvider(props: ShopProviderProps) {
  const { children } = props;
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [cartId, setCartId] = useState<string>("");

  useEffect(() => {
    if (localStorage.cart_id) {
      const id = JSON.parse(localStorage.cart_id);
      setCartId(id);
    }
  }, []);

  return (
    <ShopContext.Provider
      value={{
        cartId,
        setCartId,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShopContext() {
  return useContext(ShopContext);
}
