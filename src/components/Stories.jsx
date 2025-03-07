import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import StoryList from "./StoryList";

async function Stories() {
  const { userId } = await auth();
  if (!userId) return null;
  let userStory = await prisma.story.findMany({
    where: {
      expiresAt: {
        gt: new Date(),
      },
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const stories = await prisma.story.findMany({
    where: {
      expiresAt: {
        gt: new Date(),
      },
      user: {
        followers: {
          some: {
            followerId: userId,
          },
        },
      },
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="p-4 bg-white overflow-x-scroll text-xs shadow-md rounded scroll-hide">
      <div className="flex flex-row gap-6 w-max">
        <StoryList userId={userId} userStory={userStory[0]} stories={stories} />
      </div>
    </div>
  );
}

export default Stories;
