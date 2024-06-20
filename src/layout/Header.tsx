import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image"
import { Layout } from "@/components/layout";
import { DropdownMenuItem, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Activity, Building2, Fingerprint, Home, User } from "lucide-react";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { Avatar, AvatarImage } from "@/components/ui/avatar";


export const Header = async () => {
  const user = await currentUser()

  return (
    <header className="w-full border-b border-border">
      <Layout className="flex flex-row items-center">
        <Link href="/" className="group flex flex-1 items-center gap-2">
          <Image src="/icon.png" priority={true} width={30} height={30} alt="stocks-profiles-logo" className="duration-500 group-hover:scale-105" />
          <p className="text-lg">Stocks Profiles</p>
        </Link>
        {
          user?.imageUrl ? (
            <Avatar className="size-6">
              <AvatarImage src={user?.imageUrl} alt={"user's profile picture"} />
            </Avatar>
          ) : null
        }
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
          </DropdownMenuContent>
        </DropdownMenu>
      </Layout>
    </header>
  )
}