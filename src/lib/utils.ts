import imageUrlBuilder from "@sanity/image-url";

import { type ClassValue, clsx } from "clsx"
import { client } from "../../sanity/lib/client";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const builder = imageUrlBuilder(client);
export function urlFor(source: string) {
  return builder.image(source);
}

export function ImgUrl(source: string) {
  return urlFor(source)?.url()
}