"use server";
import axios from 'axios';
import { env } from '@/env';

// interface queryStocks {
//   req: string;
//   res: JSON;
// }
export default async function getStocks(symbol: string) {
  try {
    const response = await axios.get('https://financialmodelingprep.com/api/v3/search', {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        query: symbol,
        apikey: env.STOCKS_API_KEY
      }
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}