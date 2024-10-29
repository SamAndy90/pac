import { gql } from "@apollo/client";
import client from "@/lib/shopifyClient";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL!;
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

// TODO: Review this code with product owners to ensure scalablity

export async function getShopifyProducts() {
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

export async function ShopifyData(query: string) {
  const URL = `https://${domain}/api/2024-10/graphql.json`;
  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    return await fetch(URL, options).then((res) => res.json());
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Error fetching Shopify data"
    );
  }
}

export async function getShopifyAllProducts() {
  const query = `
  {
    products(first: 20) {
      edges {
        node {
          id
          handle
          title
          description
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 1){
            edges{
              node{
                altText
                url
              }
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query);

  return response.data.products.edges ? response.data.products.edges : [];
}

export async function getShopifyProductById(id: string) {
  const query = `
  {
    product(id:"${id}") {
      id
      title
      description
      options {
        id
        name
        optionValues {
          name
        }
      }
      variants (first: 20) {
        edges {
          node {
            id
            price{
              amount
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
        }
      }
      images(first: 10){
        edges{
          node{
            id
            url
            altText
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query);

  return response.data.product ? response.data.product : null;
}

export async function createCheckout(id: string, quantity: number) {
  const query = `
    mutation {
      cartCreate(input: {
        lines: [
          {
            merchandiseId: "${id}"
            quantity: ${quantity}
          }
        ]
      }) {
        cart {
          id
          checkoutUrl
          lines(first: 5) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                    }
                    price {
                      amount
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }`;

  const res = await ShopifyData(query);

  return res.data.cartCreate.cart ? res.data.cartCreate.cart : [];
}

export async function updateCheckout(id: string, lineItems: any[]) {
  const lineItemsObject = lineItems.map((item) => {
    return `
      {
        variantId: ${item.id},
        quantity: ${item.quantity}
      }`;
  });
  const query = `
    mutation {
      cartLinesUpdate(
        cartId: "${id}"", 
        lines: ${lineItemsObject}
      ) {
        cart {
          id
          checkoutUrl
          lines(first: 5) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }`;

  const res = await ShopifyData(query);

  return res.data.cartLinesUpdate.cart ? res.data.cartLinesUpdate.cart : [];
}

export async function getProductsByCollection(handle: string) {
  const query = `{
    collection(handle: "contest-test") {
      title
      product(id:"${handle}") {
        id
        title
        description
        options {
          id
          name
          optionValues {
            name
          }
        }
        variants (first: 20) {
          edges {
            node {
              id
              price{
                amount
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
          }
        }
        images(first: 10){
          edges{
            node{
              id
              url
              altText
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query);

  return response.data.product ? response.data.product : null;
}
