import { gql } from "@apollo/client";
import client from "../client/shopifyClient";

// TODO: Review this code with product owners to ensure scalablity

async function fetchProducts() {
  const GET_PRODUCTS = gql`
    query {
      products(first: 100) {
        edges {
          node {
            id
            title
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  transformedSrc
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const { data } = await client.query({
      query: GET_PRODUCTS,
    });
    return data.products.edges.map((edge: any) => {
      const product = edge.node;
      // Extracting the first image URL if available
      const imageUrl =
        product.images.edges.length > 0
          ? product.images.edges[0].node.transformedSrc
          : null;
      // Returning the product data along with image URL
      return { ...product, imageUrl };
    });
  } catch (error) {
    return [];
  }
}

export default fetchProducts;
