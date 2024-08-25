import { z } from "zod";
const letterRegex = /^[A-Z0-9.-]+$/;

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


export const TimeframeSchema = z.enum(
  ['1min', '5min',
    '15min', '30min',
    '1hour', '4hour']
);


export const SymbolSchema = z.string().regex(letterRegex, {
  message: "Stock's symbol must contain only capital letters, numbers, dots, or dashes.",
}).max(10, {
  message: "Stock's symbol mustn't be more than 10 characters.",
}).min(1, {
  message: "Stock's symbol must be at least 1 character.",
});

export type GetStockChartProps = {
  symbol: z.infer<typeof SymbolSchema>,
  timeframe: z.infer<typeof TimeframeSchema>,
  from: string,
  to: string,
}

export const ContactSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(1, { message: "Name is required" }),
  message: z.string().min(1, { message: "Message is required" })
});
