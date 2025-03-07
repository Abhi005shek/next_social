import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import FriendRequestList from "./FriendRequestList";
import prisma from '@/lib/client'

async function FriendRequest() {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await prisma.user.findFirst({
    where: {
      clerkId: userId,
    },
  });

  const requests = await prisma.followRequest.findMany({
    where: {
      receiverId: user.clerkId,
    },
    include: {
      sender: true,
    },
  });

  if (!requests.length) return null;

  return (
    <div className="bg-white flex p-4 shadow-md rounded-lg text-sm flex-col">
      {/* Top */}
      <div className="flex justify-between items-center mb-3 font-medium">
        <span className="text-gray-500">Friend Requests</span>
        <Link href="" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>

      {/* User */}
      <FriendRequestList requests={requests} />
    </div>
  );
}

export default FriendRequest;
