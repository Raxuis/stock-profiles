import { Layout } from '@/components/layout'
import { buttonVariants } from '@/components/ui/ui/button'
import { Header } from '@/layout/Header'
import { Link } from 'next-view-transitions'
import React from 'react'

const About = () => {
  return (
    <Layout>
      <Header />
      <Link className={buttonVariants(
        {
          variant: 'link',
          size: 'lg',
        }
      )} href='/'>Go to /</Link>
      <p>Hello There!</p>
    </Layout>
  )
}

export default About