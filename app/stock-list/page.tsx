"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStockList } from '@/features/functions/stock.action';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const MAX_STOCKS = 10;  // Default  maximum number of stocks to display

const StockList = () => {
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['stocks'],
    queryFn: () => getStockList(),
  });

  if (isLoading || isFetching) {
    return <div>Loading stocks...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className='flex flex-wrap gap-4'>
      {data?.slice(0, MAX_STOCKS).map((stock: any) => (
        <Card key={stock.symbol} className='w-full sm:w-2/3 md:w-1/2'>
          <CardHeader className='flex items-center px-10 py-6'>
            {stock.symbol && (
              <CardTitle className='flex items-center'>
                {stock.symbol}
              </CardTitle>
            )}
            {stock.type && (
              <CardDescription>
                Type: {stock.type}
              </CardDescription>
            )}
            {stock.name && (
              <CardDescription>
                {stock.name}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className='flex flex-col space-y-6'>
            <div className='flex gap-4'>
              {stock.price && <p className='text-xl'>Price: {stock.price} {stock.currency}</p>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default function StockListPage() {
  return (
    <StockList />
  );
}
