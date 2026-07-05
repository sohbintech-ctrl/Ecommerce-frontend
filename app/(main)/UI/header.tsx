"use client";

import { Input} from "@/components/ui/input";
import { Search, ShoppingCart, SmartphoneCharging } from "lucide-react";
import { ModeToggle } from "../components/header/modetoggle";
import LoginDialog from "../components/header/logindialog";
import SheetDialog from "../components/header/Navbarsheet";
import { useAuth } from "../context/authContext";
import { useState } from "react";
import Link from "next/link";
import AddToCartSheet from "../components/cart/addtoCartSheet";
import { Button } from "@/components/ui/button";
import { deflate } from "zlib";
import { useCart } from "../context/cartcontext";

const Header=()=>{
  const {user}=useAuth();
  const { cart} = useCart();
  const [openSearch, setOpenSearch] = useState(false);
  const [open, setOpen] = useState(false);

    return (
      <header className="bg-gray-100 dark:bg-zinc-900 py-4">
        <div className="flex justify-evenly md:flex md:max-w-7xl md:m-auto">
          {/* Mobile and desktop menu */}
          <SheetDialog />

          {/* Logo */}
          <Link href="/">
            <div className="md:bg-[#DB4444] md:px-10 md:rounded-lg flex gap-2 rounded-full bg-[#DB4444] px-2">
              <SmartphoneCharging className="w-6 mt-1 text-white" />
              <h1 className="hidden md:block md:font-bold text-2xl text-white">
                Exclusive
              </h1>
            </div>
          </Link>
          {/*Desktop Search */}
          <div className="hidden md:flex w-full ml-3">
            <Input
              type="text"
              placeholder="Search products..."
              className="rounded-2xl"
            />
            <Search className="relative right-7 mt-1 w-4 text-[#DB4444]" />
          </div>

          {/*Mobile Search */}
          <div className="md:hidden ml-3">
            <Search
              className="w-4 text-[#DB4444] cursor-pointer relative top-1"
              onClick={() => setOpenSearch(true)}
            />
          </div>

          {openSearch && (
            <div className="fixed top-0 left-0 w-full flex gap-2 bg-gray-100 dark:bg-zinc-900 p-3 z-50">
              <Input
                autoFocus
                placeholder="Search products..."
                className="w-full rounded-xl"
              />

              <button
                onClick={() => setOpenSearch(false)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          )}

          {/* Right side */}
          <div className="flex gap-4">
            <ModeToggle />
            {!user ? (
              //not logged in
              <LoginDialog />
            ) : (
              <div className="relative inline-block">
                <Button
                  onClick={() => setOpen(true)}
                  variant="mycolor"
                  className="w-auto"
                >
                  <ShoppingCart className="w-4" />
                </Button>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {cart.length}
                  </span>
                )}
                <AddToCartSheet open={open} setOpen={setOpen} />
              </div>
            )}
          </div>
        </div>
      </header>
    );
}
export default Header;



