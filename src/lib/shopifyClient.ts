import { ApolloClient, InMemoryCache } from "@apollo/client";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL!;
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

const client = new ApolloClient({
  uri: `https://${domain}/api/2024-10/graphql.json`,
  headers: {
    "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  cache: new InMemoryCache(),
});

export default client;
