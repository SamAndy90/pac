import imageUrlBuilder from "@sanity/image-url";

import { type ClassValue, clsx } from "clsx";
import { client } from "../../sanity/lib/client";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const builder = imageUrlBuilder(client);
export function urlFor(source: string) {
  return builder.image(source);
}

export function ImgUrl(source: string) {
  return urlFor(source)?.url();
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
