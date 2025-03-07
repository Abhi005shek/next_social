import Stories from "../../../components/Stories";
import LeftMenu from "../../../components/leftMenu/LeftMenu";
import RightMenu from "../../../components/rightMenu/RightMenu";
import AddPost from "../../../components/AddPost";
import Feed from "../../../components/feed/Feed";
import Image from "next/image";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

async function ProfilePage({ params }) {
  const p = await params;
  const username = p?.username;
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
    include: {
      _count: {
        select: {
          followers: true,
          followings: true,
          posts: true,
        },
      },
    },
  });

  // console.log("Data: ", user);

  if (!user) return notFound();

  const { userId: currentUserId } = await auth();
  let isBlocked;
  if (currentUserId) {
    const res = await prisma.block.findFirst({
      where: {
        blockerId: user.id,
        blockedId: currentUserId,
      },
    });

    if (res) {
      isBlocked = true;
    }
  } else {
    isBlocked = false;
  }

  if (isBlocked) return notFound();

  return (
    <div className="flex gap-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex gap-4 flex-col">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-64 relative">
              <Image
                // src="https://cdn.pixabay.com/photo/2024/09/15/13/03/cows-9049119_1280.jpg"
                src={user.cover || "/bird.jpg"}
                alt=""
                fill
                className="rounded-md object-cover"
              />
              <Image
                // src="https://cdn.pixabay.com/photo/2024/09/15/13/03/cows-9049119_1280.jpg"
                src={user.avatar || "/noAvatar.png"}
                alt=""
                width={128}
                height={128}
                className="w-32 h-32 absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white rounded-full"
              />
            </div>
            <h1 className="mt-20 mb-4 text-2xl font-semibold">
              {user.name && user.surname
                ? user.name + " " + user.surname
                : user.username}
            </h1>
            <div className="flex items-center justify-center gap-12 mb-6 bg-white p-3 rounded-md shadow-md">
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.posts}</span>
                <span className="text-sm">Posts</span>
              </div>

              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.followers}</span>
                <span className="text-sm">Followers</span>
              </div>

              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.followings}</span>
                <span className="text-sm">Following</span>
              </div>
            </div>
          </div>
          <Feed username={username} />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu user={user} />
      </div>
    </div>
  );
}

export default ProfilePage;
