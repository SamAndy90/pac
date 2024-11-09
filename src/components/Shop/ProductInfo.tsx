"use client";

import { Container, Title } from "@/common";
import { formatter } from "@/lib/utils";
import { FaRegImages } from "react-icons/fa6";
import { ImageSlider } from "./ImageSlider";
import { NewButton } from "../ui/NewButton";
import { useShopContext } from "@/contexts/ShopContext";
import { CartItem } from "@/types";
import SelectInput from "@/common/Inputs/SelectInput";
import { useState } from "react";
import { useRouter } from "next/navigation";

export type ProductInfoProps = {
  product: any;
};

export default function ProductInfo({ product }: ProductInfoProps) {
  const [variantId, setVariantId] = useState("");
  const { id, title, handle, description, variants, priceRange, media } =
    product;

  const router = useRouter();

  const { addToCart, checkoutURL } = useShopContext();

  const images =
    media.edges
      ?.filter((el: any) => el.node.image?.url)
      .map((el: any) => ({
        id: el.node.image.id,
        src: el.node.image.url,
        alt: el.node.image.altText || "Product Image",
      })) || [];

  const allVariantsOptions: CartItem[] = variants.edges
    .map((v: any) => {
      return {
        id,
        merchandiseId: v.node.id,
        title,
        handle,
        variantTitle: v.node.title,
        availableForSale: v.node.availableForSale,
        image: images[0],
        price: v.node.price.amount,
        variantQuantity: 1,
      };
    })
    .filter((v: CartItem) => v.availableForSale);

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
            <p className={"text-pka_blue2 text-lg flex-1 lg:flex-initial mb-6"}>
              {description}
            </p>
            <div className={"mb-8 lg:mb-12"}>
              <SelectInput
                list={allVariantsOptions.map((v) => ({
                  label: v.variantTitle,
                  value: v.merchandiseId,
                }))}
                setId={setVariantId}
              />
            </div>
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
              <NewButton
                colorVariant={"primary"}
                fullWidth
                size={"small"}
                className={"border-pka_blue2 tracking-wider pb-1.5 sm:w-auto"}
                onClick={() => {
                  addToCart(
                    allVariantsOptions.find(
                      (item) => item.merchandiseId === variantId
                    )!
                  );
                  router.push(checkoutURL);
                }}
              >
                Enter to Win
              </NewButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
