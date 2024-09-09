"use client";
import { Button, buttonVariants } from '@/components/ui/button';
import { useZodForm, Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { z } from 'zod';
import { FormNewsSchema } from '@/lib/validation';
import { Input } from '@/components/ui/input';
import { getStockNews } from '@/features/stocks/stock.action';
import { useEffect, useState } from 'react';
import { StockNewsType } from '@/types/StockNews.type';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import createQuery from '@/features/stock-profile/createQuery';
import { useSession } from 'next-auth/react';
import { AiOutlineLoading, AiOutlineShareAlt } from 'react-icons/ai';
import { formatDistance } from 'date-fns';
import { ConfettiButton } from "@/components/magicui/confetti";



const StockNews = () => {

  const [news, setNews] = useState<StockNewsType[]>([]);
  const { data: session, status } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState<boolean[]>(Array(news.length).fill(false));

  useEffect(() => {
    if (status === 'authenticated') {
      setIsLoggedIn(true);
    }
  }, [status]);

  const form = useZodForm({
    schema: FormNewsSchema,
    defaultValues: {
      symbol: 'AAPL'
    },
  });

  const copyLink = (index: number, link: string) => {
    navigator.clipboard.writeText(link);
    setIsCopied(prev => {
      const newCopied = [...prev];
      newCopied[index] = true; // Setting the copied state for the specific index
      return newCopied;
    });

    setTimeout(() => {
      setIsCopied(prev => {
        const newCopied = [...prev];
        newCopied[index] = false; // Resetting the copied state for the specific index
        return newCopied;
      });
    }, 2000);
  }

  const onSubmit = async (data: z.infer<typeof FormNewsSchema>) => {
    try {
      setIsLoading(true);
      const response = await getStockNews(data.symbol, data.number);
      setNews(response.stories);
      await createQuery(data.symbol, "StockNews");
      toast({
        title: "📈 Wow 📈",
        description: (
          <p className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">That&apos;s one small step for man, one giant leap for Stocks!</p>
        ),
      });
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "❌ You entered a wrong symbol ❌",
        description: (
          <p className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-red-500">Please, try rewriting your Stock Symbol. 😀</p>
        ),
      });
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return <p>You are not logged in, please log in to see stock-news page.</p>;
  }

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
        <Button type="submit" className='mt-3 max-sm:w-full'>
          {
            isLoading
              ? <AiOutlineLoading className='animate-spin' />
              : 'Search'
          }
        </Button>
      </Form>
      {news.length > 0 && (
        <div className='mt-8 flex w-full flex-col justify-center gap-4'>
          {news.map((news: StockNewsType, index: number) => (
            <Card key={news.url} className='w-full'>
              <CardHeader className='flex items-center gap-4 px-10 py-6'>
                {news.favicon_url && <img src={news.favicon_url} alt={news.title} className='size-20' />}
                <div className='flex flex-col gap-2'>
                  {news.title && <CardTitle className='flex items-center'> {news.title}</CardTitle>}
                  {news.time && <CardDescription className='text-xs'>{formatDistance(new Date(news.time), new Date())} ago</CardDescription>}
                </div>
              </CardHeader>
              <CardContent className='flex flex-col space-y-6'>
                {news.description && <CardDescription>{news.description}</CardDescription>}
              </CardContent>
              <CardFooter className='flex items-center justify-between px-10 py-6'>
                <div className='flex gap-2'>
                  {news.tags && news.tags.map((tag: string, idx: number) => (
                    <Badge key={idx}>
                      {tag.toUpperCase()}
                    </Badge>
                  ))}
                </div>
                <div className='flex items-center gap-2'>
                  <Button variant='outline' size='lg' asChild>
                    <a href={news.url} target='_blank'>Read More</a>
                  </Button>
                  <ConfettiButton asChild variant='outline' size='lg' className='cursor-pointer text-white'>
                    <p onClick={() => copyLink(index, news.url)}>
                      {
                        isCopied[index]
                          ? "Copied"
                          : <AiOutlineShareAlt size={16} />
                      }
                    </p>
                  </ConfettiButton>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}

export default StockNews
