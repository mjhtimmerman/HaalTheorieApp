import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex flex-col">
      
      {/* TOPBAR */}
      <Navbar />

      {/* CONTENT */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* SIDEBAR */}
        <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] bg-white h-full">
          <Menu />
        </div>

        {/* MAIN */}
        <div className="flex-1 bg-[#F7F8FA] overflow-scroll">
          {children}
        </div>

      </div>
    </div>
  );
}