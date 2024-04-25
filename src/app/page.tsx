import { Layout } from '@/components/layout'
import { buttonVariants } from '@/components/ui/ui/button';
import { Header } from '@/layout/Header';
import { Link } from 'next-view-transitions'


export default async function Home() {

  return (
    <Layout>
      <Header />
      <Link className={buttonVariants(
        {
          variant: 'link',
          size: 'lg',
        }
      )} href='/about'>Go to /about</Link>
    </Layout>
  );
}