"use client";

import client from "@/lib/shopifyClient";
import { ApolloProvider } from "@apollo/client";
import { PropsWithChildren } from "react";

const ApolloProviderComp = (props: PropsWithChildren) => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};
export default ApolloProviderComp;
