import { ReactNode } from "react";
import ContactDetails from "./ContactDetails";

const ContactTemplateComponents: {
  [key: string]: (data: any) => ReactNode;
} = {
  contactdetails: (data: any) => <ContactDetails data={data} />,
} as const;

type ContactTemplateProps = {
  data: [any];
};

export default function ContactTemplate({ data }: ContactTemplateProps) {
  let Sections: any = [] as ReactNode[];

  Sections = data?.map((section: any) => {
    if (ContactTemplateComponents[section._type]) {
      return ContactTemplateComponents[section._type](section);
    }
  });

  return <>{...Sections}</>;
}
