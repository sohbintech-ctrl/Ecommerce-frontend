"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import LoginForm from "./loginform";



export default function LoginDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="mycolor" className="w-24">
          Login
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <LoginForm/>
      </DialogContent>
    </Dialog>
  );
}