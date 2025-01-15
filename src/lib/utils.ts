import imageUrlBuilder from "@sanity/image-url";

import { type ClassValue, clsx } from "clsx";
import { client } from "../../sanity/lib/client";
import { twMerge } from "tailwind-merge";
import { Portrait, Video } from "@/types";
import { getFileAsset } from "@sanity/asset-utils";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const builder = imageUrlBuilder(client);

export function ImgUrl(source: Portrait) {
  return builder.image(source.asset._ref)?.url();
}

export const formatDate = (isoDateString: string) => {
  const date = new Date(isoDateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };
  return date
    .toLocaleDateString("en-GB", options)
    .replace(/(\d+)\s(\w+)\s(\d+)/, "$1 $2, $3");
};

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export function formatPhoneNumber(phoneNumber: string) {
  return phoneNumber.replace(/\D/g, "");
}

export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  return `http://localhost:3000`;
};

export const getVideoURL = (source?: Video) => {
  return source
    ? getFileAsset(source.asset._ref, {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      }).url
    : undefined;
};
