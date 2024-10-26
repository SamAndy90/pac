import { Container } from "@/common";
import ProductInfo from "@/components/Shop/ProductInfo";
import { getShopifyProductById } from "@/lib/data-fetchers/shopify/products";

export type ProductPageProps = {
  params: { productId: string };
  searchParams: { id: string };
};

export default async function ProductPage({
  params: { productId: handle },
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
  // console.log({ p: product });

  return <ProductInfo product={product} />;
}