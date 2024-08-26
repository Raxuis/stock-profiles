import Banner from "@/components/Banner";
import { Layout } from "@/components/layout";
import { LoggedInButton } from "@/features/auth/LoggedInButton";


export const Header = () => {
  return (
    <header className="w-full border-b border-border">
      <Layout className="flex flex-row items-center">
        <Banner />
        <LoggedInButton />
      </Layout>
    </header>
  )
}
