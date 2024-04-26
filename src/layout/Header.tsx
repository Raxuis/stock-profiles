"use client";
import Image from "next/image"
import { Layout } from "@/components/layout"
import { Link } from "next-view-transitions";
import { usePathname } from 'next/navigation'
import { buttonVariants } from "@/components/ui/button";


export const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-border">
      <Layout className="flex flex-row items-center gap-4">
        <Link href="/" className="group flex flex-1 items-center gap-2">
          <Image src="/favicon.ico" priority={true} width={42} height={42} alt="get-infos logo" className="duration-500 group-hover:scale-110" />
          <p className="text-lg">Get-Infos</p>
        </Link>
        {pathname === '/' ? (
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
        )}
      </Layout>
    </header>
  )
}
