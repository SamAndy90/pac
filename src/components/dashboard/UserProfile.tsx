"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/common/UI/avatar";
import { useUser } from "@clerk/nextjs";

const UserProfile = () => {
  const { user } = useUser();

  if (!user) return null;
  return (
    <main className="grid flex-1 h-[70vh] items-start gap-4 p-6 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="col-span-3 lg:col-span-3">
        {/* <div className="bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"> */}
        <div className="flex flex-col justify-center w-2/3 mx-auto items-center  space-x-4">
          <div className="flex flex-col items-center justify-center">
            <Avatar className="h-40 w-40">
              <AvatarImage alt="@shadcn" src={user.imageUrl} />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="text-3xl font-bold">{user.fullName}</div>
            <div className="text-gray-500 text-2xl dark:text-gray-400">
              {user.primaryEmailAddress?.emailAddress}
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </main>
  );
};

export default UserProfile;
