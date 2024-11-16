import ShopPage from "@/components/Shop/ShopPage";
import { getShopifyProducts } from "@/lib/data-fetchers/shopify/products";

type ShopTemplateProps = {
  data: any;
  title: string;
};

export async function ShopTemplate({ data, title }: ShopTemplateProps) {
  if (!data || !data?.shoptemplatesections?.sections) {
    return (
      <div
        className={
          "font-thunder tracking-wider text-pka_blue uppercase text-3xl h-screen flex items-center justify-center"
        }
      >
        <p>Content not found</p>
      </div>
    );
  }
  const sections = data?.shoptemplatesections?.sections;

  const shopifyProducts = await getShopifyProducts();

  return (
    <ShopPage data={sections} shopifyProducts={shopifyProducts} title={title} />
  );
}
