"use client";
import { buttonVariants } from "@/components/ui/button"
import { LogIn } from "lucide-react";
import Link from "next/link";

export const SignInButton = () => {
  return <form>
    <Link href="/api/auth/signin"
      className={buttonVariants({ variant: "secondary", size: "sm" })}>
      <LogIn size={16} className="mr-2" />
      Sign In</Link>
  </form>
}