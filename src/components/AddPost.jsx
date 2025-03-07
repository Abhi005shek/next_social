"use client";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Suspense, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";
import EmojiPicker from "emoji-picker-react";

function AddPost() {
  const { user, isLoaded } = useUser();
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4 bg-white shadow-md flex gap-4 justify-between rounded-lg">
      {/* Avatar */}
      <Image
        // src="https://cdn.pixabay.com/photo/2025/02/19/06/17/winter-9416919_1280.jpg"
        src={user?.imageUrl || "/noAvatar.png"}
        alt=""
        width={48}
        height={48}
        className="object-cover w-12 h-12 rounded-full"
      />

      <div className="flex-1">
        <form
          // method="POST"
          action={(formData) => {
            addPost(formData, img?.secure_url);
            setImg("");
            setDesc("");
            setOpen(false);
          }}
          className="flex gap-4"
        >
          <textarea
            name="desc"
            value={desc}
            placeholder="Add your post..."
            id=""
            className="flex-1 p-2 bg-gray-100 rounded"
            onChange={(e) => setDesc(e.target.value)}
          />
          <div className="relative flex">
            <Image
              src="/emoji.png"
              alt=""
              width={20}
              height={20}
              className=" w-5 h-5 self-end "
              onClick={() => setOpen((p) => !p)}
            />
            <div className="absolute z-[10] shadow-lg rounded-lg right-0 -bottom-[460px]">
              <Suspense fallback="Loading...">
                <EmojiPicker
                  onEmojiClick={(e) => setDesc((p) => p + e.emoji)}
                  className=""
                  autoFocusSearch={false}
                  width={300}
                  open={open}
                />
              </Suspense>
            </div>
          </div>
          {/* <button>Submit</button> */}
          <AddPostButton />
        </form>

        <div className="mt-4 mr-4 flex items-center gap-4 text-xs text-gray-400 flex-wrap">
          <CldUploadWidget
            uploadPreset="next_social"
            onSuccess={(res, widget) => {
              setImg(res.info);
              widget.close();
            }}
          >
            {({ open }) => {
              return (
                <div
                  className="flex gap-2 items-center cursor-pointer"
                  onClick={() => open()}
                >
                  <Image
                    src="/addimage.png"
                    alt=""
                    width={20}
                    height={20}
                    className=" w-5 h-5 self-end"
                  />
                  <span>Photos</span>
                </div>
              );
            }}
          </CldUploadWidget>

          <div className="flex gap-2 items-center cursor-pointer">
            <Image
              src="/addvideo.png"
              alt=""
              width={20}
              height={20}
              className=" w-5 h-5 self-end"
            />
            <span>Video</span>
          </div>

          <div className="flex gap-2 items-center cursor-pointer">
            <Image
              src="/addevent.png"
              alt=""
              width={20}
              height={20}
              className=" w-5 h-5 self-end"
            />
            <span>Event</span>
          </div>

          <div className="flex gap-2 items-center cursor-pointer">
            <Image
              src="/poll.png"
              alt=""
              width={20}
              height={20}
              className=" w-5 h-5 self-end"
            />
            <span>Poll</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
