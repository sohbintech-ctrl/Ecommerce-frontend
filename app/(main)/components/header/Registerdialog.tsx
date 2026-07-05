"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";


import RegisterForm from "./Registerform";
import { useState } from "react";


export default function RegisterDialog() {
    const [open, setOpen] = useState(false);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <p className="text-[#DB4444] hover:underline">Sign Up</p>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <RegisterForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
} 