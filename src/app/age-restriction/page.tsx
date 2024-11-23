import { Loader } from "@/common";
import { AgeRestriction } from "@/components/AgeRestriction";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <AgeRestriction />
    </Suspense>
  );
}
