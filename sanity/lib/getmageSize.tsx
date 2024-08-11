import { client } from "./client";

interface ImageSize {
  width: number;
  height: number;
}

async function getImageSize(imageRef: string): Promise<ImageSize> {
  try {
    const asset = await client.getDocument(imageRef);
    if (asset && asset.metadata && asset.metadata.dimensions) {
      const { width, height } = asset.metadata.dimensions;
      return { width, height };
    } else {
      throw new Error("Unable to fetch image metadata");
    }
  } catch (error) {
    console.error("Error fetching image size:", error);
    throw error;
  }
}

export default getImageSize;
