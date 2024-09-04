"use client";

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStockList } from '@/features/stocks/stock.action';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { VscLoading } from "react-icons/vsc";
import { AiOutlineStock } from "react-icons/ai";
import { useQueryState } from 'nuqs';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaStar } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { getUserFavorites } from '@/server/getUserFavorites';
import { MAX_STOCKS } from '@/constants/maxStocks';

const StockList = () => {
  const router = useRouter();
  const [stock, setStock] = useQueryState('stock');
  const [maxStocks, setMaxStocks] = useState(10);  // Default to 10 stocks
  const [showFavorites, setShowFavorites] = useState(false);
  const [disabledSlider, setDisabledSlider] = useState(false);
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ['stocks'],
    queryFn: () => getStockList(),
  });

  const { data: session, status } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [favoriteStocks, setFavoriteStocks] = useState<string[]>([]);

  useEffect(() => {
    if (status === 'authenticated') {
      setIsLoggedIn(true);
    }
  }, [status]);

  useEffect(() => {
    if (isLoggedIn) {
      getUserFavorites().then(favorites => {
        setFavoriteStocks(favorites as string[]);
      });
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <p>You are not logged in, please log in to see stock-list page.</p>;
  }

  const filteredData = data?.filter((item: any) => {
    const matchesSearch = item?.symbol?.toLowerCase().includes(stock?.toLowerCase() || '') ||
      item?.name?.toLowerCase().includes(stock?.toLowerCase() || '');
    return showFavorites ? (matchesSearch && favoriteStocks.includes(item.symbol)) : matchesSearch;
  }) || [];

  if (isLoading || isFetching) {
    return (
      <div className='mt-10 flex items-center justify-center gap-4 text-lg'>
        <AiOutlineStock className='size-6 animate-pulse' />  Loading stocks <VscLoading className='animate-spin' />
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
            <DropdownMenuItem className='flex flex-col items-center justify-center gap-4' disabled={disabledSlider}>
              <label htmlFor="maxStocksSlider">Max stocks: {maxStocks}</label>
              <Slider max={MAX_STOCKS} min={1} value={[maxStocks]} onValueChange={(value) => setMaxStocks(value[0] ?? 1)} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='flex w-full items-center justify-center'>
              <Button
                variant="outline"
                className='flex w-full items-center justify-center'
                onClick={() => {
                  setShowFavorites(!showFavorites);
                  setDisabledSlider(!showFavorites);
                }}
              >
                <FaStar className={showFavorites ? "text-yellow-500" : "text-gray-500"} />
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <motion.div className='grid grid-cols-1 gap-4 sm:grid-cols-2' initial="initial" animate="animate" transition={{
        staggerChildren: 0.1
      }}>
        {filteredData.slice(0, maxStocks).map((stock: any) => (
          <motion.div
            key={stock?.symbol || 'unknown'}
            variants={{
              initial: {
                opacity: 0,
                y: 20,
              },
              animate: {
                opacity: 1,
                y: 0,
              },
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
              mass: 2
            }}
            className='w-full'
          >
            <Card className='w-full'>
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
                <Button
                  onClick={() => router.push(`/stock-profile?stock=${stock.symbol}`)}
                  className="mt-10 h-10 w-full"
                >
                  Read More
                </Button>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default function StockListPage() {
  return (
    <StockList />
  );
}
