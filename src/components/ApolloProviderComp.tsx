"use client";
import client from "@/app/client/shopifyClient";
import { ApolloProvider } from "@apollo/client";
import React, { PropsWithChildren } from "react";
type Props = {};
const ApolloProviderComp = (props: PropsWithChildren) => {
  return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};
export default ApolloProviderComp;
