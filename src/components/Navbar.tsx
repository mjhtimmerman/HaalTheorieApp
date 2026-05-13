import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-[#7F4287]">
      
      {/* LEFT */}
      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="flex items-center justify-center lg:justify-start"
        >
          {/* Klein scherm */}
          <Image
            src="/logohtklein.png"
            alt="HaalTheorie logo klein"
            width={28}
            height={28}
            className="block lg:hidden"
          />

          {/* Groot scherm */}
          <Image
            src="/logoht.png"
            alt="HaalTheorie logo"
            width={190}
            height={32}
            className="hidden lg:block"
          />
        </Link>

        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-2 text-xs rounded-full ring-[1.5px] ring-white">
          <Image
            className="brightness-0 invert"
            src="/search.png"
            alt="Search"
            width={14}
            height={14}
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-[200px] p-2 bg-transparent text-white placeholder:text-white outline-none"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5 cursor-pointer">
        <div className="rounded-full w-7 h-7 flex items-center justify-center relative">
          <Image src="/bell2.png" alt="" width={25} height={25} />

          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full text-xs">
            3
          </div>
        </div>

        <Image
          src="/profile.png"
          alt=""
          width={30}
          height={30}
          className="rounded-full brightness-0 invert"
        />
      </div>
    </div>
  );
};

export default Navbar;