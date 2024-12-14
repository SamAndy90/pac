import ShopPage from "@/components/Shop/ShopPage";
import { getData } from "@/lib/data-fetchers/sanity";
import { getShopifyProducts } from "@/lib/data-fetchers/shopify/products";

export default async function Page() {
  const data = await getData(`*[_type == "page" && title == "Shop"]`);

  if (!data || data?.length === 0 || !data[0]?.shoptemplatesections?.sections) {
    return (
      <div className={"text-center text-2xl mt-24"}>Content not found</div>
    );
  }
  const sections = data[0]?.shoptemplatesections?.sections;

  const shopifyProducts = await getShopifyProducts();

  return <ShopPage data={sections} shopifyProducts={shopifyProducts} />;
}
