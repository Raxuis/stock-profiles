import { currentUser } from "@/auth/current-user";
import { SignInButton } from "./SignInButton";
import { LoggedInDropDown } from "./LoggedInDropDown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const LoggedInButton = async () => {
  const user = await currentUser();
  console.log(user);
  if (!user) {
    return (
      <SignInButton />
    )
  }
  return (
    <div className="flex gap-2">
      {user.image && (
        <Avatar>
          <AvatarImage src={user.image} className="size-8" />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
      )}
      <LoggedInDropDown />
    </div>
  )
}