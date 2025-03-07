import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";
import Image from "next/image";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
  UserProfile,
} from "@clerk/nextjs";

function NavBar() {
  return (
    <div className="h-20 flex items-center justify-between">
      {/* Left */}
      <div className="md:hidden lg:block w-[20%]">
        <Link href="/" className="font-bold text-blue-500">
          Next_Social
        </Link>
      </div>
      {/* center */}
      <div className="hidden md:flex justify-between w-[50%]">
        {/* Links */}
        <div className="flex items-center  gap-6 text-gray-600">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/home.png"
              alt="home"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Home</span>
          </Link>

          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/friends.png"
              alt=""
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Friends</span>
          </Link>

          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/stories.png"
              alt=""
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span>Stories</span>
          </Link>
        </div>

        <div className="hidden xl:flex items-center bg-slate-100 rounded-full p-2">
          <input type='text' placeholder="Search..." className="bg-transparent outline-none rounded-md"/>
          <Image src='/search.png' alt="" width={20} height={16} className="w-4 h-4"/>
        </div>

      </div>
      {/* Right */}
      <div className="w-[30%] flex items-center gap-4 xl:gap-8 justify-end">
        <ClerkLoading>
          <div className=" p-3 border-2 animate-spin-slow border-b-gray-300 border-blue-500 rounded-full" />
        </ClerkLoading>

        <ClerkLoaded>
          <SignedOut>
            <div className="flex items-center gap-2">
              <Image src={"/noAvatar.png"} alt="" width={16} height={16} />
              <Link href='/sign-in'>Login/Register</Link>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-6"> 
            <div className='/'>
            <Image src='/people.png' alt=""  width={16} height={16} />
            </div>
            <div className='/'>
            <Image src='/messages.png' alt=""  width={16} height={16} />
            </div>
            <div className='/'>
            <Image src='/notifications.png' alt="" width={16} height={16} />
            </div>
            <UserButton/>
            </div>
          </SignedIn>
        </ClerkLoaded>
        <MobileMenu />
      </div>
    </div>
  );
}

export default NavBar;
