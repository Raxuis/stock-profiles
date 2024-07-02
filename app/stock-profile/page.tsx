/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from 'react';
import getStockProfile from '@/features/functions/stock-profile';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import { useZodForm, Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Badge from '@/components/pages-components/stock-profile/Badge';
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import type { StockDatasType } from "@/types/StockDatas.type.";
import createQuery from '@/features/stock-profile/createQuery';

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
        if (localStockSymbol) {
          setLocalStockSymbolFormatted(JSON.parse(localStockSymbol));
        }
      }
    };

    fetchData();
  }, []);

  const form = useZodForm({
    schema: FormSchema,
    defaultValues: {
      symbol: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      stocksData = await getStockProfile(data.symbol);
      const date = new Date();
      const isoDate = date.toISOString();

      stocksData = stocksData.map(stock => ({
        ...stock,
        queriedAt: isoDate,
      }));

      toast({
        title: "📈 Wow 📈",
        description: (
          <p className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">That&apos;s one small step for man, one giant leap for Stocks!</p>
        ),
      });

      localStorage.setItem("stockSymbol", JSON.stringify(stocksData));
      setLocalStockSymbolFormatted(stocksData);
      await createQuery(data.symbol, "StockProfile");
    } catch (error) {
      toast({
        title: "❌ You entered a wrong symbol ❌",
        description: (
          <p className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-red-500">Please, try rewriting your Stock Symbol. 😀</p>
        ),
      });
    }
  };

  const calculateTimeDifference = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <>
      <Form form={form} onSubmit={onSubmit}>
        <FormField
          name="symbol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock&apos;s Symbol</FormLabel>
              <FormControl>
                <Input autoFocus placeholder="Symbol" {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.symbol?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit" className='mt-3 max-sm:w-full'>Search</Button>
      </Form>
      {localStockSymbolFormatted && (
        <div className='mt-8 flex justify-center'>
          {localStockSymbolFormatted.map((stock) => (
            <Card key={stock.symbol} className='w-full sm:w-2/3 md:w-1/2'>
              <CardHeader className='flex items-center px-10 py-6'>
                {stock.image && <img src={stock.image} alt={stock.symbol} className='size-20' />}
                <div className='flex flex-col space-y-1.5 p-6'>
                  {stock.companyName && <CardTitle className='flex items-center'> {stock.companyName} {stock.symbol}</CardTitle>}
                  {stock.ceo && <CardDescription>CEO: {stock.ceo}</CardDescription>}
                  {stock.queriedAt && <CardDescription>Queried: {calculateTimeDifference(stock.queriedAt)}</CardDescription>}
                </div>
              </CardHeader>
              <CardContent className='flex flex-col space-y-6 '>
                <div className='space-y-4 px-2'>
                  {stock.sector && <p>Sector: {stock.sector}</p>}
                  <div className='flex gap-4'>
                    {stock.price && <p className='text-xl'>Price: {stock.price} {stock.currency}</p>}
                    {stock.changes && <Badge value={stock.changes} currency={stock.currency} />}
                  </div>
                </div>
                {stock.website && <a href={stock.website} target='_blank' className={buttonVariants({ variant: 'outline', size: 'lg' })}>Website: {stock.website}</a>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

export default StockProfile;