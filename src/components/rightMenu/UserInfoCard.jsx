import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import UserInfoCardInteraction from "./UserInfoCardInteraction";
import UpdateUser from "./updateUser";

async function UserInfoCard({ user }) {
  const createdAt = new Date(user.createdAt);
  const joinedDate = createdAt.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let isBlockedUser = false;
  let isFollowing = false;
  let isFollowingSent = false;
  const { userId: currentUserId } = await auth();

  if (currentUserId) {
    const blockRes = await prisma.block.findFirst({
      where: {
        blockerId: currentUserId,
        blockedId: user.id,
      },
    });

    blockRes ? (isBlockedUser = true) : (isBlockedUser = false);

    const followRes = await prisma.follower.findFirst({
      where: {
        followerId: currentUserId,
        followingId: user.cerkId,
      },
    });

    followRes ? (isFollowing = true) : (isFollowing = false);

    const followReqRes = await prisma.followRequest.findFirst({
      where: {
        senderId: currentUserId,
        receiverId: user.clerkId,
      },
    });

    followReqRes ? (isFollowingSent = true) : (isFollowingSent = false);
  }

  return (
    <div className="bg-white flex p-4 shadow-md rounded-lg text-sm flex-col">
      {/* Top */}
      <div className="flex justify-between items-center mb-3 font-medium">
        <span className="text-gray-500">User Information</span>
        {currentUserId === user.clerkId ? (
          <UpdateUser user={user} />
        ) : (
          <Link href="" className="text-blue-500 text-xs">
            See all{" "}
          </Link>
        )}
      </div>

      {/* Bottom */}
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">
            {user.name && user.surname
              ? user.name + " " + user.surname
              : user.username}
          </span>
          <span className="text-sm">@{user.username}</span>
        </div>
        {user.description && <p className="">{user.description}</p>}

        {user.city && (
          <div className="flex gap-2">
            <Image src="/map.png" alt="" width={16} height={16} />
            <span className="">
              Living in <b>{user.city}</b>
            </span>
          </div>
        )}

        {user.school && (
          <div className="flex gap-2">
            <Image src="/school.png" alt="" width={16} height={16} />
            <span className="">
              Went at <b>{user.school}</b>
            </span>
          </div>
        )}

        {user.work && (
          <div className="flex gap-2">
            <Image src="/work.png" alt="" width={16} height={16} />
            <span className="">
              Work at <b>{user.work}</b>
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          {user.website && (
            <div className="flex gap-1 items-center">
              <Image src="/link.png" alt="" width={16} height={16} />
              <Link href={user.website} className="text-blue-500 font-medium">
                {user.website}
              </Link>
            </div>
          )}

          {
            <div className="flex gap-1 items-center">
              <Image src="/date.png" alt="" width={16} height={16} />
              <span className="">Joined {joinedDate}</span>
            </div>
          }
        </div>

        {/* <button className="p-3 rounded text-white font-semibold bg-blue-400">
          Follow
        </button>
        <span className="text-red-400 text-right text-xs cursor-pointer">
          Block User
        </span> */}

        <UserInfoCardInteraction
          userid={user.clerkId}
          isBlockedUser={isBlockedUser}
          isFollowing={isFollowing}
          isFollowingSent={isFollowingSent}
        />
      </div>
    </div>
  );
}

export default UserInfoCard;
