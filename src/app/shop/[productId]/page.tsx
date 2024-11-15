import { Loader } from "@/common";
import ProductInfo from "@/components/Shop/ProductInfo";
import { getShopifyProductById } from "@/lib/data-fetchers/shopify/products";
import { Suspense } from "react";

export type ProductPageProps = {
  searchParams: { id: string };
};

export default async function ProductPage({
  searchParams: { id },
}: ProductPageProps) {
  const product = await getShopifyProductById(id);

  if (!product) {
    return (
      <section className={"min-h-screen flex items-center justify-center"}>
        <p className={"text-center text-xl text-pka_black"}>
          Unfortunately, there was an error. We will fix it as soon as possible
        </p>
      </section>
    );
  }

  return (
    // <Suspense fallback={<Loader />}>
    <ProductInfo product={product} />
    // </Suspense>
  );
}
