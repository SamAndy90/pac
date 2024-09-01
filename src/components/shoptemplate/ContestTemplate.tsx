import { SanityDocument } from "next-sanity";
import { sanityFetch } from "../../../sanity/lib/fetch";
import ContestTemplateSubComp from "./sub-comp/ContestTemplateSubComp";

type Props = {
  sections: any;
  title: string;
};

const getHappeningNowSection = async () => {
  const fetchData = await sanityFetch<SanityDocument[]>({
    query: `*[_type == "page" && title == "Homepage"]`,
  });

  const sections = fetchData[0].homepagetemplatesections.sections;

  const happeningNowSection = sections.find((sectionData: any) => {
    return sectionData._type === "page.happeningnow";
  });

  return happeningNowSection.cards;
};

const ContestTemplate = async ({ sections, title }: Props) => {
  const sectionsDataCard = await getHappeningNowSection();

  return (
    <ContestTemplateSubComp
      sections={sections}
      title={title}
      happeningnowSections={sectionsDataCard}
    />
  );
};

export default ContestTemplate;
