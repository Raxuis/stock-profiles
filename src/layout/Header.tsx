import Image from "next/image"
import { Layout } from "@/components/layout"
import Link from "next/link"

export const Header = async () => {
  return (
    <header className="w-full border-b border-border">
      <Layout className="flex flex-row items-center gap-4">
        <Link href="/" className="flex-1">
          <Image src="/favicon.ico" width={42} height={42} alt="get-infos logo" />
        </Link>
      </Layout>
    </header>
  )
}