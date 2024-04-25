import { Layout } from '@/components/layout'
import { buttonVariants } from '@/components/ui/button';
import { Header } from '@/layout/Header';
import { Link } from 'next-view-transitions'


export default function Home() {

  const isAboutPage = true;

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
          aria-disabled={isAboutPage ? 'true' : 'false'}
          style={{ pointerEvents: isAboutPage ? 'none' : 'auto', opacity: isAboutPage ? 0.5 : 1 }}
        >
          Already in Home
        </Link>
      </div>
    </Layout>
  )
}