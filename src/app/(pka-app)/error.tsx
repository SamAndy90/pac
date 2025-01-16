"use client";

import { Button } from "@/common/UI/Button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      className={
        "py-40 px-3 flex flex-col items-center gap-y-2 text-center text-red-500"
      }
    >
      <h2 className={"text-3xl font-thunder font-semibold tracking-wider"}>
        Something went wrong!
      </h2>
      <p className={"mb-5"}>
        <span className={"font-avenir uppercase"}>Error:</span> {error.message}
      </p>
      <Button fullWidth className={"sm:w-auto"} onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
