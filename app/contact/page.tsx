import ContactForm from '@/components/ContactForm'
import React from 'react'

const Contact = () => {
  return (
    <div className="mt-5 flex flex-col justify-center space-y-10 max-sm:px-4 sm:space-y-24">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold">Contact</h1>
        <p className="text-sm">
          If you have any question or feedback, please feel free to contact us.
        </p>
      </div>
      <ContactForm />
    </div>
  )
}

export default Contact
