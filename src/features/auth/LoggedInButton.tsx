import { currentUser } from "@/auth/current-user";
import { SignInButton } from "./SignInButton";
import { LoggedInDropDown } from "./LoggedInDropDown";

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
        <div className="size-7 rounded-full">
          <img src={user.image} className="rounded-full" />
        </div>
      )}
      <LoggedInDropDown />
    </div>
  )
}