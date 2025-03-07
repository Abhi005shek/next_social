"use client";
import { updateprofile } from "@/lib/actions";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useActionState, useState } from "react";

function UpdateUser({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cover, setCover] = useState("");

  const [state, formAction] = useActionState(updateprofile, {
    success: false,
    error: false,
  });

  return (
    <div className="">
      <span
        className="text-blue-400 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Update
      </span>

      {isOpen && (
        <div className="absolute pt-80 pb-16 w-[100vw] h-[100vh] overflow-x-hidden overflow-y-scroll top-0 z-50 left-0 bg-black bg-opacity-60 flex items-center justify-center">
          <form
            action={(formData) =>
              formAction({ formData, cover: cover?.secure_url || "" })
            }
            className="relative p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full lg:w-1/2 2xl:w-1/3"
          >
            <h1>Update Profile</h1>
            <p className="mt-4 text-sx  text-gray-500">
              Use the navbar to update avatar or username
            </p>

            <CldUploadWidget
              uploadPreset="next_social"
              onSuccess={(res) => setCover(res.info)}
            >
              {({ open }) => {
                return (
                  <div
                    className="flex flex-col gap-4 my-4"
                    onClick={() => open()}
                  >
                    <label htmlFor="">Cover Picture</label>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <Image
                        src={user.cover || null}
                        alt=""
                        width={48}
                        height={32}
                        className="rounded-md object-cover"
                      />
                      <span className="text-xs underline text-gray-600">
                        Change
                      </span>
                    </div>
                  </div>
                );
              }}
            </CldUploadWidget>
            <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
            <div className="flex  flex-col gap-4">
              <label htmlFor="">First Name</label>
              <input
                placeholder={user.name || "John"}
                className="ring-1 ring-gray-400 p-[13px]  rounded-md text-sm"
                name="name"
              />
            </div>
            <div className="flex flex-wrap justify-between gap-2 xl:gap-4"></div>
            <div className="flex  flex-col gap-4">
              <label htmlFor="">Last Name</label>
              <input
                placeholder={user.surname || "Doe"}
                className="ring-1 ring-gray-400 p-[13px]  rounded-md text-sm"
                name="surname"
              />
            </div>
            <div className="flex flex-wrap justify-between gap-2 xl:gap-4"></div>
            <div className="flex  flex-col gap-4">
              <label htmlFor="">Description</label>
              <input
                placeholder={user.description || "Life is a  roller coaster"}
                className="ring-1 ring-gray-400 p-[13px]  rounded-md text-sm"
                name="description"
              />
            </div>
            <div className="flex flex-wrap justify-between gap-2 xl:gap-4"></div>
            <div className="flex  flex-col gap-4">
              <label htmlFor="">City</label>
              <input
                placeholder={user.city || "New Delhi"}
                className="ring-1 ring-gray-400 p-[13px]  rounded-md text-sm"
                name="city"
              />
            </div>
            <div className="flex flex-wrap justify-between gap-2 xl:gap-4"></div>
            <div className="flex  flex-col gap-4">
              <label htmlFor="">School</label>
              <input
                placeholder={user.school || "IIT"}
                className="ring-1 ring-gray-400 p-[13px]  rounded-md text-sm"
                name="school"
              />
            </div>
            <div className="flex flex-wrap justify-between gap-2 xl:gap-4"></div>
            <div className="flex  flex-col gap-4">
              <label htmlFor="">Work</label>
              <input
                placeholder={user.work || "Web Developer"}
                className="ring-1 ring-gray-400 p-[13px]  rounded-md text-sm"
                name="work"
              />
            </div>
            <div className="flex flex-wrap justify-between gap-2 xl:gap-4"></div>
            <div className="flex  flex-col gap-4">
              <label htmlFor="">Website</label>
              <input
                placeholder={user.website || "abhishek.dev"}
                className="ring-1 ring-gray-400 p-[13px]  rounded-md text-sm"
                name="website"
              />
            </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold rounded-md mt-2 p-2"
            >
              Update
            </button>

            <p className="text-center">
              {state.success && (
                <span className="text-green-400">
                  Profile Updated Successfully!!
                </span>
              )}
              {state.error && (
                <span className="text-red-600">Something went wrong!!</span>
              )}
            </p>

            <div
              className=" text-xl cursor-pointer top-2 right-3 absolute text-right w-full"
              onClick={() => setIsOpen(false)}
            >
              X
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default UpdateUser;
