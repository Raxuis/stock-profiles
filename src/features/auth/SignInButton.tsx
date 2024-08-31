"use client";
import ShinyButton from "@/components/magicui/shiny-button";
import { buttonVariants } from "@/components/ui/button"
import { LogIn } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const SignInButton = () => {
  return <form>
    <ShinyButton
      href="/api/auth/signin"
      className={cn(
        buttonVariants({ variant: "secondary", size: "sm" }),
        "bg-primary/80 text-primary-foreground duration-500 hover:bg-primary/90",
      )} >
      <LogIn size={16} className="mr-2" />
      Sign In
    </ShinyButton>
  </form>
}
