import { Container, Title } from "@/common";
import { formatter } from "@/lib/utils";
import Image from "next/image";
import { FaRegImages } from "react-icons/fa6";
import { ImageSlider } from "./ImageSlider";
import { NewButton } from "../ui/NewButton";

export type ProductInfoProps = {
  product: any;
};

export default function ProductInfo({ product }: ProductInfoProps) {
  const { id, title, description, options, priceRange, images } = product;

  const photos = images.edges?.map((i: any) => {
    if (!i.node.url) return;
    return {
      id: i.node.id,
      src: i.node.url,
      alt: i.node.altText,
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
            <p className={"text-pka_blue2 text-lg flex-1 mb-6"}>
              {description}
            </p>
            <div className={"flex items-center justify-between gap-x-2"}>
              <div
                className={
                  "text-4xl text-pka_blue font-thunder font-medium leading-none pt-1.5 text-nowrap"
                }
              >
                {formatter.format(priceRange.minVariantPrice.amount)} CAD
              </div>
              <NewButton
                colorVariant={"danger"}
                size={"small"}
                className={"border-pka_blue2 tracking-wider"}
              >
                Buy
              </NewButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
