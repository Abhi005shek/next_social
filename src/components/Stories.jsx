import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import StoryList from "./StoryList";

async function Stories() {
  const { userId } = auth();
  // if (!userId) return null;
  const stories = await prisma.story.findMany({
    where: {
      expiresAt: {
        gt: new Date(),
      },
      OR: [
        {
          user: {
            followers: {
              some: {
                folloerId: userId,
              },
            },
          },
        },
        {
          userId: userId,
        },
      ],
    },
    include: {
      user: true,
    },
  });

  return (
    <div className="p-4 bg-white overflow-x-scroll text-xs shadow-md rounded scroll-hide">
      <div className="flex flex-row gap-6 w-max">
        <StoryList userId={userId} stories={stories} />
      </div>
    </div>
  );
}

export default Stories;
