"use server";
import axios from 'axios';
import { env } from '@/env';

export default async function getStocks(symbol: string) {
  try {
    const response = await axios.get(`https://financialmodelingprep.com/api/v3/profile/${symbol}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        apikey: env.STOCKS_API_KEY
      }
    });
    console.log(response.data)

    return response.data;
  } catch (error) {
    throw new Error(String(error));
  }
}
