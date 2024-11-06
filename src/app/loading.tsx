import { Loader } from "@/common/Loader";

export default function Loading() {
  return (
    <div className="h-[90vh] flex items-center justify-center">
      <Loader />
    </div>
  );
}
