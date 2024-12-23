import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();
export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 6,
    },
  }).onUploadComplete(async () => {
    console.log("Completef");
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
