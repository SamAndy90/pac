import { SanityDocument } from "next-sanity";

import { sanityFetch } from "../../sanity/lib/fetch";
import FooterSubscribeComp from "./FooterSubscribeComp";

async function getData() {
  const fetchData = await sanityFetch<SanityDocument[]>({
    query: `*[_type == 'newfooter']`,
  });

  const filteredData = fetchData.filter((item: any) => {
    if (
      item["generalLinks"] !== undefined &&
      item["socialLinks"] !== undefined
    ) {
      return true;
    }

    return false;
  });

  return filteredData;
}

async function getFooterLogo() {
  const fetchData = await sanityFetch<SanityDocument[]>({
    query: `*[_type == 'logo']`,
  });

  return fetchData;
}

export default async function Footer() {
  await getData();
  const data = await getData();
  const logo = await getFooterLogo();

  if (data.length > 0 && !data[0])
    return (
      <div className="flex justify-center mt-5 font-bold">
        No Footer Found, If you want to add or create footer then go to CMS and
        content on New Footer
      </div>
    );

  return <FooterSubscribeComp logo={logo} data={data[0]} />;
}
