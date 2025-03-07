import { Suspense } from "react";
import UserInfoCard from "./UserInfoCard";
import UserMediaCard from "./UserMediaCard";
import Birthdays from "./Birthdays";
import Ad from "../Ad";
import FriendRequest from "./FriendRequest";
import { auth } from "@clerk/nextjs/server";


async function RightMenu({ user }) {
  const {userId} = await auth();

  return (
    <div className="flex flex-col gap-6">
      {user && (
        <Suspense fallback={<p>Loading...</p>}>
          <UserInfoCard user={user} />
         { user.clerkId === userId && <UserMediaCard user={user} />}
        </Suspense>
      )}
      <FriendRequest />
      <Birthdays />
      <Ad size={"md"} />
    </div>
  );
}

export default RightMenu;
