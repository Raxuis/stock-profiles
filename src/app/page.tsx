import { Layout } from '@/components/layout'
import Bento from '@/components/pages-components/Bento';
import { buttonVariants } from '@/components/ui/button';
import { Header } from '@/layout/Header';
import { Link } from 'next-view-transitions'


export default function Home() {

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
        <Link
          className={buttonVariants(
            {
              variant: 'default',
              size: 'lg'
            }
          )}
          href='/'
          aria-disabled={true}
          style={{ pointerEvents: 'none', opacity: 0.5 }}
        >
          Already in Home
        </Link>
      </div>
      <Bento />
    </Layout>
  )
}