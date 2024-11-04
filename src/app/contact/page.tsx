import { Loader } from "@/common";
import ContactTemplate from "@/components/Contact/ContactTemplate";
import { getData } from "@/lib/data-fetchers/sanity";
import { Suspense } from "react";

export default async function ContactPage() {
  const data = await getData(`*[_type == "page" && title == "Contact"]`);
  if (
    !data ||
    data.length === 0 ||
    !data[0]?.contacttemplatesections?.sections
  ) {
    return (
      <div className={"text-center text-2xl mt-28 text-pka_blue"}>
        Content not found
      </div>
    );
  }
  const sections = data[0]?.contacttemplatesections?.sections;

  return (
    <Suspense fallback={<Loader />}>
      <ContactTemplate data={sections} />
    </Suspense>
  );
}
