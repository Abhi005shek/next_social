import Image from "next/image";
import React from "react";

function Ad({ size }) {
  return (
    <div className="bg-white flex flex-col p-4 shadow-md rounded-lg text-sm">
      {/* Top */}
      <div className="flex items-center justify-between w-full text-gray-500 text-sm">
        <span className="">Sponsered Ads</span>
        <Image src="/more.png" alt='' width={16} height={16} />
      </div>

      {/* Bottom */}
      <div className={`mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}>
        <div
          className={`border relative w-full ${
            size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
          }`}
        >
          <Image
            src="https://cdn.pixabay.com/photo/2025/02/18/15/15/bird-9415665_1280.jpg"
            alt=""
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex mt-4 gap-4 items-center">
          <Image
            src="https://cdn.pixabay.com/photo/2025/02/18/15/15/bird-9415665_1280.jpg"
            alt=""
            width={24}
            height={24}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-blue-500 font-semibold">Maha Kumbh</span>
        </div>
        <p className={`${size == "sm" ? "text-xs" : "text-sm"}`}>
          {size == "sm"
            ? "orem ipsum dolor sit amet consectetur, adipisicing elit."
            : size == "md"
            ? "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, placeat."
            : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, placeat.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, placeat."}
        </p>
        <button className="bg-gray-200 p-2 text-sm rounded-lg w-full mt-2 text-gray-500">Learn more</button>
      </div>
    </div>
  );
}

export default Ad;
