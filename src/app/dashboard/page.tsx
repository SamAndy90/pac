"use client";
import { Loader } from "@/common/Loader";
import Dashboard from "@/components/dashboard/Dashboard";
import { useUser } from "@clerk/nextjs";
export default function Page() {
  const { isLoaded, user } = useUser();

  // Extract the user role; handle it being possibly undefined
  const userRole = user?.organizationMemberships[0]?.role;

  // Define allowed roles for accessing the dashboard
  const allowedRoles = ["org:admin", "org:member", "org:socialadmin"];

  if (!user || !isLoaded) {
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  // Check if userRole is defined and if it's one of the allowed roles
  const canAccessDashboard = userRole && allowedRoles.includes(userRole);

  return (
    <div>
      {canAccessDashboard ? (
        <Dashboard role={userRole} />
      ) : (
        <div className="p-28">You dont have an access to visit studio</div>
      )}
    </div>
  );
}
