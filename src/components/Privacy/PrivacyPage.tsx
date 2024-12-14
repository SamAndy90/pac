import { Fragment, ReactNode } from "react";
import { Privacy } from "./Privacy";

const PrivacyPageComponents: {
  [key: string]: (data: any) => ReactNode;
} = {
  privacy: (data: any) => <Privacy data={data} />,
} as const;

type PrivacyPageProps = {
  data: [any];
};

export default function PrivacyPage({ data }: PrivacyPageProps) {
  if (!data?.length) return null;

  let Sections: any = [] as ReactNode[];

  Sections = data?.map((section: any) => {
    if (PrivacyPageComponents[section._type]) {
      return (
        <Fragment key={section._key}>
          {PrivacyPageComponents[section._type](section)}
        </Fragment>
      );
    }
  });

  return <>{...Sections}</>;
}
