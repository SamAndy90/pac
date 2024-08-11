"use client";

import fetchProducts from "@/app/api/fetechProduct";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import AddProductCard from "./AddProductCard";
import ProductCard from "./ProductCard";
import PaginationControl from "./PaginationControl"; // Adjust the import based on your project structure

type Props = {};

const ProductListing = (props: Props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      const products = await fetchProducts();
      setProducts(products);
      setLoading(false);
    }
    getProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formattedPrice = (amount: any) => {
    return amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="w-full py-[29px]">
      {loading && (
        <div className="flex justify-center mx-auto">
          <Loader />
        </div>
      )}
      {!loading && (
        <>
          <div className="mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] px-2 place-items-center">
            {currentProducts.map((product: any) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={`${
                  product.priceRange?.minVariantPrice?.currencyCode
                } ${formattedPrice(
                  +product.priceRange?.minVariantPrice?.amount
                )}`}
                imageUrl={product?.imageUrl || ""}
              />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <PaginationControl
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
          <div className="mx-auto w-full grid mt-[30px] px-2 place-items-center">
            <AddProductCard />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductListing;
