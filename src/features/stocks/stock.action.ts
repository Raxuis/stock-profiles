"use server";
import axios from 'axios';
import { env } from '@/env';
import { GetStockChartProps } from '@/lib/validation';


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
