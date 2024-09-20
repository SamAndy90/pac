import { SanityDocument } from "next-sanity";
import { sanityFetch } from "../../../../sanity/lib/fetch";

export async function getData(query: string) {
  return await sanityFetch<SanityDocument[]>({
    query,
  });
}
