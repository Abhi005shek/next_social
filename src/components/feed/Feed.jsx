import Post from "@/components/feed/Post";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/client";

async function Feed({ username }) {
  const { userId } = await auth();

  let posts = [];
  if (username) {
    posts = await prisma.post.findMany({
      where: {
        user: {
          username: username,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  if (!username && userId) {
    const following = await prisma.follower.findMany({
      where: {
        followerId: userId,
      },
      select: {
        followingId: true,
      },
    });

    const followingIds = following.map((f) => f.followingId);

    const ids = [userId, ...followingIds];

    posts = await prisma.post.findMany({
      where: {
        userId: {
          // in: followingIds,
          in: ids,
        },
      },
      include: {
        user: true,
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return (
    <div
      className="p-4 bg-white shadow-md 
    flex flex-col gap-4 rounded-lg"
    >
      {posts.length ? (
        posts.map((p) => <Post key={p.id} post={p} />)
      ) : (
        <p className="text-center text-sm">No Posts Found</p>
      )}
    </div>
  );
}

export default Feed;
