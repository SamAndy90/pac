const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL!;
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

export async function ShopifyData({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, any>;
}) {
  const URL = `https://${domain}/api/2024-10/graphql.json`;
  const options = {
    endpoint: URL,
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  };

  try {
    const response = await fetch(URL, options);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error(
      err instanceof Error ? err.message : "Error fetching Shopify data"
    );
  }
}

export async function getShopifyProducts() {
  const query = `
  {
    products(first: 100) {
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
          media(first: 1) {
            edges {
              node {
                ... on MediaImage {
                  image {
                    altText
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData({ query });

  return response.data.products.edges ? response.data.products.edges : [];
}

export async function getShopifyProductById(id: string) {
  const query = `
  {
    product(id:"${id}") {
      id
      title
      handle
      description
      variants (first: 250) {
        edges {
          node {
            id
            title
            availableForSale
            price{
              amount
            }
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
        }
      }
      media(first: 10) {
        edges {
          node {
            ... on MediaImage {
              image {
                id
                url
                altText
              }
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData({ query });

  return response.data?.product ? response.data.product : null;
}

export async function getCollection(handle: string) {
  const query = `query getCollection($handle: String!) {
      collection(handle: $handle) {
        title
        products(first: 100) {
          edges {
            node {
              id
              handle
              title
              description
              variants(first: 20) {
                edges {
                  node {
                    id
                    price {
                      amount
                    }
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              media(first: 10) {
                edges {
                  node {
                    ... on MediaImage {
                      image {
                        id
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`;

  const variables = { handle };

  const response = await ShopifyData({ query, variables });

  return response.data.collection || null;
}
