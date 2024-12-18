"use client";

import { useState } from "react";
import {
  useConsent,
  ConsentBanner,
  ConsentOptions,
  ConsentProvider,
} from "react-hook-consent";
import "react-hook-consent/dist/styles/style.css";

export function CookieBanner() {
  const { toggleBanner } = useConsent();
  const [consent, setConsent] = useState(true);
  {
    consent ? () => toggleBanner() : setConsent(false);
  }

  const consentOptions: ConsentOptions = {
    services: [
      {
        id: "myid",
        name: "Essential cookies",
        description:
          "Essential cookies are those strictly necessary to operate our site or allow you to access the content and services requested. This type of cookie cannot be disabled, as this would compromise the functioning of our site or the use of its contents and services. If you do not wish to install this type of cookie on your device, you are advised not to use our site",
        scripts: [],
        mandatory: true,
      },
      {
        id: "myid2",
        name: "Functional cookies",
        description:
          "Functional cookies are used to enable specific site features as well as a number of options (e.g. preferred language, products selected for purchase) in order to improve the service provided. By disabling this type of cookie, certain services or functions of our site may not be available or may not function properly, and you may be forced to modify or manually enter certain information or preferences each time you visit our site.",
        scripts: [],
      },
      {
        id: "myid3",
        name: "Analytical cookies",
        description:
          "Analytical cookies, including third party analytical cookies, help us understand how you navigate our site. These cookies do not contain any information about your identity or any personal data. Information is processed in an aggregated and anonymous way.",
        scripts: [],
      },
      {
        id: "myid4",
        name: "Advertising cookies",
        description:
          "Advertising (or “Profiling”) cookies, including those from third parties, are cookies aimed at creating user profiles and are used to display advertisements based on your preferences when browsing the web.",
        scripts: [],
      },
    ],
    theme: "light",
  };

  return (
    <ConsentProvider options={consentOptions}>
      <ConsentBanner
        settings={{
          hidden: false,
          label: "Decide",
          modal: { title: "Cookies" },
        }}
        decline={{ label: "No", hidden: true }}
        approve={{ label: "That's ok" }}
      >
        <div className="flex text-2xl lg:3xl">
          Cookies improve your experience
        </div>
        <p>
          We use cookies and similar technologies to give you a personalised
          shopping experience, personalised advertising and to analyse our web
          traffic. Click ‘That's ok' if you'd like to allow all cookies.
          Alternatively, you can choose which types of cookies you'd like to
          accept or disable by clicking 'Let me choose' below. For more
          information, please see our
        </p>
      </ConsentBanner>
    </ConsentProvider>
  );
}
