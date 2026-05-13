import Image from "next/image";
import Link from "next/link";

const mainItems = [
  { icon: "/home.png", label: "Dashboard", href: "/" },
  { icon: "/teacher.png", label: "Ads", href: "/list/teachers" },
  { icon: "/student.png", label: "Funnels", href: "/list/students" },
  { icon: "/class.png", label: "Cursus", href: "/list/classes" },
  { icon: "/parent.png", label: "Blog", href: "/list/parents" },
  { icon: "/subject.png", label: "Rapporten", href: "/list/subjects" },
  { icon: "/class.png", label: "Klantenservice", href: "/list/classes" },
];

const bottomItems = [
  { icon: "/profile.png", label: "Profile", href: "/profile" },
  { icon: "/setting.png", label: "Settings", href: "/settings" },
];

const Menu = () => {
  return (
    <div className="h-full flex flex-col p-3 text-sm">
      {/* MAIN MENU */}
      <div className="flex flex-col gap-2">
        {mainItems.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 bg-white"
          >
            <Image src={item.icon} alt="" width={15} height={15} />
            <span className="hidden lg:block">{item.label}</span>
          </Link>
        ))}
      </div>

      {/* BOTTOM */}
      <div className="mt-auto flex flex-col gap-2">
        <Link
          href="/logout"
          className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 bg-white"
        >
          <Image src="/logout.png" alt="" width={15} height={15} />
          <span className="hidden lg:block">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Menu;