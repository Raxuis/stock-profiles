"use client";
import { Layout } from '@/components/layout'
import { Header } from '@/layout/Header'
import React, { useEffect } from 'react'
import getStocks from '@/features/queries/stocks';

const Infos = () => {
  const Stocks = async () => {
    try {
      const stocksData = await getStocks();
      console.log(stocksData);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  useEffect(() => {
    Stocks();
  }, []);

  return (
    <Layout>
      <Header />
      <p className='text-3xl'>Just testing</p>
    </Layout>
  );
};

export default Infos;
