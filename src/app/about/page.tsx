import { Layout } from '@/components/layout'
import Bento from '@/components/pages-components/Bento'
import { buttonVariants } from '@/components/ui/button'
import { Header } from '@/layout/Header'
import { Link } from 'next-view-transitions'
import React from 'react'

const About = () => {

  return (
    <Layout>
      <Header />
      <Bento />
    </Layout>
  )
}

export default About
