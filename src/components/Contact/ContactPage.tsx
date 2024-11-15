import { ReactNode } from "react";
import ContactDetails from "./ContactDetails";
import Informing from "./Informing";

const ContactTemplateComponents: {
  [key: string]: (data: any) => ReactNode;
} = {
  contactdetails: (data: any) => <ContactDetails data={data} />,
  informing: (data: any) => <Informing data={data} />,
} as const;

type ContactPageProps = {
  data: [any];
};

export default function ContactPage({ data }: ContactPageProps) {
  let Sections: any = [] as ReactNode[];

  Sections = data?.map((section: any) => {
    if (ContactTemplateComponents[section._type]) {
      return ContactTemplateComponents[section._type](section);
    }
  });

  return <>{...Sections}</>;
}
