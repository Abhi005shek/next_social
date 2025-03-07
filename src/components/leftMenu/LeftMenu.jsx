import ProfileCard from "./ProfileCard";
import Ad from "@/components/Ad";
import Image from "next/image";
import Link from "next/link";

const links = [
  {
    href: "/",
    name: "My Posts",
    image: "/posts.png",
  },

  {
    href: "/",
    name: "Activity",
    image: "/activity.png",
  },

  {
    href: "/",
    name: "Market Place",
    image: "/market.png",
  },

  {
    href: "/",
    name: "Events",
    image: "/events.png",
  },

  {
    href: "/",
    name: "Albums",
    image: "/albums.png",
  },

  {
    href: "/",
    name: "News",
    image: "/news.png",
  },

  {
    href: "/",
    name: "Videos",
    image: "/videos.png",
  },

  {
    href: "/",
    name: "Courses",
    image: "/courses.png",
  },

  {
    href: "/",
    name: "Lists",
    image: "/lists.png",
  },

  {
    href: "/",
    name: "Settings",
    image: "/settings.png",
  },
];

function LeftMenu({ type }) {
  return (
    <div className="flex gap-4 flex-col">
      {(type == "home" && <ProfileCard />)}

      <div
        className="bg-white flex  p-4 shadow-md rounded-lg text-sm 
      gap-2 text-gray-500 flex-col"
      >
        {links?.map((l,i) => {
          return (
            <div key={l.name + i}>
              <Link
                href={l.href}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-200"
              >
                <Image src={l.image} alt="" width={20} height={20} />
                <span className="">{l.name}</span>
              </Link>

              <hr className="border-t-1 w-36 border-gray-50 self-center" />
            </div>
          );
        })}

      </div>

      <Ad size='sm'/>
    </div>
  );
}

export default LeftMenu;
