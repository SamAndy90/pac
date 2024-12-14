import { RestrictionContent } from "@/components/RestrictionContent";
import { getData } from "@/lib/data-fetchers/sanity";
import { ImgUrl } from "@/lib/utils";
import { Portrait } from "@/types";
import Image from "next/image";

export type AgeRestrictionData = {
  title: string;
  message: string;
  logo: Portrait;
  background: Portrait;
};

export default async function AgeRestrictionPage() {
  const data = await getData<AgeRestrictionData>(
    `*[_type == "age_restriction"]`
  );

  if (!data?.length) {
    return null;
  }

  return (
    <section
      className={
        "relative min-h-screen flex items-center justify-center bg-pka_blue"
      }
    >
      {data[0].background && (
        <Image
          src={ImgUrl(data[0].background)}
          alt={"Background image"}
          fill
          className={"object-cover"}
        />
      )}
      <div className={"fixed inset-0 backdrop-blur"}></div>
      <div
        className={
          "bg-pka_background relative rounded-xl px-3 py-4 w-full max-h-full max-w-[calc(100%-24px)] md:max-w-screen-sm overflow-y-auto overflow-x-hidden"
        }
      >
        <RestrictionContent data={data[0]} />
      </div>
    </section>
  );
}
