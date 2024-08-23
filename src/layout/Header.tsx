import Image from "next/image"
import { Layout } from "@/components/layout";
import Link from "next/link";
import { LoggedInButton } from "@/features/auth/LoggedInButton";


export const Header = () => {
  return (
    <header className="w-full border-b border-border">
      <Layout className="flex flex-row items-center">
        <Link href="/" className="group flex flex-1 items-center gap-2">
          <Image src="/icon.png" priority={true} width={30} height={30} alt="stocks-profiles-logo" className="duration-500 group-hover:scale-105" />
          <p className="text-lg">Stocks Profiles</p>
        </Link>
        <LoggedInButton />
      </Layout>
    </header>
  )
}
