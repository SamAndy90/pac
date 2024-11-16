import { PropsWithChildren } from "react";
import { AnnouncementProvider } from "./Announcement";
import ApolloProviderComp from "./ApolloProviderComp";
import { ShopProvider } from "./ShopContext";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ApolloProviderComp>
      <ShopProvider>
        <AnnouncementProvider>{children}</AnnouncementProvider>
      </ShopProvider>
    </ApolloProviderComp>
  );
}
