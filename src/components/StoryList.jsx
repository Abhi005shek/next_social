"use client";
import { addStory } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useOptimistic, useState } from "react";

function StoryList({ userStory, stories, userId }) {
  const { user, isSignedIn } = useUser();
  const [storyList, setStoryList] = useState(stories);
  const [img, setImg] = useState("");
  const [open, setOpne] = useState(false);
  const [openImg, setOpenImg] = useState(null);
  const router = useRouter();
  const [userstory, setUserstory] = useState(userStory);
  const [optimisticStoryList, setOptimisticStoryList] = useOptimistic(
    storyList,
    (state, value) => {
      return [value, ...state];
    }
  );

  const add = async () => {
    if (!img?.secure_url) return;
    setUserstory(null);
    setOptimisticStoryList({
      id: Math.random(),
      img: img.secure_url,
      createdAt: new Date(Date.now()),
      expireAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      userId: userId,
      user: {
        id: userId,
        avatar: user?.imageUrl || "/noAvatar.png",
        cover: "",
        name: "",
        surname: "",
        username: "Sending...",
        description: "",
        city: "",
        school: "",
        work: "",
        website: "",
        createdAt: new Date(Date.now()),
      },
    });
    try {
      const createdStory = await addStory(img.secure_url);
      setStoryList((p) => [createdStory, ...p]);
      setImg(null);
    } catch (error) {
      console.log("Error occured while adding story: ", error);
    }
  };

  if (!isSignedIn) {
    return null;
  }

  return (
    <>
      <CldUploadWidget
        uploadPreset="next_social"
        onSuccess={(res, widget) => {
          setImg(res.info);
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <div className="flex flex-col gap-2 items-center cursor-pointer  relative">
              <Image
                // src="https://cdn.pixabay.com/photo/2025/01/16/19/34/cortina-dampezzo-9338185_1280.jpg"
                src={img?.secure_url || user?.imageUrl || "/noAvatar.png"}
                alt=""
                width={80}
                height={80}
                className="w-20 h-20 rounded-full ring-2 object-cover"
                onClick={() => open()}
              />
              {img ? (
                <form action={add}>
                  <button className="bg-blue-500 text-xs p-1 rounded-md text-white">
                    Send
                  </button>
                </form>
              ) : (
                <span className="font-medium">Add a story</span>
              )}

              <div className="absolute text-6xl text-gray-200 top-1">+</div>
            </div>
          );
        }}
      </CldUploadWidget>

      {userstory && (
        <div className="flex flex-col gap-2 items-center cursor-pointer">
          <Image
            // src="https://cdn.pixabay.com/photo/2025/01/16/19/34/cortina-dampezzo-9338185_1280.jpg"
            src={userstory.img || "/noAvatar.png"}
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full object-cover ring-2"
            onClick={() => {
              setOpenImg(userstory?.img);
              setOpne(true);
            }}
          />
          <span className="font-medium">{user.username}</span>
        </div>
      )}

      {optimisticStoryList.map((s) => (
        <div
          key={s.id}
          className="flex flex-col gap-2 items-center cursor-pointer"
        >
          <Image
            // src="https://cdn.pixabay.com/photo/2025/01/16/19/34/cortina-dampezzo-9338185_1280.jpg"
            src={s.img || "/noAvatar.png"}
            alt=""
            width={80}
            height={80}
            className=" w-20 h-20 rounded-full object-cover ring-2"
            onClick={() => {
              setOpenImg(s?.img);
              setOpne(true);
            }}
          />
          <Link href={`/profile/${s.user.username}`}>
            <span className="font-medium">{s.user.username}</span>
          </Link>
        </div>
      ))}

      {open && (
        <div
          className="py-3 px-0 rounded-md bg-black z-[10] absolute bottom-[10%] right-[30%] w-[40%] h-[70%]"
          onClick={() => {
            setOpenImg(null);
            setOpne(false);
          }}
        >
          <p className="text-white text-right text-xl font-semibold mr-4">X</p>
          <Image src={openImg} alt="" fill className="object-contain" />
        </div>
      )}
    </>
  );
}

export default StoryList;
