import type { Metadata } from "next";
import {
  Londrina_Solid,
  Inter,
  Averia_Libre,
  Roboto,
  EB_Garamond,
} from "next/font/google";
import localFont from "next/font/local";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Banner from "@/components/AnnouncementBanner";
import Header from "@/components/navbar";
import Footer from "@/components/Footer";

import "keen-slider/keen-slider.min.css";

import { draftMode } from "next/headers";
import LiveVisualEditing from "@/components/LiveVisualEditing";

import Loader from "@/components/common/Loader";
import { Suspense } from "react";
import ApolloProviderComp from "@/components/ApolloProviderComp";
import StoreProvider from "@/components/StoreProvider";

const LondrinaSolid = Londrina_Solid({
  subsets: ["latin"],
  weight: ["900"],
  preload: false,
  variable: "--font-lodrina",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  preload: false,
  variable: "--font-inter",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: false,
  variable: "--font-garamond",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  preload: false,
  variable: "--font-roboto",
});

const averia = Averia_Libre({
  subsets: ["latin"],
  weight: ["700"],
  preload: false,
  variable: "--font-averia",
});

const Avenir = localFont({
  src: "./AvenirLTStd-Black.otf",
  display: "swap",
  preload: false,
  variable: "--font-avenir",
});

const AvenirBold = localFont({
  src: "./AvenirBold.otf",
  display: "swap",
  preload: false,
  variable: "--font-avenir-bold",
});

const AvenirThin = localFont({
  src: "./AvenirLTStd-Book.otf",
  display: "swap",
  preload: false,
  variable: "--font-avenir-thin",
});

const thunder = localFont({
  src: [
    {
      path: "../fonts/Thunder-LC.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Thunder-MediumLC.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Thunder-BoldLC.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Thunder-ExtraBoldLC.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-thunder-variable",
});

export const metadata: Metadata = {
  title: "Peace Keepers Adventure Co",
  description: "Peace Keepers Adventure Co",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${LondrinaSolid.variable} ${Avenir.variable} ${inter.variable} ${roboto.variable} ${garamond.variable} ${AvenirThin.variable} ${AvenirBold.variable} ${thunder.variable} ${averia.variable} relative bg-pka_background`}
        >
          <ApolloProviderComp>
            <StoreProvider>
              <Banner />

              <Header />
              <Suspense fallback={<Loader />}>
                <div className="mt-0 lg:mt-0 bg-none">{children}</div>
              </Suspense>

              <Footer />
              {draftMode().isEnabled && <LiveVisualEditing />}
            </StoreProvider>
          </ApolloProviderComp>
        </body>
      </html>
    </ClerkProvider>
  );
}
