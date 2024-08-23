"use client";

import { LogOut } from "lucide-react";
import { signOutAction } from "./auth.action";

export const LogOutButton = () => {
  return (
    <LogOut className="size-4 cursor-pointer" onClick={() => {
      signOutAction();
    }} />
  )
}
