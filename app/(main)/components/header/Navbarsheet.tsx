import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"


import { Apple, LogOut, Menu, MessageCircle, PackageOpen, Play, Settings, User } from "lucide-react"
import LoginDialog from "./logindialog"
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SheetDialog() {
  
    const {user} = useAuth();
    const {logout}= useAuth();
    const[sheetOpen,setSheetOpen]=useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

     useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const base="/user-account";
    return(
<Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
  <SheetTrigger>
      <Menu className="text-[#DB4444] w-10 mr-3"/>
    </SheetTrigger>
 <SheetContent side="left" className="w-10">
  <SheetHeader>
    {/*card*/}
    {!user?(
        <Card size="sm" className="mx-auto w-full max-w-sm mt-8">
      <CardContent className="font-bold text-sm md:text-lg">
        <p>
          Hurry Up!
        </p>
        <p>
          Register to get more discount on every products for 3 days.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center"> 
          <LoginDialog/>
      </CardFooter>
    </Card>
    ):(
      <Link href= {base +"/profile"} onClick={()=>setSheetOpen(false)}> 
      <div className="flex gap-2 mt-8 items-center hover:bg-gray-50 hover:dark:bg-zinc-800 py-2 rounded-lg">
        <div>
        <User className="w-5"/>
        </div>
        <div>
        <p className="text-sm">{name}</p>
        <p className="text-muted-foreground text-sm">{email}</p>
        </div>
      </div>
      </Link>
    )}
      
        <>
        <Link href="/contact" onClick={()=>setSheetOpen(false)}>
           <SheetTitle className="flex gap-2 items-center border-b font-semibold rounded-lg py-2 hover:bg-gray-50 hover:dark:bg-zinc-800 text-sm md:text-base">
                <MessageCircle className="w-5"/>
                Message Us
                </SheetTitle>
        </Link>
             
             <Link href="/" onClick={()=>setSheetOpen(false)}>
               <SheetTitle className="flex gap-2 items-center font-semibold hover:bg-gray-50 hover:dark:bg-zinc-800 rounded-lg py-2 text-sm md:text-base">
                <Apple className="w-5"/>
                App Store
                </SheetTitle>
              </Link>

             <Link href="/" onClick={()=>setSheetOpen(false)}>
                  <SheetTitle className="flex gap-2 items-center border-b font-semibold hover:bg-gray-50 hover:dark:bg-zinc-800 rounded-lg py-2 text-sm md:text-base">
                <Play className="w-5"/>
                Play store
                </SheetTitle>
              </Link>
        
           {user && (
            <>
            <Link href="/user-account/orders" onClick={()=>setSheetOpen(false)}>
            <SheetTitle className="flex gap-2 items-center font-semibold hover:bg-gray-50 hover:dark:bg-zinc-800 rounded-lg py-2 text-sm md:text-base">
                <PackageOpen className="w-5"/> 
                Orders
                </SheetTitle>
           </Link>

              <Link href={base + "/profile"} onClick={()=>setSheetOpen(false)}>
                <SheetTitle className="flex gap-2 items-center border-b font-semibold hover:bg-gray-50 hover:dark:bg-zinc-800 rounded-lg py-2 text-sm md:text-base">
                <Settings className="w-5"/>
               Account Settings
                </SheetTitle>
              </Link>
              
              <Link href="/" onClick={()=>setSheetOpen(false)} >
                 <SheetTitle onClick={logout} className="flex gap-2 mt-4 items-center border-b font-semibold cursor-pointer hover:bg-gray-50 hover:dark:bg-zinc-800 rounded-lg py-2 text-sm md:text-base">
                <LogOut className="w-5"/>
                Logout
                </SheetTitle>
              </Link>
                </>
                )}
          </>
          </SheetHeader>
        </SheetContent>
</Sheet>
    )
}


