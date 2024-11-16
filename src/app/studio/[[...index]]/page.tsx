"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { useUser } from "@clerk/nextjs";

export default function StudioPage() {
  const { user } = useUser();
  const userRole = user?.organizationMemberships[0]?.role;

  if (userRole == "org:admin") {
    return (
      <div className="pt-24 pb-16 bg-pka_background">
        <NextStudio config={config} />
      </div>
    );
  } else {
    return (
      <div className="pt-24 text-center text-pka_blue bg-pka_background">
        <p>No access to the studio.</p>
      </div>
    );
  }
}
