"use client";
import { Layout } from '@/components/layout'
import { Header } from '@/layout/Header'
import React from 'react'
import { useQueryState } from 'nuqs'
import getStocks from '@/features/queries/stocks';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { toast } from "@/components/ui/use-toast"

const FormSchema = z.object({
  symbol: z.string().max(5, {
    message: "Stock's symbol mustn't be more than 5 characters.",
  }).min(1, {
    message: "Stock's symbol must be at least 1 character.",
  }),
});


const Infos = () => {
  // const [symbol, setSymbol] = useQueryState('symbol', { defaultValue: '' });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      symbol: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "Nice One.",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  // const Stocks = async () => {
  //   try {
  //     const stocksData = await getStocks();
  //     console.log(stocksData);
  //   } catch (error) {
  //     console.error('Error fetching stocks:', error);
  //   }
  // };

  // useEffect(() => {
  //   Stocks();
  // }, []);

  return (
    <Layout>
      <Header />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 sm:w-2/3">
          <FormField
            control={form.control}
            name="symbol"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Stock&apos;s Symbol</FormLabel>
                <FormControl>
                  <Input autoFocus placeholder="Symbol" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className='max-sm:w-full'>Search</Button>
        </form>
      </Form>
      {/* <Input type='text' placeholder="Stock's Symbol" className='p-4' onChange={e => setSymbol(e.target.value || null)} />
      <p>Symbol : {symbol}</p> */}
    </Layout>
  );
};

export default Infos;
