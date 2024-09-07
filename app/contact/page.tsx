import ContactForm from '@/components/ContactForm';
import React from 'react';
import { AnimatedListDemo } from '@/components/notifications/AnimatedListDemo';

const Contact = () => {
  return (
    <div className="mt-10 flex flex-col space-y-10">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold">Contact</h1>
        <p className="text-lg">
          Have a question or want to work together?
        </p>
      </div>
      <div className="grid h-auto grid-cols-1 gap-4 sm:grid-cols-2 sm:flex-col">
        <div className="order-2 flex flex-col justify-center sm:order-none">
          <div className="size-full">
            <AnimatedListDemo />
          </div>
        </div>
        <div className="order-1 flex size-full items-center justify-center sm:order-none">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
