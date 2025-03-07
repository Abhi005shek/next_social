import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

async function ProfileCard() {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await prisma.user.findFirst({
    where: {
      clerkId: userId,
    },
    include: {
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });

  // console.log("user: ", user);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-6">
      <div className="h-20 relative">
        <Image
          // src="https://cdn.pixabay.com/photo/2025/01/16/19/34/cortina-dampezzo-9338185_1280.jpg"
          src={user.cover || "/bird.jpg"}
          alt=""
          fill
          className="rounded-md"
        />
        <Image
          // src="https://cdn.pixabay.com/photo/2024/11/04/14/45/flower-9173953_1280.png"
          src={user.avatar || "/noAvatar.png"}
          alt=""
          width={40}
          height={40}
          className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
        />
      </div>

      <div className="flex flex-col gap-2 h-20 items-center">
        <span className="font-semibold">
          {user.name && user.surname
            ? user.name + " " + user.surname
            : user.username}
        </span>
        <div className="flex items-center gap-4">
          <div className="flex">
            <Image
              src="https://cdn.pixabay.com/photo/2024/11/04/14/45/flower-9173953_1280.png"
              alt=""
              width={12}
              height={12}
              className="rounded-full object-cover w-3 h-3"
            />

            <Image
              src="https://cdn.pixabay.com/photo/2024/11/04/14/45/flower-9173953_1280.png"
              alt=""
              width={12}
              height={12}
              className="rounded-full object-cover w-3 h-3"
            />

            <Image
              src="https://cdn.pixabay.com/photo/2024/11/04/14/45/flower-9173953_1280.png"
              alt=""
              width={12}
              height={12}
              className="rounded-full object-cover w-3 h-3"
            />
          </div>
          <span className="text-sm text-gray-500">
            {user._count.followers} Followers
          </span>
        </div>
        {/* <button> */}
        {user.username && (
          <Link
            className="text-white bg-blue-500 text-sm p-2 rounded-md"
            href={`/profile/${user.username}`}
          >
            My Profile
          </Link>
        )}
        {/* </button> */}
      </div>
    </div>
  );
}

export default ProfileCard;
