import BannerComponent from "@/components/product/BannerComponent";
import ProductListing from "@/components/product/ProductListing";
import { urlFor } from "@/lib/utils";
import { SanityDocument } from "next-sanity";
import { sanityFetch } from "../../../sanity/lib/fetch";

async function getData() {
  const fetchData = await sanityFetch<SanityDocument[]>({
    query: `*[_type == "page" && title == "Shop"]`,
  });
  return fetchData;
}

const Product = async () => {
  const data = await getData();
  if (!data) return null;

  const dataItem = data[0];

  const section0 = dataItem?.sections[0];

  return (
    <div className=" w-full mx-auto lg:mt-40">
      <BannerComponent data={section0} />
      <ProductListing />
    </div>
  );
};

export default Product;
