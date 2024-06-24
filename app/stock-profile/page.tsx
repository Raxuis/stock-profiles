/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from 'react'
import { cookieGetter, cookieSetter } from '@/features/functions/cookies';
import getStockProfile from '@/features/functions/stock-profile';
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Badge from '@/components/pages-components/stock-profile/Badge';
import { z } from "zod"
import { toast } from "@/components/ui/use-toast"
import type { StockDatasType } from "@/types/StockDatas";


const letterRegex = /^[A-Z]+$/;
let stocksData: StockDatasType[];


const FormSchema = z.object({
  symbol: z.string().regex(letterRegex, {
    message: "Stock's symbol must contain only capital letters.",
  }).max(5, {
    message: "Stock's symbol mustn't be more than 5 characters.",
  }).min(2, {
    message: "Stock's symbol must be at least 2 characters.",
  }),
});


const StockProfile = () => {
  const [localStockSymbolFormatted, setLocalStockSymbolFormatted] = useState<StockDatasType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== 'undefined') {
        const localStockSymbol = localStorage.getItem('stockSymbol') || '';
        const existingSymbol = await cookieGetter();
        if (existingSymbol == undefined) {
          console.log(JSON.parse(localStockSymbol))
          await cookieSetter(JSON.parse(localStockSymbol).value);
        }
        if (localStockSymbol) {
          setLocalStockSymbolFormatted(JSON.parse(localStockSymbol));
        }
      }
    };

    fetchData();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      symbol: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const existingSymbol = await cookieGetter();
      if (existingSymbol === data.symbol) {
        throw new Error('Already searched');
      }

      stocksData = await getStockProfile(data.symbol);

      toast({
        title: "📈 Wow 📈",
        description: (
          <p className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">That&apos;s one small step for man, one giant leap for Stocks!</p>
        ),
      });

      localStorage.setItem("stockSymbol", JSON.stringify(stocksData));

      setLocalStockSymbolFormatted(stocksData);

      await cookieSetter(data.symbol);
    } catch (error) {
      toast({
        title: "❌ You entered a wrong symbol ❌",
        description: (
          <p className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-red-500">Please, try rewriting your Stock Symbol. 😀</p>
        ),
      });
    }
  }



  return (
    <>
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
      {localStockSymbolFormatted !== null ? (
        <div className='mt-8 flex justify-center'>
          {localStockSymbolFormatted.map((stock) => (
            <Card key={stock.symbol} className='w-full sm:w-2/3 md:w-1/2'>
              <CardHeader>
                {stock.image !== null ? <img src={stock.image} alt={stock.symbol} className='size-20' /> : null}
                <div className='flex flex-col space-y-1.5 p-6'>
                  {stock.companyName !== null ? <CardTitle className='flex items-center'> {stock.companyName} {stock.symbol}</CardTitle> : null}
                  {
                    stock.ceo !== null ? <CardDescription>CEO: {stock.ceo}</CardDescription> : null
                  }
                </div>
              </CardHeader>
              <CardContent className='flex flex-col space-y-6'>
                <div className='space-y-4'>
                  {stock.sector !== null ? <p>Sector: {stock.sector}</p> : null}
                  <div className='flex gap-4'>
                    {stock.price !== null ? <p className='text-xl'>Price: {stock.price} {stock.currency}</p> : null}
                    {
                      stock.changes !== null ? <Badge
                        value={stock.changes}
                        currency={stock.currency}
                      />
                        : null}
                  </div>
                </div>
                {
                  stock.website !== null ? <a href={stock.website} target='_blank' className={buttonVariants(
                    {
                      variant: 'outline',
                      size: 'lg',
                    }
                  )}>Website: {stock.website}</a> : null
                }
              </CardContent>
            </Card>))}
        </div>
      ) : null}
    </>
  );
}

export default StockProfile;
