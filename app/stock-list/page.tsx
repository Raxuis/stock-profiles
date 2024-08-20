"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStockList } from '@/features/functions/stock.action';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FaSpinner } from 'react-icons/fa';

const MAX_STOCKS = 10;  // Default maximum number of stocks to display

const StockList = () => {
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['stocks'],
    queryFn: () => getStockList(),
  });

  if (isLoading || isFetching) {
    return (
      <div className='flex items-center justify-center gap-4 text-sm'>
        Loading stocks <FaSpinner className='animate-spin' />
      </div>
    );
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
      {data?.slice(0, MAX_STOCKS).map((stock: any) => (
        <Card key={stock.symbol} className='w-full'>
          <CardHeader className='flex flex-col items-center px-10 py-6'>
            {stock.symbol && (
              <CardTitle className='flex items-center'>
                {stock.symbol} ({stock.type && stock.type})
              </CardTitle>
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
