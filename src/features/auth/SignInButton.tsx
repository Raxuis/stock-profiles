"use client";
import { Button, buttonVariants } from "@/components/ui/button"
import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";

export const SignInButton = () => {
  return <form>
    <Button onClick={
      async () => {
        await signIn();
      }
    } className={buttonVariants(
      {
        variant: 'secondary',
        size: 'sm',
      }
    )}>
      <LogIn size={16} className="mr-2" />
      Sign In</Button>
  </form>
}