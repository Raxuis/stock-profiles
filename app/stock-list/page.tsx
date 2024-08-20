"use client";

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStockList } from '@/features/functions/stock.action';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FaSpinner } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { useQueryState } from 'nuqs'

const MAX_STOCKS = 10;  // Default maximum number of stocks to display

const StockList = () => {
  const [stock, setStock] = useQueryState('stock');
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['stocks'],
    queryFn: () => getStockList(),
  });

  const filteredData = data?.filter((item: any) =>
    item?.symbol?.toLowerCase().includes(stock?.toLowerCase() || '') ||
    item?.name?.toLowerCase().includes(stock?.toLowerCase() || '')
  ) || [];

  if (isLoading || isFetching) {
    return (
      <div className='flex items-center justify-center gap-4 text-sm'>
        Loading stocks <FaSpinner className='animate-spin' />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }


  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <h1 className='text-2xl font-bold'>Stock List</h1>
      <Input
        placeholder='Search by symbol or name'
        className='w-full'
        value={stock || ''}
        onChange={e => setStock(e.target.value)}
      />
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {filteredData.slice(0, MAX_STOCKS).map((stock: any) => (
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
            <CardContent className='flex flex-col space-y-6'>
              <div className='flex gap-4'>
                {stock?.price && <p className='text-xl'>Price: {stock.price} {stock?.currency}</p>}
              </div>
            </CardContent>
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
