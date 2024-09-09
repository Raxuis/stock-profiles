"use client";
import { Button, buttonVariants } from '@/components/ui/button';
import { useZodForm, Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { z } from 'zod';
import { FormNewsSchema } from '@/lib/validation';
import { Input } from '@/components/ui/input';
import { getStockNews } from '@/features/stocks/stock.action';
import { useState } from 'react';
import { StockNewsType } from '@/types/StockNews.type';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';


const StockNews = () => {

  const [news, setNews] = useState<StockNewsType[]>([]);

  const form = useZodForm({
    schema: FormNewsSchema,
    defaultValues: {
      symbol: 'AAPL'
    },
  });

  const onSubmit = async (data: z.infer<typeof FormNewsSchema>) => {
    try {
      const response = await getStockNews(data.symbol, data.number);
      setNews(response.stories);
      toast({
        title: "📈 Wow 📈",
        description: (
          <p className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">That&apos;s one small step for man, one giant leap for Stocks!</p>
        ),
      });
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
              <FormLabel>Stock&apos;s Symbol</FormLabel>
              <FormControl>
                <Input
                  autoFocus
                  placeholder="Symbol"
                  {...field}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.symbol?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField name="number" render={({ field }) => (
          <FormItem>
            <FormLabel>Number of news</FormLabel>
            <FormControl>
              <Input
                autoFocus
                placeholder="Number"
                type='number'
                {...field}
              />
            </FormControl>
            <FormMessage>{form.formState.errors.number?.message}</FormMessage>
          </FormItem>
        )} />
        <Button type="submit" className='mt-3 max-sm:w-full'>Search</Button>
      </Form>
      {news.length > 0 && (
        <div className='mt-8 flex w-full flex-col justify-center gap-4'>
          {news.map((news: StockNewsType) => (
            <Card key={news.url} className='w-full'>
              <CardHeader className='flex items-center px-10 py-6'>
                {news.favicon_url && <img src={news.favicon_url} alt={news.title} className='size-20' />}
                <div className='flex flex-col space-y-1.5 p-6'>
                  {news.title && <CardTitle className='flex items-center'> {news.title}</CardTitle>}
                </div>
              </CardHeader>
              <CardContent className='flex flex-col space-y-6 '>
                {news.description && <CardDescription>{news.description}</CardDescription>}
                {news.description && <a href={news.url} target='_blank' className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'text-ellipsis overflow-hidden')}>{news.url}</a>}
              </CardContent>
              <CardFooter className='flex items-center justify-between px-10 py-6'>
                {news.tags && news.tags.map((tag: string, idx: number) => (
                  <Badge key={idx}>
                    {tag.toUpperCase()}
                  </Badge>
                ))}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}

export default StockNews
