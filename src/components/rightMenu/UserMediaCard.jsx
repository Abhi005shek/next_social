import prisma from "@/lib/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function UserMediaCard({ user }) {
  const postMedia = await prisma.post.findMany({
    where: {
      userId: user.clerkId,
      img: {
        not: null,
      },
    },
    take: 8,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="bg-white flex p-4 shadow-md rounded-lg text-sm flex-col">
      {/* Top */}
      <div className="flex justify-between items-center mb-3 font-medium">
        <span className="text-gray-500">User Media</span>
        <Link href="" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>

      {/* Bottom */}
      <div className="flex flex-wrap gap-4">
        {postMedia.length ?
          postMedia.map((post) => (
            <div key={post.id} className="relative w-1/5 h-24">
              <Image
                // src="https://cdn.pixabay.com/photo/2024/12/13/21/16/bird-9266166_1280.jpg"
                src={post.img}
                alt=""
                fill
                className="rounded-lg object-cover"
              />
            </div>
          )) : <p className="text-center text-sm w-full">No Media Found</p> }
      </div>
    </div>
  );
}

export default UserMediaCard;
