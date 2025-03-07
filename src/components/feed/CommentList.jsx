"use client";
import { addComment } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useOptimistic, useState } from "react";

function CommentList({ comments, postId }) {
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const [descState, setdescState] = useState(comments);

  const [optimisticComment, addOptimisticComment] = useOptimistic(
    commentState,
    (state, comment) => {
      return [comment, ...state ];
    }
  );

  const comment = async () => {
    if (!user || !descState) return null;
    addOptimisticComment({
      id: Math.random(),
      desc: descState,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId,
      user: {
        id: user.id,
        avatar: user.imageUrl || "/noAvatar.png",
        cover: "",
        name: "",
        surname: "",
        username: "Sending please wait...",
        description: "",
        city: "",
        school: "",
        work: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
    });
    try {
      const createdComment = await addComment(postId, descState);
      setCommentState((p) => [createdComment, ...p]);
    } catch (error) {
      console.log("Error while adding comment: ", error);
    }
  };

  return (
    <>
      {user && (
        <div className="flex items-center gap-4">
          <Image
            //   src="https://cdn.pixabay.com/photo/2025/02/07/18/31/peacock-9390809_1280.jpg"
            src={user?.imageUrl || "/noAvatar.png"}
            alt=""
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />

          <form
            action={comment}
            className="bg-gray-100 flex items-center rounded-xl text-sm px-6 py-2 w-full"
          >
            <input
              placeholder="write a comment"
            //   value={descState}
              className="flex-1 bg-transparent outline-none"
              onChange={(e) => setdescState(e.target.value)}
            />
            <Image src="/emoji.png" alt="" width={16} height={16} />
          </form>
        </div>
      )}
      {/* ); */}
      {/* show comments */}
      <div className="">
        {/* Comment */}
        {optimisticComment.map((c) => (
          <div key={c.id} className="flex justify-between gap-3 mt-6">
            {/* Avatar */}
            <div className="">
              <Image
                // src="https://cdn.pixabay.com/photo/2025/02/07/18/31/peacock-9390809_1280.jpg"
                src={c.user.avatar || "/noAvatar.png"}
                alt=""
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
            </div>

            {/* Desc */}

            <div className="flex text-sm flex-col flex-1 gap-2">
              <span className="font-medium">
                {c.user.name && c.user.surname
                  ? c.user.name + " " + c.user.surname
                  : c.user.username}
              </span>
              <p className="">{c.desc}</p>

              <div className="flex gap-4 text-xs">
                <div className="flex p-2 items-center gap-2 rounded-full bg-slate-50">
                  <Image
                    src="/like.png"
                    alt=""
                    width={16}
                    height={16}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="text-gray-500">|</span>
                  <span className="text-gray-500">
                    0 <span className="hidden md:inline">Likes</span>
                  </span>
                </div>

                <div className="flex p-2 items-center gap-3 rounded-full bg-slate-100">
                  <span className="text-gray-500">Reply</span>
                </div>
              </div>
            </div>

            {/* Icon */}

            <div className="">
              <Image
                src="/more.png"
                alt=""
                width={16}
                height={16}
                className="w-4 h-4 cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CommentList;
