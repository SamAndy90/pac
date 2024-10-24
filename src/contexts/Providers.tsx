import { PropsWithChildren } from "react";
import { SplashProvider } from "./Splash";
import { AnnouncementProvider } from "./Announcement";
import StoreProvider from "./StoreProvider";
import ApolloProviderComp from "./ApolloProviderComp";
import { ShopProvider } from "./ShopContext";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ApolloProviderComp>
      <StoreProvider>
        <ShopProvider>
          <SplashProvider>
            <AnnouncementProvider>{children}</AnnouncementProvider>
          </SplashProvider>
        </ShopProvider>
      </StoreProvider>
    </ApolloProviderComp>
  );
}
