"use client";
import { deletePost } from "@/lib/actions";
import Image from "next/image";
import React, { useState } from "react";

function PostInfo({ postId }) {
  const [isOpen, setIsOpen] = useState(false);
  const deleteWithID = deletePost.bind(null, postId);
  return (
    <div className="relative">
      <Image
        src="/more.png"
        alt=""
        width={16}
        height={16}
        className="w-4 h-4 cursor-pointer"
        onClick={() => setIsOpen((p) => !p)}
      />

      {isOpen && (
        <div className="w-20 absolute top-4 right-0 bg-white p-2 text-center rounded-lg flex flex-col gap-3 text-xs shadow-md z-50">
          <span className="cursor-pointer">View</span>
          <span className="cursor-pointer">Re-post</span>
          <form action={deleteWithID}>
            <button className="text-red-500 hover:bg-red-600 hover:text-white p-1 rounded-md"> Delete</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PostInfo;
