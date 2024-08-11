"use client";
import Loader from "@/components/common/Loader";
import AddToCartButton from "@/components/shop/AddToCartButton";
import ImageDisplay from "@/components/shop/ImageDisplay";
import { CartItem } from "@/lib/store/slices/cartSlice";
import { gql, useQuery } from "@apollo/client";
const GET_PRODUCT_BY_ID = gql`
  query Product($productId: ID) {
    product(id: $productId) {
      variants(first: 10) {
        edges {
          node {
            id
          }
        }
      }
      id
      images(first: 10) {
        edges {
          node {
            url
          }
        }
      }
      title
      description
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }
`;

type Product = {
  id: string;
  title: string;
  description: string;
  variants: {
    edges: {
      node: {
        id: string;
      };
    }[];
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: {
      node: {
        url: string;
      };
    }[];
  };
};

type ProductDetailProps = {
  params: { id: string };
};

const page = ({ params }: ProductDetailProps) => {
  const { data, loading, error } = useQuery<{ product: Product }>(
    GET_PRODUCT_BY_ID,
    {
      variables: {
        productId: `gid://shopify/Product/${params.id}`,
      },
    }
  );

  if (loading) {
    return (
      <div className="flex justify-center m-auto p-24 lg:p-36">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error loading product details.</div>;
  }

  const varientId = data?.product.variants.edges[0].node.id || "";
  const item: CartItem = {
    id: varientId || "",
    title: data?.product.title || "",
    imageUrl: data?.product.images.edges[0].node.url || "",
    quantity: 1,
    price: parseFloat(data?.product.priceRange.minVariantPrice.amount || "0"),
  };
  const imageUrls =
    data?.product.images.edges.map((image) => image.node.url) || [];
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const amount = parseInt(
    data?.product.priceRange.minVariantPrice.amount ?? "0"
  );

  return (
    <div className="flex justify-center mt-16 w-full overflow-hidden">
      <div className="flex w-full justify-center md:mx-[150px] xl:mx-[180px] 2xl:mx-[220px]">
        <div className="flex mt-[70px] md:gap-[40px] xl:gap-[55px] 2xl:gap-[79px] flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex justify-center mb-8">
            <ImageDisplay imagesUrl={imageUrls} />
          </div>
          <div className="flex flex-col lg:w-full md:w-1/2">
            <div className="mb-6 flex flex-col pb-6 mx-8 md:mx-0 items-center md:items-start">
              <h1 className="justify-center md:justify-start mb-2 xl:text-3xl text-center lg:text-left text-3xl 2xl:text-[42px] leading-[48px] font-inter text-balance text-black font-medium">
                {data?.product.title}
              </h1>
              {data?.product.priceRange.minVariantPrice.amount ? (
                <div className="md:mr-auto my-2 bg-[#33455A] w-auto px-2 rounded-[14px] text-justify flex h-[40px] items-center justify-center font-inter text-base text-white">
                  <p>
                    {USDollar.format(amount) +
                      " " +
                      data?.product.priceRange.minVariantPrice.currencyCode}
                  </p>
                </div>
              ) : (
                ""
              )}
              <div className="border border-black w-full my-[26px]"></div>
              <span className="mx-2 md:mx-0 md:text-sm 2xl:text-2xl xl:text-base text-[#33455A] font-avenirThin text-justify ">
                {data?.product.description}
              </span>
              <div className="mb-[103px] flex mt-[26px] justify-center m-auto md:justify-start w-full">
                <AddToCartButton item={item} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
