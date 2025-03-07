import LeftMenu from "@/components/leftMenu/LeftMenu";
import RightMenu from "@/components/rightMenu/RightMenu";
import Stories from "@/components/Stories";
import AddPost from "@/components/AddPost";
import Feed from "@/components/feed/Feed";
import { Suspense } from "react";

const Homepage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center h-[calc(100vh-86px)] justify-center">
          <div className="text-center">
            <p className="font-semibold text-xl text-blue-400">NEXT_SOCIAL</p>
            <p>Loading....</p>
          </div>
        </div>
      }
    >
      <div className="flex gap-6">
        <div className="hidden xl:block w-[20%]">
          <LeftMenu type="home" />
        </div>
        <div className="w-full lg:w-[70%] xl:w-[50%]">
          <div className="flex gap-4 flex-col">
            <Stories />
            <AddPost />
            <Feed />
          </div>
        </div>
        <div className="hidden lg:block w-[30%]">
          <RightMenu />
        </div>
      </div>
    </Suspense>
  );
};

export default Homepage;
