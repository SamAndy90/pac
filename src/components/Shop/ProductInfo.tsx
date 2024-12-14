"use client";

import { Container, Title } from "@/common";
import { formatter } from "@/lib/utils";
import { FaRegImages } from "react-icons/fa6";
import { ImageSlider } from "./ImageSlider";
import { Button } from "../../common/UI/Button";
import { useShopContext } from "@/contexts/ShopContext";
import { Cart } from "@/types";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import client from "@/lib/shopifyClient";
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  GET_CART_QUERY,
} from "@/lib/data-fetchers/queries";
import { Option, USelectInput } from "@/common/Inputs/USelectInput";

export type ProductInfoProps = {
  product: any;
};

export default function ProductInfo({ product }: ProductInfoProps) {
  const { title, description, variants, priceRange, media } = product;
  const [variantIds, setVariantIds] = useState<string[]>([
    variants.edges[0].node.id,
  ]);
  const { cartId, setCartId } = useShopContext();

  const { data: cartData } = useQuery<{ cart: Cart }>(GET_CART_QUERY, {
    variables: {
      cartId,
    },
    skip: !cartId,
  });

  const [createCartMutation] = useMutation(CART_CREATE_MUTATION, {
    onCompleted() {
      client.refetchQueries({
        include: ["getCart"],
      });
    },
  });

  const [addToCartMutation] = useMutation(CART_LINES_ADD_MUTATION, {
    onCompleted() {
      client.refetchQueries({
        include: ["getCart"],
      });
    },
  });

  const [updateCartLinesMutation] = useMutation(CART_LINES_UPDATE_MUTATION, {
    onCompleted() {
      client.refetchQueries({
        include: ["getCart"],
      });
    },
  });

  const createCart = async (
    items: { quantity: number; variantId: string }[] = []
  ) => {
    try {
      const response = await createCartMutation({
        variables: {
          lines: items.map((item) => ({
            quantity: item.quantity,
            merchandiseId: item.variantId,
          })),
        },
      });

      if (response.data.cartCreate.userErrors.length) {
        console.error("User error:", response.data.cartCreate.userErrors);
        return null;
      }

      const cartId = response.data.cartCreate.cart.id;
      console.log("Cart created successfully:", cartId);

      return { cartId };
    } catch (error) {
      console.error("Error creating cart:", error);
      return null;
    }
  };

  const addToCart = async (
    cartId: string,
    items: { quantity: number; variantId: string }[] = []
  ) => {
    try {
      const response = await addToCartMutation({
        variables: {
          cartId,
          lines: items.map((item) => ({
            quantity: item.quantity,
            merchandiseId: item.variantId,
          })),
        },
      });

      if (response.data.cartLinesAdd.userErrors.length) {
        console.error("User error:", response.data.cartLinesAdd.userErrors);
        return null;
      }

      // Отримати оновлені дані кошика
      const updatedCart = response.data.cartLinesAdd.cart;
      console.log("Product added to cart successfully:", updatedCart);

      return updatedCart;
    } catch (error) {
      console.error("Error adding product to cart:", error);
      return null;
    }
  };

  async function addProductToCart(merchandiseIds: string[]) {
    if (!cartId) {
      const cart = await createCart(
        merchandiseIds.map((id) => ({ quantity: 1, variantId: id }))
      );

      if (cart) {
        setCartId(cart.cartId);
        localStorage.setItem("cart_id", JSON.stringify(cart.cartId));
        setVariantIds([]);
      }
    } else {
      const lines = cartData?.cart.lines.edges;

      const existingItems = new Map(
        lines?.map((line) => [line.node.merchandise.id, line])
      );

      const updatedLines = [];
      const newLines = [];

      for (const id of merchandiseIds) {
        if (existingItems.has(id)) {
          const existingLine = existingItems.get(id)!;
          updatedLines.push({
            id: existingLine.node.id,
            merchandiseId: existingLine.node.merchandise.id,
            quantity: existingLine.node.quantity + 1,
          });
        } else {
          newLines.push({ quantity: 1, variantId: id });
        }
      }

      if (updatedLines.length > 0) {
        await updateCartLinesMutation({
          variables: {
            cartId,
            lines: updatedLines,
          },
        });
      }

      if (newLines.length > 0) {
        await addToCart(cartId, newLines);
      }
      setVariantIds([]);
    }
  }

  const images =
    media.edges
      ?.filter((el: any) => el.node.image?.url)
      .map((el: any) => ({
        id: el.node.image.id,
        src: el.node.image.url,
        alt: el.node.image.altText || "Product Image",
      })) || [];

  let allVariants: Option[] =
    variants.edges
      .filter((v: any) => v.node.availableForSale)
      .map((v: any) => {
        return {
          label: v.node.title,
          value: v.node.id,
        };
      }) || [];

  return (
    <section className={"my-28 lg:my-32"}>
      <Container>
        <div className={"flex w-full flex-col gap-y-12 md:flex-row md:gap-x-6"}>
          <div className={"md:w-1/2"}>
            {images.length ? (
              <ImageSlider images={images} />
            ) : (
              <div
                className={
                  "bg-pka_green_light mx-[5%] sm:mx-[10%] aspect-[7/9] rounded-2xl flex items-center justify-center"
                }
              >
                <FaRegImages className={"text-pka_blue2 size-20"} />
              </div>
            )}
          </div>
          <div className={"flex-1 shrink-0 py-2"}>
            <Title>{title}</Title>
            <p className={"text-pka_blue2 flex-1 lg:flex-initial mb-6"}>
              {description}
            </p>
            {variants.edges.length > 1 && (
              <div className={"mb-8 lg:mb-12"}>
                <USelectInput
                  options={allVariants}
                  multiple={true}
                  value={variantIds ?? []}
                  onChange={setVariantIds}
                />
              </div>
            )}
            <div
              className={"flex flex-col gap-y-3 sm:items-start justify-between"}
            >
              <div
                className={
                  "text-4xl text-pka_blue font-thunder font-medium leading-none pt-1.5 text-nowrap"
                }
              >
                {formatter.format(priceRange.minVariantPrice.amount)} CAD
              </div>
              <Button
                colorVariant={"primary"}
                fullWidth
                size={"small"}
                className={"border-pka_blue2 pb-1.5 sm:w-auto"}
                onClick={() => addProductToCart(variantIds)}
              >
                Enter to Win
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
