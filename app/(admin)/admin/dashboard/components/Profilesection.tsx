"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import AdminSideBar from "./adminsidebar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/(main)/context/authContext";

const ProfileSection = () => {
  const { user, setUser } = useAuth();
  const [name,setName]=useState("");
  const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Close sheet when route changes
    useEffect(() => {
      if(user){
        setName(user.name);
      }
      setIsOpen(false);
    }, [pathname,user]);
  return (
    <div className="flex justify-between md:flex md:justify-between border-b w-full pb-3 md:pb-5">
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button className="md:hidden ml-5">
            <Menu className="w-5" />
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="w-64 p-0">
          <AdminSideBar />
        </SheetContent>
      </Sheet>

      {/*input section */}
      <div className="md:flex hidden w-full max-w-md ">
        <Search className="relative left-7 top-2 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search..."
          className="bg-[#f1f3f5] border-none p-5 pl-8"
        />
      </div>

      {/*profile of admin section */}
      <div className="flex gap-2 mr-5 md:mr-10 text-sm">
        <div className="w-8 h-8 bg-[#f1f3f5] rounded-full flex justify-center items-center">
          {name.slice(0, 2).toUpperCase()}
        </div>
        <span className="relative top-1.5 font-medium">{name}</span>
      </div>
    </div>
  );
};
export default ProfileSection;
