import Image from "next/image";
import Comments from "@/components/feed/Comments";
import PostInteraction from "./PostInteraction";
import PostInfo from "./PostInfo";
import { Suspense } from "react";
import { auth } from "@clerk/nextjs/server";

async function Post({ post }) {
  const { userId } = await auth();
  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* User */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            // src="https://cdn.pixabay.com/photo/2022/02/13/11/26/grass-7010936_1280.jpg"
            src={post.user.avatar || "/noAvatar.png"}
            alt=""
            width={20}
            height={20}
            className="w-10 h-10 rounded-full"
          />
          <p>
            {post.user.name && post.user.surname
              ? post.user.name + " " + post.user.surname
              : post.user.username}
          </p>
        </div>

        {userId == post.user.clerkId && <PostInfo postId={post.id} />}
      </div>

      {/* Desc */}
      <div className="flex flex-col gap-4">
        {post.img && (
          <div className="w-full min-h-96 relative">
            <Image
              // src="https://cdn.pixabay.com/photo/2025/02/11/20/43/cormorant-9399801_1280.jpg"
              src={post.img}
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}
        <p>{post.desc}</p>
      </div>

      {/* Interaction */}
      <Suspense fallback="Loading...">
        {" "}
        <PostInteraction
          postId={post.id}
          likes={post.likes.map((l) => l.userId)}
          commentNumber={post._count.comments}
        />
        <Comments postId={post.id} />{" "}
      </Suspense>
    </div>
  );
}

export default Post;
