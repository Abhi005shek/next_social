"use client";

import Image from "next/image";
import { useOptimistic, useState } from "react";
import { acceptFollowRequest, declineFollowRequest } from "@/lib/actions";

function FriendRequestList({ requests }) {
  const [requestState, setRequestState] = useState(requests);
  const [optimisticRequests, removeOptimisticRequests] = useOptimistic(
    requestState,
    (state, value) => {
      return state.filter((req) => req.id !== value);
    }
  );

  const accept = async (reqId, userId) => {
    removeOptimisticRequests(reqId);
    try {
      await acceptFollowRequest(userId);
      setRequestState((prev) => prev.filter((r) => r.id !== reqId));
    } catch (error) {
      console.log("Error in acceting request", error);
    }
  };

  const decline = async (reqId, userId) => {
    removeOptimisticRequests(reqId);
    try {
      await declineFollowRequest(userId);
      setRequestState((prev) => prev.filter((r) => r.id !== reqId));
    } catch (error) {
      console.log("Error in declining request", error);
    }
  };

  return (
    <div>
      {optimisticRequests.map((req) => (
        <div key={req.id} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            
            <Image
              // src="https://cdn.pixabay.com/photo/2024/04/28/05/58/fish-8724841_1280.png"
              src={ req.sender.avatar ||  "https://cdn.pixabay.com/photo/2024/04/28/05/58/fish-8724841_1280.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full cursor-pointer"
            />
            <span className="font-semibold">
              {req.sender.name && req.sender.surname
                ? req.sender.name + " " + req.sender.surname
                : req.sender.username}
            </span>
          </div>

          <div className="flex gap-3">
            <form action={() => accept(req.id, req.sender.clerkId)}>
              <button>
                <Image
                  src="/accept.png"
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
            </form>

            <form action={() => decline(req.id, req.sender.clerkId)}>
              <button>
                <Image
                  src="/reject.png"
                  alt=""
                  width={20}
                  height={20}
                  className="cursor-pointer"
                />
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FriendRequestList;
