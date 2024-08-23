"use client";

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStockList } from '@/features/functions/stock.action';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { VscLoading } from "react-icons/vsc";
import { useQueryState } from 'nuqs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { useSession } from 'next-auth/react';


const MAX_STOCKS = 30;  // Maximum number of stocks to display

const StockList = () => {
  const [stock, setStock] = useQueryState('stock');
  const [maxStocks, setMaxStocks] = useState(10);  // Default to 10 stocks
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['stocks'],
    queryFn: () => getStockList(),
  });

  const { data: session, status } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      setIsLoggedIn(true);
    }
  }, [status]);

  if (!isLoggedIn) {
    return <p>You are not logged in, please log in to see stock-list page.</p>;
  }

  const filteredData = data?.filter((item: any) =>
    item?.symbol?.toLowerCase().includes(stock?.toLowerCase() || '') ||
    item?.name?.toLowerCase().includes(stock?.toLowerCase() || '')
  ) || [];

  if (isLoading || isFetching) {
    return (
      <div className='flex items-center justify-center gap-4 text-lg'>
        Loading stocks <VscLoading className='animate-spin' />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }



  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <div className='flex w-full items-center justify-between gap-4'>
        <Input
          className='grow'
          placeholder='Search by symbol or name'
          value={stock || ''}
          onChange={e => setStock(e.target.value)}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline" className="size-8">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className='flex flex-col items-center justify-center gap-4'>
              <label htmlFor="maxStocksSlider">Max stocks: {maxStocks}</label>
              <Slider max={MAX_STOCKS} min={1} value={[maxStocks]} onValueChange={(value) => setMaxStocks(value[0] ?? 1)} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {filteredData.slice(0, maxStocks).map((stock: any) => (
          <Card key={stock?.symbol || 'unknown'} className='w-full'>
            <CardHeader className='flex flex-col items-center px-10 py-6'>
              {stock?.symbol && (
                <CardTitle className='flex items-center'>
                  {stock.symbol} {stock?.type && `(${stock.type})`}
                </CardTitle>
              )}
              {stock?.name && (
                <CardDescription>
                  {stock.name}
                </CardDescription>
              )}
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default function StockListPage() {
  return (
    <StockList />
  );
}
