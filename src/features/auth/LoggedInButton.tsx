import { currentUser } from "@/auth/current-user";
import { SignInButton } from "./SignInButton";
import { LogOutButton } from "./LogOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const LoggedInButton = async () => {
  const user = await currentUser();

  if (!user) {
    return (
      <SignInButton />
    )
  }
  return (
    <div className="flex items-center gap-2">
      {user.image && (
        <Avatar>
          <AvatarImage src={user.image} className="size-8" />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
      )}
      <LogOutButton />
    </div>
  )
}
