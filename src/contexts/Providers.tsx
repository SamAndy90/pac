import { PropsWithChildren } from "react";
import { SplashProvider } from "./Splash";
import { AnnouncementProvider } from "./Announcement";
import StoreProvider from "./StoreProvider";
import ApolloProviderComp from "./ApolloProviderComp";

export function Providers({ children }: PropsWithChildren) {
  return (
    <ApolloProviderComp>
      <StoreProvider>
        <SplashProvider>
          <AnnouncementProvider>{children}</AnnouncementProvider>
        </SplashProvider>
      </StoreProvider>
    </ApolloProviderComp>
  );
}
