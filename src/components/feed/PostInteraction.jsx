"use client";
import { switchLike } from "@/lib/actions";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect, useOptimistic, useState } from "react";

function PostInteraction({ postId, likes, commentNumber }) {
  const { isLoaded, userId } = useAuth();

  const [likestate, setLikeState] = useState({
    likesCount: likes.length,
    isLiked: userId ? likes.includes(userId) : false,
  });

  useEffect(() => {
    setLikeState({
      likesCount: likes.length,
      isLiked: userId ? likes.includes(userId) : false,
    });
  }, [userId]);

  const [optimisticLike, switchOptimisticLike] = useOptimistic(
    likestate,
    (state, value) => {
      return {
        likesCount: !state.isLiked
          ? state.likesCount + 1
          : state.likesCount - 1,
        isLiked: !state.isLiked,
      };
    }
  );

  const likeAction = async () => {
    try {
      switchOptimisticLike("");
      await switchLike(postId);
      setLikeState((state) => {
        return {
          likesCount: !state.isLiked
            ? state.likesCount + 1
            : state.likesCount - 1,
          isLiked: !state.isLiked,
        };
      });
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <div>
      <div className="flex flex-center justify-between my-4 text-sm">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-full">
            <form action={likeAction}>
              <button>
                <Image
                  src={optimisticLike.isLiked ? "/liked.png" : "/like.png"}
                  alt=""
                  width={16}
                  height={16}
                  className="w-6 h-6 cursor-pointer"
                />
              </button>
            </form>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              {optimisticLike.likesCount}{" "}
              <span className="hidden md:inline"> Likes</span>
            </span>
          </div>

          <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-full">
            <Image
              src="/comment.png"
              alt=""
              width={16}
              height={16}
              className="w-6 h-6 cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              {commentNumber} <span className="hidden md:inline"> Comments</span>
            </span>
          </div>
        </div>

        <div className="">
          <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-full">
            <Image
              src="/share.png"
              alt=""
              width={16}
              height={16}
              className="w-6 h-6 cursor-pointer"
            />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">
              <span className="hidden md:inline">Share</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostInteraction;
