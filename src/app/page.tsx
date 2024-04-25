import { Layout } from '@/components/layout'
import { buttonVariants } from '@/components/ui/ui/button';
import { Header } from '@/layout/Header';
import { Link } from 'next-view-transitions'


export default async function Home() {

  return (
    <Layout>
      <Header />
      <div className='flex w-full flex-row justify-center gap-10'>
        <Link className={buttonVariants(
          {
            variant: 'outline',
            size: 'lg',
          }
        )} href='/about'>Go to About</Link>
        <Link className={buttonVariants(
          {
            variant: 'outline',
            size: 'lg',
          }
        )} href='/about'>Go to Home</Link>
      </div>
    </Layout>
  );
}