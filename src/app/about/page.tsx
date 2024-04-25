import { Link } from 'next-view-transitions'
import React from 'react'

const About = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <div>
        <Link href='/'>Go to /</Link>
      </div>
    </main>
  )
}

export default About