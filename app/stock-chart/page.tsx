"use client";
import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import DateRangePicker from "@/components/pages-components/stock-chart/date-range-picker";
import TimeframeSelect from "@/components/pages-components/stock-chart/timeframe-select";
import { toast } from "@/components/ui/use-toast";
import getStockChart from "@/features/functions/stock-chart";
import { StockInput } from "@/components/pages-components/stock-chart/stock-input";
import { format } from "date-fns";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import createQuery from "@/features/stock-profile/createQuery";


const letterRegex = /^[A-Z]+$/;

const StockSchema = z.string().regex(letterRegex, {
  message: "Stock's symbol must contain only capital letters.",
}).max(5, {
  message: "Stock's symbol mustn't be more than 5 characters.",
}).min(2, {
  message: "Stock's symbol must be at least 2 characters.",
});

const TimeframeSchema = z.enum([
  '1min', '5min',
  '15min', '30min',
  '1hour', '4hour'
]);

const DateRangeSchema = z.object({
  from: z.date(),
  to: z.date(),
});

const FormSchema = z.object({
  symbol: StockSchema,
  timeframe: TimeframeSchema,
  date: DateRangeSchema,
});

type FormSchemaType = z.infer<typeof FormSchema>;

type StockData = {
  date: string;
  open: number;
  close: number;
};

export default function StockChart() {

  const chartConfig = {
    open: {
      label: "Open",
      color: "#82ca9d",
    },
    close: {
      label: "Close",
      color: "#8884d8",
    },
  } satisfies ChartConfig;


  const { handleSubmit, control, formState: { errors } } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      symbol: "",
      timeframe: "1hour",
      date: { from: new Date(), to: new Date() },
    },
  });

  const [chartData, setChartData] = useState<StockData[]>([]);

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      const response: StockData[] = await getStockChart({
        symbol: data.symbol,
        timeframe: data.timeframe,
        from: format(data.date.from, "yyyy-MM-dd"),
        to: format(data.date.to, "yyyy-MM-dd"),
      });

      const sortedData = response.sort((a: StockData, b: StockData) => new Date(a.date).getTime() - new Date(b.date).getTime());
      console.log(sortedData);


      setChartData(sortedData);
      await createQuery(data.symbol, "StockChart");
      toast({
        title: "Nice One 🥳",
        description: "Congratulations! That's a hell of a query!",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred",
        description: "❌ Something badly occurred. Please try again ❌",
      });
    }
  };

  return (
    <div className="w-full space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          name="symbol"
          control={control}
          render={({ field }) => <StockInput stock={field.value} setStock={field.onChange} />}
        />
        {errors.symbol && <p className="text-red-500">{errors.symbol.message}</p>}

        <Controller
          name="date"
          control={control}
          render={({ field }) => <DateRangePicker date={field.value} setDate={field.onChange} />}
        />
        {errors.date && <p className="text-red-500">{errors.date.message}</p>}

        <Controller
          name="timeframe"
          control={control}
          render={({ field }) => <TimeframeSelect timeframe={field.value} setTimeFrame={field.onChange} />}
        />
        {errors.timeframe && <p>{errors.timeframe.message}</p>}

        <Button type="submit" className="max-sm:w-full">Submit</Button>
      </form>

      {chartData.length > 0 && (
        <div className='flex justify-center'>
          <Card className='mx-auto w-full p-4 pt-8'>
            <CardHeader className='flex flex-col space-y-2'>
              <CardTitle>Stock Chart</CardTitle>
              <CardDescription>
                Showing the stock price for the selected timeframe
              </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col space-y-6'>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    tickFormatter={(value) => format(value, "dd-MM / HH:mm")}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Area
                    dataKey="open"
                    type="natural"
                    fill="var(--color-open)"
                    fillOpacity={0.4}
                    stroke="var(--color-open)"
                    stackId="a"
                  />
                  <Area
                    dataKey="close"
                    type="natural"
                    fill="var(--color-close)"
                    fillOpacity={0.4}
                    stroke="var(--color-close)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}