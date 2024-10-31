"use client";

import { Container, Title } from "@/common";
import { formatter } from "@/lib/utils";
import { FaRegImages } from "react-icons/fa6";
import { ImageSlider } from "./ImageSlider";
import { NewButton } from "../ui/NewButton";
import { useShopContext } from "@/contexts/ShopContext";

export type ProductInfoProps = {
  product: any;
};

export default function ProductInfo({ product }: ProductInfoProps) {
  const { id, title, description, options, variants, priceRange, images } =
    product;

  const { cart, addToCart } = useShopContext();

  const photos = images.edges?.map((i: any) => {
    if (!i.node.url) return;
    return {
      id: i.node.id,
      src: i.node.url,
      alt: i.node.altText,
    };
  });

  const allVariantsOptions = variants.edges.map((v: any) => {
    return {
      id: v.node.id,
      title: title,
      image: photos[0],
      price: v.node.price.amount,
      variantQuantity: 1,
    };
  });

  return (
    <section className={"my-28 lg:my-32"}>
      <Container>
        <div className={"flex w-full flex-col gap-y-12 md:flex-row md:gap-x-6"}>
          <div className={"md:w-1/2"}>
            {photos.length ? (
              <ImageSlider images={photos} />
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
          <div className={"flex-1 shrink-0 flex gap-y-2 flex-col py-2"}>
            <Title>{title}</Title>
            <p className={"text-pka_blue2 text-lg flex-1 lg:flex-initial mb-6"}>
              {description}
            </p>
            <div
              className={
                "flex flex-col sm:flex-row gap-y-2 sm:items-center justify-between gap-x-2"
              }
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
                onClick={() => addToCart(allVariantsOptions[0])}
              >
                Add to cart
              </NewButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
