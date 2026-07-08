"use client";
import { Box,Star, Truck, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {

 const base="/user-account";
const pathName=usePathname();

const isActive=(path:string)=>pathName===path;

  return (
    <div className="my-10 px-4 grid grid-cols-1 md:grid-cols-2 md:max-w-7xl mx-auto gap-10">
      <aside>
          {/* Profile Section */}
 
    <div>
      <h1 className="font-bold md:text-lg">My Account</h1>
      <ul className="pt-3 ml-5 space-y-1">

        <Link href={base + "/profile"} className={`flex gap-2 ${isActive(base + "/profile")
          ? "text-[#DB4444]"
          :""
        }`}>
        <User className="w-5"/>
        <li className="text-sm md:text-base">My Profile </li>
        </Link>
        
         <Link href={base + "/shipping"}  className={`flex gap-2 ${isActive(base + "/shipping")
          ? "text-[#DB4444]"
          :""
        }`}>
        <Truck className="w-5"/>
        <li className="text-sm md:text-base">Address Book</li>
        </Link>
      
      <Link href={base + "/orders"}  className={`flex gap-2 ${isActive(base + "/orders")
          ? "text-[#DB4444]"
          :""
        }`}>
        <Box className="w-5"/>
        <li className="text-sm md:text-base">Orders</li>
        </Link>
      
      <Link href={base + "/reviews"} className={`flex gap-2 ${isActive(base + "/reviews")
          ? "text-[#DB4444]"
          :""
        }`}>
        <Star className="w-5"/>
        <li className="text-sm md:text-base">Reviews</li>
        </Link>
      </ul>
    </div>
  
      </aside>
      <div>
        {children}
      </div>
    </div>
  );
}