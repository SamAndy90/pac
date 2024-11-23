"use client";

import { PropsWithChildren } from "react";
import ApolloProviderComp from "./ApolloProviderComp";
import { ShopProvider } from "./ShopContext";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ApolloProviderComp>
      <ShopProvider>{children}</ShopProvider>
    </ApolloProviderComp>
  );
}
