import { Layout } from '@/components/layout'
import { buttonVariants } from '@/components/ui/button'
import { Header } from '@/layout/Header'
import { Link } from 'next-view-transitions'
import React from 'react'

const About = () => {

  return (
    <Layout>
      <Header />
      <div className='flex w-full flex-row justify-center gap-10'>
        <Link className={buttonVariants(
          {
            variant: 'outline',
            size: 'lg',
          }
        )} href='/'>Go to Home</Link>
        <Link
          className={buttonVariants(
            {
              variant: 'default',
              size: 'lg'
            }
          )}
          href='/about'
          aria-disabled={true}
          style={{ pointerEvents: 'none', opacity: 0.5 }}
        >
          Already in About
        </Link>
      </div>
    </Layout>
  )
}

export default About
