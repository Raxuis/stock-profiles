import { currentUser } from "@/auth/current-user";

export default async function Home() {
  const user = await currentUser()
  if (!user) {
    return <p className="text-center text-3xl">Please sign in</p>
  }
  return (
    <p className="text-center text-3xl">Welcome {user!.name}!</p>
  )
}