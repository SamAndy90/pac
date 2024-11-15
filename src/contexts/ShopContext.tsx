"use client";

// import { useAddToCart, useCreateCart } from "@/lib/data-fetchers/hooks";
import { GET_CART_QUERY } from "@/lib/data-fetchers/queries";
import {
  cartCreate,
  cartLinesAdd,
  cartLinesRemove,
  cartLinesUpdate,
} from "@/lib/data-fetchers/shopify/products";
import { Cart, CartItem } from "@/types";
import { useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";

export type TShopContext = {
  cartId: string;
  setCartId: (v: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (v: boolean) => void;
  // cart: CartItem[];
};

const defaultShopValues: TShopContext = {
  cartId: "",
  setCartId: () => {},
  isCartOpen: false,
  setIsCartOpen: () => {},
  // cart: [],
};

const ShopContext = createContext<TShopContext>(defaultShopValues);

export type ShopProviderProps = {
  children?: React.ReactNode;
};

export function ShopProvider(props: ShopProviderProps) {
  const { children } = props;
  // const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  // const [checkoutId, setCheckoutId] = useState<string>("");
  const [cartId, setCartId] = useState<string>("");
  // const [checkoutURL, setCheckoutURL] = useState<string>("");

  // useEffect(() => {
  //   if (localStorage.checkout_id) {
  //     const storedCheckout = JSON.parse(localStorage.checkout_id);
  //     setCart(storedCheckout.cart);
  //     setCheckoutId(storedCheckout.id);
  //     setCheckoutURL(storedCheckout.checkoutUrl);
  //   }
  // }, []);

  useEffect(() => {
    if (localStorage.cart_id) {
      const id = JSON.parse(localStorage.cart_id);
      setCartId(id);
    }
  }, []);

  // async function addToCart(newItem: CartItem) {
  //   if (cart.length === 0) {
  //     const checkout = await cartCreate(
  //       newItem.merchandiseId,
  //       newItem.variantQuantity
  //     );
  //     const cartWithId = checkout.lines.edges.map((edge: any) => ({
  //       ...newItem,
  //       cartLineId: edge.node.id,
  //     }));

  //     setCart(cartWithId);
  //     setCheckoutId(checkout.id);
  //     setCheckoutURL(checkout.checkoutUrl);

  //     localStorage.setItem(
  //       "checkout_id",
  //       JSON.stringify({
  //         cart: cartWithId,
  //         id: checkout.id,
  //         checkoutUrl: checkout.checkoutUrl,
  //       })
  //     );
  //     console.log("Cart created successfully");
  //   } else {
  //     let updatedCart;

  //     const existingItem = cart.find(
  //       (item) => item.merchandiseId === newItem.merchandiseId
  //     );
  //     if (existingItem) {
  //       updatedCart = cart.map((item) =>
  //         item.merchandiseId === newItem.merchandiseId
  //           ? { ...item, variantQuantity: item.variantQuantity + 1 }
  //           : item
  //       );

  //       await cartLinesUpdate(checkoutId, updatedCart);

  //       console.log("Cart updated successfully");
  //     } else {
  //       const response = await cartLinesAdd(checkoutId, [
  //         {
  //           merchandiseId: newItem.merchandiseId,
  //           quantity: newItem.variantQuantity,
  //         },
  //       ]);

  //       updatedCart = [
  //         ...cart,
  //         {
  //           ...newItem,
  //           cartLineId: response.lines.edges[0].node.id,
  //         },
  //       ];

  //       console.log("New line added successfully");
  //     }

  //     setCart(updatedCart);

  //     localStorage.setItem(
  //       "checkout_id",
  //       JSON.stringify({
  //         cart: updatedCart,
  //         id: checkoutId,
  //         checkoutUrl: checkoutURL,
  //       })
  //     );
  //   }
  // }

  // async function removeFromCart(item: CartItem) {
  //   if (!item.cartLineId) return;

  //   const updatedCart = [...cart].filter(
  //     (i) => i.merchandiseId !== item.merchandiseId
  //   );
  //   setCart(updatedCart);

  //   await cartLinesRemove(checkoutId, [item.cartLineId]);

  //   localStorage.setItem(
  //     "checkout_id",
  //     JSON.stringify({
  //       cart: updatedCart,
  //       id: checkoutId,
  //       checkoutUrl: checkoutURL,
  //     })
  //   );
  // }

  // async function addProductToCart(merchandiseId: string) {
  //   if (!cartId) {
  //     const { createCart } = useCreateCart();
  //     const cart = await createCart([
  //       { quantity: 1, variantId: merchandiseId },
  //     ]);

  //     if (cart) {
  //       setCartId(cart.cartId);
  //       localStorage.setItem("cart_id", JSON.stringify(cart.cartId));
  //     }
  //   } else {
  //     const { data } = useQuery<{ cart: Cart }>(GET_CART_QUERY, {
  //       variables: {
  //         cartId,
  //       },
  //     });
  //     const lines = data?.cart.lines.edges;

  //     const isInCart = lines?.some(
  //       (line) => line.node.merchandise.id === merchandiseId
  //     );

  //     if (isInCart) {
  //       console.log("Merchandise is in the cart");
  //     } else {
  //       const { addToCart } = useAddToCart();
  //       await addToCart(cartId, [{ quantity: 1, variantId: merchandiseId }]);
  //     }
  //   }
  // }

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
