"use server";
import axios from 'axios';
import { env } from '@/env';
import { z } from 'zod';
const letterRegex = /^[A-Z]*$/;

const TimeframeSchema = z.enum(
  ['1min', '5min',
    '15min', '30min',
    '1hour', '4hour']
);

const StockSchema = z.string().regex(letterRegex, {
  message: "Stock's symbol must contain only capital letters.",
}).max(5, {
  message: "Stock's symbol mustn't be more than 5 characters.",
}).min(2, {
  message: "Stock's symbol must be at least 2 characters.",
});

type GetStockChartProps = {
  symbol: z.infer<typeof StockSchema>,
  timeframe: z.infer<typeof TimeframeSchema>,
  from: string,
  to: string,
}


export async function getStockChart({ symbol, timeframe, from, to }: GetStockChartProps) {
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

export async function getStockProfile(symbol: string) {
  try {
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/profile/${symbol}`, {
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

export async function getStockList() {
  try {
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/stock/list`, {
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
