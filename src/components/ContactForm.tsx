"use client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useZodForm } from '@/components/ui/form';
import { useState } from 'react'
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { ContactSchema } from '@/lib/validation';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { sendContactForm } from '@/features/contact/contact.action';
import { toast } from 'sonner';
import { Input } from './ui/input';

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useZodForm({
    schema: ContactSchema,
    defaultValues: {
      email: '',
      name: '',
      message: ''
    },
  });

  const onSubmit = async (data: z.infer<typeof ContactSchema>) => {
    setIsLoading(true);
    try {
      const result = await sendContactForm(data);
      toast.success("Message sent successfully");
    } catch (error) {
      toast.error(`Failed to send message: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form form={form} onSubmit={onSubmit} className="mx-auto mt-10 w-full max-w-md space-y-4 max-sm:px-2">
      <FormField control={form.control} name="name" render={({ field }) => (
        <FormItem>
          <FormLabel>Your name</FormLabel>
          <FormControl>
            <Input placeholder="John Doe" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={form.control} name="email" render={({ field }) => (
        <FormItem>
          <FormLabel>Your email</FormLabel>
          <FormControl>
            <Input placeholder="john.doe@example.com" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your message</FormLabel>
            <FormControl>
              <Textarea placeholder="A recommendation, a question, or anything else..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">{isLoading ? <Loader2 className="animate-spin" /> : "Send"}</Button>
    </Form>
  )
}

export default ContactForm
