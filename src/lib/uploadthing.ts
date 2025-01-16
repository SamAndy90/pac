import { generateUploadDropzone } from "@uploadthing/react";

import type { OurFileRouter } from "@/app/(pka-app)/api/uploadthing/core";

export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
