"use client";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { useUser } from "@clerk/nextjs";

export default function StudioPage() {
  const { isLoaded, user } = useUser();
  const userRole = user?.organizationMemberships[0]?.role;

  // Ensure user information is loaded before rendering

  // Check if the user has the 'org:admin' role
  if (userRole == "org:admin") {
    return (
      <div className="pt-28 bg-[#2a2d3f]">
        <NextStudio config={config} />
      </div>
    );
  } else {
    // Display no access message if the user is not an 'org:admin'
    return (
      <div className="pt-28 text-white bg-[#2a2d3f]">
        <p>No access to the studio.</p>;
      </div>
    );
  }
}
