import MercesTemplateSubComp from "./sub-comp/MercesTemplateSubComp";

type Props = {
  sections: any;
  title: string;
};

const MercesTemplate = ({ sections, title }: Props) => {
  return <MercesTemplateSubComp sections={sections} title={title} />;
};

export default MercesTemplate;
