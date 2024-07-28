import { z } from "zod";

export const StockChartValidationSchema = z.object({
  symbol: z.string().regex(/^[A-Z]+$/, "Stock's symbol must contain only capital letters.").max(5, "Stock's symbol mustn't be more than 5 characters.").min(2, "Stock's symbol must be at least 2 characters."),
  timeframe: z.enum(
    [
      "1min",
      "5min",
      "15min",
      "30min",
      "1hour",
      "4hour"
    ]
  ),
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
});