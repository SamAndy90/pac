import AncillarySubscription from "./AncillarySubscription";

type Props = {
  title: string;
  sections: any;
};

const Ancillary = async ({ title, sections }: Props) => {
  return <AncillarySubscription sections={sections} pageTitle={title} />;
};

export default Ancillary;
