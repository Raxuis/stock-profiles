"use client";
import Image from "next/image"
import { Layout } from "@/components/layout";
// import { usePathname } from 'next/navigation'
// import { buttonVariants } from "@/components/ui/button";
import { DropdownMenuItem, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Home, MoreHorizontal, Spline } from "lucide-react";
// import { cn } from "@/lib/utils";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";


export const Header = () => {
  // const pathname = usePathname();

  return (
    <header className="w-full border-b border-border">
      <Layout className="flex flex-row items-center">
        <Link href="/" className="group flex flex-1 items-center gap-2">
          <Image src="/icon.png" priority={true} width={42} height={42} alt="stocks-profiles-logo" className="duration-500 group-hover:scale-110" />
          <p className="text-lg">Stocks Profiles</p>
        </Link>
        {/* {pathname === '/' ? (
          <div className="flex gap-4">
            <Link href="/infos" className={buttonVariants(
              {
                variant: 'outline',
                size: 'lg',
              }
            )}>
              Infos
            </Link>
            <Link href="/about" className={buttonVariants(
              {
                variant: 'outline',
                size: 'lg',
              }
            )}>
              About
            </Link>
          </div>
        ) : pathname === '/about' ? (
          <div className="flex gap-4">
            <Link href="/infos" className={buttonVariants(
              {
                variant: 'outline',
                size: 'lg',
              }
            )}>
              Infos
            </Link>
            <Link href="/" className={buttonVariants({
              variant: 'outline',
              size: 'lg',
            })}>
              Home
            </Link>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link href="/about" className={buttonVariants(
              {
                variant: 'outline',
                size: 'lg',
              }
            )}>
              About
            </Link>
            <Link href="/" className={buttonVariants({
              variant: 'outline',
              size: 'lg',
            })}>
              Home
            </Link>
          </div>
        )} */}
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
              <Link href="/infos" className="w-full">
                <Spline size={16} className="mr-2" />
                Stocks
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/about" className="w-full">
                <MoreHorizontal size={16} className="mr-2" />
                About
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Layout>
    </header>
  )
}
