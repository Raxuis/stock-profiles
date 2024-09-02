import ContactForm from '@/components/ContactForm'
import React from 'react'
import { AnimatedListDemo } from '@/components/notifications/AnimatedListDemo'

const Contact = () => {
  return (
    <div className='mt-10 grid h-[500px] grid-cols-12 place-items-center gap-4'>
      <div className='col-span-6 flex flex-col justify-center'>
        <div className='size-full overflow-hidden'>
          <AnimatedListDemo />
        </div>
      </div>
      <div className='col-span-6 flex size-full items-center justify-center'>
        <ContactForm />
      </div>
    </div>
  )
}

export default Contact
