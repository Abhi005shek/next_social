"use client";
import { switchFollow, switchBlock } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { useEffect, useOptimistic, useState } from "react";

function UserInfoCardInteraction({
  userid,
  isBlockedUser,
  isFollowing,
  isFollowingSent,
}) {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isBlockedUser,
    followingRequestSent: isFollowingSent,
  });

  const { user } = useUser();

  useEffect(() => {
    setUserState({
      following: isFollowing,
      blocked: isBlockedUser,
      followingRequestSent: isFollowingSent,
    });
  }, [userid]);

  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, value) => {
      return value == "follow"
        ? {
            ...state,
            following: state.following && false,
            followingRequestSent:
              !state.following && !state.followingRequestSent ? true : false,
          }
        : { ...state, blocked: !state.blocked };
    }
  );

  async function follow() {
    try {
      switchOptimisticState("follow");
      await switchFollow(userid);
      setUserState((prev) => {
        return {
          ...prev,
          following: prev.following && false,
          followingRequestSent:
            !prev.following && !prev.followingRequestSent ? true : false,
        };
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async function block() {
    try {
      switchOptimisticState("block");
      await switchBlock(userid);
      setUserState((prev) => {
        return {
          ...prev,
          blocked: !prev.blocked,
        };
      });
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  return (
    <>
      {user?.id != userid && (<>
        <form action={follow}>
          <button className="w-full p-3 rounded text-white font-semibold bg-blue-400">
            {optimisticState.following
              ? "Following"
              : optimisticState.followingRequestSent
              ? "Follow Request Sent"
              : "Follow"}
          </button>
        </form>

      <form action={block} className="flex">
        <button className="text-red-400 text-right w-full text-xs cursor-pointer">
          {optimisticState.blocked ? "Unblock User" : "Block User"}
        </button>
      </form>
   </> )}
    </>
  );
}

export default UserInfoCardInteraction;
