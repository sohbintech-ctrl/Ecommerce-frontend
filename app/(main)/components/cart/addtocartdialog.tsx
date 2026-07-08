"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import LoginForm from "../header/loginform";


export default function AddtoCartDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="mycolor" className="w-auto md:w-24 rounded-full">
          Add to cart
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <LoginForm/>
      </DialogContent>
    </Dialog>
  );
}
