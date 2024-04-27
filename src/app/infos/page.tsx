"use client";
import { Layout } from '@/components/layout'
import { Header } from '@/layout/Header'
import React from 'react'
import { useQueryState } from 'nuqs'
import { useState } from 'react';
import getStocks from '@/features/queries/stocks';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
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
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'next-view-transitions';


const letterRegex = /^[A-Z]+$/;
let stocksData: StockDatasType[];

const Badge = ({ value, currency }: { value: number, currency: string }) => {
  const isPositive = value > 0
  const isNegative = value < 0

  if (isNaN(value)) return null

  const positiveClassname = 'bg-green-900/25 text-green-400 ring-green-400/25'
  const negativeClassname = 'bg-red-900/25 text-red-400 ring-red-400/25'

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${isPositive
        ? positiveClassname
        : negativeClassname
        }`}>
      {isPositive ? <ArrowUpRight className='size-3' /> : null}
      {isNegative ? <ArrowDownRight className='size-3' /> : null}
      {value} {currency}
    </span>
  )
}


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
          <p className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-red-500">Try rewriting your query.</p>
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
      {stocksData && (
        <div className='pt-8'>
          {stocksData.map((stock) => (
            <div key={stock.symbol} className="flex items-center justify-stretch space-x-10 rounded-lg border p-6">
              {stock.image ? <img src={stock.image} alt={stock.symbol} className='h-1/2' /> : null}
              <div className='flex flex-col items-center space-y-6'>
                {stock.companyName ? <p className='text-3xl'>{stock.companyName} {stock.symbol}</p> : null}
                <div className='flex gap-4'>
                  {stock.price ? <p className='text-xl'>Price : {stock.price} {stock.currency}</p> : null}
                  {
                    stock.changes ? <Badge
                      value={stock.changes}
                      currency={stock.currency}
                    />
                      : null}
                </div>
                {
                  stock.ceo ? <p className='text-xl'>CEO: {stock.ceo}</p> : null
                }
                {
                  stock.website ? <Link href={stock.website} className={buttonVariants(
                    {
                      variant: 'outline',
                      size: 'lg',
                    }
                  )}>Website: {stock.website}</Link> : null
                }
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Infos;
