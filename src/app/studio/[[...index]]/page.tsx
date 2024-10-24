"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { useUser } from "@clerk/nextjs";

export default function StudioPage() {
  const { isLoaded, user } = useUser();
  const userRole = user?.organizationMemberships[0]?.role;

  // Ensure user information is loaded before rendering

  // Check if the user has the 'org:admin' role
  // if (userRole == "org:admin") {
  return (
    <div className="pt-24 pb-16 bg-pka_background">
      <NextStudio config={config} />
    </div>
  );
  // } else {
  //   // Display no access message if the user is not an 'org:admin'
  //   return (
  //     <div className="pt-24 text-center text-pka_blue bg-pka_background">
  //       <p>No access to the studio.</p>
  //     </div>
  //   );
  // }
}
