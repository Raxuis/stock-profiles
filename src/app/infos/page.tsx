"use client";
import { Layout } from '@/components/layout'
import { Header } from '@/layout/Header'
import React from 'react'
import { useQueryState } from 'nuqs'
import { useState } from 'react';
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
import { useRouter } from 'next/navigation';
import type { StockDatasType } from "@/types/StockDatas";


const letterRegex = /^[A-Z]+$/;
let stocksData: StockDatasType[];


const FormSchema = z.object({
  symbol: z.string().regex(letterRegex, {
    message: "Stock's symbol must contain only capital letters.",
  }).max(5, {
    message: "Stock's symbol mustn't be more than 5 characters.",
  }).min(3, {
    message: "Stock's symbol must be at least 3 characters.",
  }),
});


const Infos = () => {
  const router = useRouter();
  // const [symbol, setSymbol] = useQueryState('symbol', { defaultValue: '' });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      symbol: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      stocksData = await getStocks(data.symbol);
      toast({
        title: "🥳 Wow 🥳",
        description: (
          <p className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">You successfully made a query!</p>
        ),
      })
      // router.push('/stocks-profile', stocksData);
    } catch (error) {
      toast({
        title: "❌ You entered a wrong symbol ❌",
        description: (
          <p className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-red-500">{
            String(error)
          }</p>
        ),
      })
    }
  }
  // const stocks = await getStocks(data.symbol);
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
      {stocksData == null ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 sm:w-3/4">
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
      ) : (
        <div>
          {stocksData.map((stock) => (
            <div key={stock.symbol}>
              <p>Symbol: {stock.symbol}</p>
              <p>Price: {stock.price}</p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Infos;
