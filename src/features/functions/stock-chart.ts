"use server";
import axios from 'axios';
import { env } from '@/env';

type Timeframe = '1min' | '5min' | '15min' | '30min' | '1hour' | '4hour';

type GetStockChartProps = {
  symbol: string,
  timeframe: Timeframe,
  from: Date,
  to: Date,
}


export default async function getStockChart({ symbol, timeframe, from, to }: GetStockChartProps) {
  try {
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/historical-chart/${timeframe}/${symbol}?from=${from}&to=${to}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        apikey: env.STOCKS_API_KEY
      }
    });
    return response.data.length < 1 ? (() => { throw new Error(); })() : response.data;

  } catch (error) {
    throw new Error(String(error));
  }
}
