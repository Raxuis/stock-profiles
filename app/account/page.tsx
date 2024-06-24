import { currentUser } from "@/auth/current-user";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "next-view-transitions";

export default async function Home() {
  const user = await currentUser()
  if (user) {
    console.log(user)
    // const welcomeMessage = user?.firstName || user?.username;
    return (
      <p>welcome</p>
      // <p className="pt-2 text-center text-3xl">Welcome {welcomeMessage != null ? welcomeMessage : 'User'}!</p>
    )
  }
  return (
    <div className="flex flex-col items-center space-y-3">
      <p className="pt-2 text-3xl">Not logged</p>
      <p className="text-xl">Please log in</p>
      <div className="flex space-x-5">
        <Link href="/sign-in" className={buttonVariants(
          {
            variant: "outline"
          }
        )} >Sign In</Link>
        <Link href="/sign-up" className={buttonVariants(
          {
            variant: "outline"
          }
        )} >Sign Up</Link>
      </div>
    </div>
  )
}