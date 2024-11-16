import { PropsWithChildren } from "react";
import { AnnouncementProvider } from "./Announcement";
import StoreProvider from "./StoreProvider";
import ApolloProviderComp from "./ApolloProviderComp";
import { ShopProvider } from "./ShopContext";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ApolloProviderComp>
      <StoreProvider>
        <ShopProvider>
          <AnnouncementProvider>{children}</AnnouncementProvider>
        </ShopProvider>
      </StoreProvider>
    </ApolloProviderComp>
  );
}
