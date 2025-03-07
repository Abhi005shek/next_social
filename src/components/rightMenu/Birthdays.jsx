import Image from "next/image";
import Link from "next/link";
import React from "react";

function Birthdays() {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg text-sm">
      {/* Top */}
      <div className="flex justify-between items-center mb-3 font-medium">
        <span className="text-gray-500">Birthdays</span>
      </div>

      {/* User */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="https://cdn.pixabay.com/photo/2024/04/28/05/58/fish-8724841_1280.png"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full cursor-pointer"
          />
          <span className="font-semibold">John doe</span>
        </div>

        <div className="flex gap-3">
          <button className="bg-blue-500 text-white text-xs py-1 px-2 rounded">
            Celebrate
          </button>
        </div>
      </div>

      {/* Upcoming */}
      <div className="bg-slate-300 p-4 gap-4 flex items-center rounded mt-2">
        <Image
          src="/gift.png"
          alt=""
          width={24}
          height={24}
        />
        <Link href='' className="flex gap-1 flex-col text-sm">
        <span className="text-gray-700 font-semibold">Upcoming Birthdays</span><span className="text-gray-500">See other 16 have upcoming birthdays</span>
        </Link>
      </div>
    </div>
  );
}

export default Birthdays;
