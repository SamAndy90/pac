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
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import "keen-slider/keen-slider.min.css";

import { draftMode } from "next/headers";
import LiveVisualEditing from "@/components/LiveVisualEditing";

import { Loader } from "@/common/Loader";
import { Suspense } from "react";
import { IconDescriptor } from "next/dist/lib/metadata/types/metadata-types";
import Splash from "@/components/Splash";
import { Providers } from "@/contexts/Providers";

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
  src: "../fonts/AvenirLTStd-Black.otf",
  display: "swap",
  preload: false,
  variable: "--font-avenir",
});

const AvenirBold = localFont({
  src: "../fonts/AvenirBold.otf",
  display: "swap",
  preload: false,
  variable: "--font-avenir-bold",
});

const AvenirThin = localFont({
  src: "../fonts/AvenirLTStd-Book.otf",
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

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "Peace Keepers Adventure Co",
    template: "%s | Peace Keepers",
  },
  description: "Peace Keepers Adventure Co",
  icons: {
    icon: [
      {
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
    ],
    apple: {
      url: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    other: {
      rel: "mask-icon",
      url: "/safari-pinned-tab.svg",
      color: "#0A4A64",
      // because color is not supported by next metadata
    } as IconDescriptor,
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#ffffff",
  },
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
          <Providers>
            <Banner />
            <Splash />
            <div
              className={"flex min-h-screen flex-col h-full justify-between"}
            >
              <Header />
              <main className="flex-1">
                <Suspense fallback={<Loader />}>{children}</Suspense>
              </main>

              <Footer />
            </div>
            {draftMode().isEnabled && <LiveVisualEditing />}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
