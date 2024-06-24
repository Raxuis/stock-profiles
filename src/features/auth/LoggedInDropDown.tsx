"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Activity, Building2, Fingerprint, Home, LogOut, User } from "lucide-react";
import { RxHamburgerMenu } from "react-icons/rx";

import Link from "next/link"
import { signOutAction } from "./auth.action";

export const LoggedInDropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <RxHamburgerMenu size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Link href="/" className="w-full">
            <Home size={16} className="mr-2" />
            Home
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account" className="w-full">
            <User size={16} className="mr-2" />
            Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/stock-profile" className="w-full">
            <Building2 size={16} className="mr-2" />
            Stock Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/stock-chart" className="w-full">
            <Activity size={16} className="mr-2" />
            Stock Chart
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/about" className="w-full">
            <Fingerprint size={16} className="mr-2" />
            About
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            signOutAction();
          }}
        >
          <LogOut size={16} className="mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}