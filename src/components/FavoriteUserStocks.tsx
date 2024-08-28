"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './ui/table';

const FavoriteUserStocks = ({ favoriteStocks }: { favoriteStocks: { symbol: string }[] }) => {
  const router = useRouter();
  if (favoriteStocks.length === 0) return <div>No favorite stocks</div>;
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {favoriteStocks.map((stock) => (
            <TableRow className="cursor-pointer" key={stock.symbol} onClick={() => {
              router.push(`/stock-profile?stock=${stock.symbol}`);
            }}>
              <TableCell>- {stock.symbol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default FavoriteUserStocks;
