import { SanityDocument } from "next-sanity";
import { sanityFetch } from "../../../../sanity/lib/fetch";

type SanityResult<T> = SanityDocument & T;

export async function getData<T>(query: string): Promise<SanityResult<T>[]> {
  return await sanityFetch<SanityResult<T>[]>({
    query,
  });
}

export async function getSlugData<T>(query: string): Promise<SanityDocument> {
  return await sanityFetch<SanityDocument>({
    query,
  });
}
