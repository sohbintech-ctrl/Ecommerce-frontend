"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export const ModeToggle=()=> {
  const { theme,setTheme } = useTheme()

  return (
        <Button 
        variant="ghost"
        size="icon"
        onClick={()=>
          setTheme(theme==="dark"?"light":"dark")
        }
        >
          <Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-[#DB4444]"/> 
          <Moon className=" absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-[#DB4444]"/>
          <span className="sr-only">Toggle theme</span>
        </Button>

  )
}
