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
import type { StockDatasType } from "@/types/StockDatas";
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

      toast({
        title: "📈 Wow 📈",
        description: (
          <p className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">That's one small step for man, one giant leap for Stocks!</p>
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

  return (
    <>
      <Form form={form} onSubmit={onSubmit}>
        <FormField
          name="symbol"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock's Symbol</FormLabel>
              <FormControl>
                <Input autoFocus placeholder="Symbol" {...field} />
              </FormControl>
              <FormMessage>{form.formState.errors.symbol?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button type="submit" className='max-sm:w-full mt-3'>Search</Button>
      </Form>
      {localStockSymbolFormatted && (
        <div className='mt-8 flex justify-center'>
          {localStockSymbolFormatted.map((stock) => (
            <Card key={stock.symbol} className='w-full sm:w-2/3 md:w-1/2'>
              <CardHeader>
                {stock.image && <img src={stock.image} alt={stock.symbol} className='size-20' />}
                <div className='flex flex-col space-y-1.5 p-6'>
                  {stock.companyName && <CardTitle className='flex items-center'> {stock.companyName} {stock.symbol}</CardTitle>}
                  {stock.ceo && <CardDescription>CEO: {stock.ceo}</CardDescription>}
                </div>
              </CardHeader>
              <CardContent className='flex flex-col space-y-6'>
                <div className='space-y-4'>
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
