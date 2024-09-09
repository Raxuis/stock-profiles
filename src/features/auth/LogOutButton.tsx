"use client";

import { LogOut } from "lucide-react";
import { signOutAction } from "./auth.action";
import { Button } from "@/components/ui/button";

export const LogOutButton = () => {
  return (
    <Button variant="ghost" size="sm">
      <LogOut className="size-4 cursor-pointer" onClick={() => {
        signOutAction();
      }} />
    </Button>
  )
}
