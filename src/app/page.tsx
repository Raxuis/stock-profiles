import { Layout } from '@/components/layout'
import Bento from '@/components/pages-components/Bento';
import { buttonVariants } from '@/components/ui/button';
import { Header } from '@/layout/Header';
import { Link } from 'next-view-transitions'


export default function Home() {

  return (
    <Layout>
      <Header />
      <Bento />
    </Layout>
  )
}