import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL}`,
  headers: {
    "X-Shopify-Storefront-Access-Token":
      process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  cache: new InMemoryCache(),
});

export default client;
