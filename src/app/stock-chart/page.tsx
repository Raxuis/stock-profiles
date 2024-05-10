"use client";
import { Button } from "@/components/ui/button";
import DateRangePicker from "@/components/pages-components/stock-chart/date-range-picker";
import TimeframeSelect from "@/components/pages-components/stock-chart/timeframe-select";
import { toast } from "@/components/ui/use-toast";
import getStockChart from "@/features/functions/stock-chart";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { StockInput } from "@/components/pages-components/stock-chart/stock-input";
import { format } from "date-fns";



const TimeframeSchema = z.enum(
  ['1min', '5min',
    '15min', '30min',
    '1hour', '4hour']
);
const letterRegex = /^[A-Z]+$/;

const StockSchema = z.string().regex(letterRegex, {
  message: "Stock's symbol must contain only capital letters.",
}).max(5, {
  message: "Stock's symbol mustn't be more than 5 characters.",
}).min(2, {
  message: "Stock's symbol must be at least 2 characters.",
});

export default function StockChart() {
  const [date, setDate] = useState<DateRange | undefined>();
  const [timeframe, setTimeFrame] = useState<z.infer<typeof TimeframeSchema> | undefined>();
  const [symbol, setSymbol] = useState<z.infer<typeof StockSchema> | undefined>();

  useEffect(() => {
    console.log(symbol)
  }, [symbol, setSymbol])

  // const form = useForm<z.infer<typeof FormSchema>>({
  //   resolver: zodResolver(FormSchema),
  // })


  // function onSubmit(data: z.infer<typeof FormSchema>) {
  //   console.log('submitted', data)
  //   toast({
  //     title: "You submitted the following values:",
  //     description: (
  //       <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
  //         <code className="text-white">{JSON.stringify(data, null, 2)}</code>
  //       </pre>
  //     ),
  //   })
  // }

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      if (!symbol || !timeframe || !date?.from || !date?.to) {
        toast({
          title: "You didn't fill all inputs..",
          description: "❌ Please try again❌",
        });
        return;
      }
      console.log()
      const chartData = await getStockChart({
        symbol: symbol,
        timeframe: timeframe,
        from: format(date.from, "yyyy-MM-dd"),
        to: format(date.to, "yyyy-MM-dd")
      });
      console.log(chartData);
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "❌ Something badly occurred. Please try again ❌",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6 sm:w-3/4">
      <div className="flex flex-col space-y-3">
        <StockInput stock={symbol} setStock={setSymbol} />
        <DateRangePicker date={date} setDate={setDate} />
        <TimeframeSelect timeframe={timeframe} setTimeFrame={setTimeFrame} />
      </div>
      <Button type="submit" className='max-sm:w-full'>Submit</Button>
    </form>
  )
}
