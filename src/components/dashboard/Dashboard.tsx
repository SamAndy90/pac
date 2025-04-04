import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/common/UI/tabs";
import { ComingSoon } from "@/common";
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
import UserProfile from "./UserProfile";

type Props = {
  role: string;
};

const Dashboard: React.FC<Props> = ({ role }) => {
  const tabsList = [
    {
      trigger: "user-profile",
      content: <UserProfile />,
      title: "User Profile",
      allowedRoles: ["org:admin", "org:member", "org:socialadmin"],
    },
    {
      trigger: "manage-content",
      content: (
        <NextStudio
          config={{
            ...config,
            basePath: "/dashboard",
          }}
        />
      ),
      title: "Manage Content",
      allowedRoles: ["org:admin"],
    },

    {
      trigger: "my-contests",
      content: <ComingSoon />,
      title: "My Contests",
      allowedRoles: ["org:admin", "org:member"],
    },
    {
      trigger: "manage-peace-social",
      content: <ComingSoon />,
      title: "Manage Peace Social",
      allowedRoles: ["org:admin", "org:socialadmin"],
    },
    {
      trigger: "manage-users",
      content: <ComingSoon />,
      title: "Manage Users",
      allowedRoles: ["org:admin"],
    },
    {
      trigger: "global-settings",
      content: <ComingSoon />,
      title: "Global Settings",
      allowedRoles: ["org:admin"],
    },
  ].filter((tab) => tab.allowedRoles.includes(role));

  return (
    <div className="flex justify-center px-4 pt-40 w-full">
      <Tabs defaultValue="user-profile" className="flex flex-col w-screen">
        <TabsList className="flex flex-col md:flex-row">
          {tabsList.map((tab, index) => (
            <TabsTrigger key={index} value={tab.trigger}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabsList.map((tab, index) => (
          <TabsContent key={index} value={tab.trigger}>
            <div className="mt-16 md:mt-0">{tab.content}</div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Dashboard;
