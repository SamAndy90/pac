import imageUrlBuilder from "@sanity/image-url";

import { type ClassValue, clsx } from "clsx";
import { client } from "../../sanity/lib/client";
import { twMerge } from "tailwind-merge";
import { Portrait } from "@/types";

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
