// Example Next.js Page
"use client";
import React, { useEffect, useState } from "react";
import { getShopifyProducts } from "@/lib/data-fetchers/shopify/products";
import { useUser } from "@clerk/nextjs";

// Add comment for testing from new account
function ProductsPage() {
  const [products, setProducts] = useState([]);
  const { isLoaded, isSignedIn, user } = useUser();

  // Assuming 'org:member' is the role you're checking for
  const userRole = user?.organizationMemberships[0]?.role;
  useEffect(() => {
    async function getProducts() {
      const products = await getShopifyProducts();
      setProducts(products);
    }
    getProducts();
  }, []);

  return (
    <div className="flex flex-col mt-7">
      <h1 className="text-center text-2xl font-bold">Products</h1>
      <div className="flex flex-col lg:flex-row gap-10">
        <div>
          {products.map((product: any) => (
            <div className="flex flex-col gap-3" key={product.node.id}>
              {product.node.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  style={{ maxWidth: "200px" }}
                />
              ) : (
                <div
                  style={{
                    width: "200px",
                    height: "200px",
                    backgroundColor: "lightgray",
                  }}
                >
                  {/* Placeholder content */}
                  No Image Available
                </div>
              )}
              <h2>{product.title}</h2>
              {/* <p>{product.description}</p> */}
              <p>Price: {product.node.priceRange.minVariantPrice.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
