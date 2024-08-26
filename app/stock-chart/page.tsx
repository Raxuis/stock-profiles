"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import DateRangePicker from "@/components/pages-components/stock-chart/date-range-picker";
import TimeframeSelect from "@/components/pages-components/stock-chart/timeframe-select";
import { toast } from "@/components/ui/use-toast";
import { getStockChart } from "@/features/stocks/stock.action";
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
import { StockChartValidationSchema } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { exportAsPDF } from "@/features/export/export";

type StockData = {
  date: string;
  open: number;
  close: number;
};

export default function StockChart() {

  const [chartData, setChartData] = useState<StockData[]>([]);
  const [exportSymbol, setExportSymbol] = useState<string>(""); // State to store the export symbol to avoid user changing it

  const form = useForm<z.infer<typeof StockChartValidationSchema>>({
    resolver: zodResolver(StockChartValidationSchema),
    defaultValues: {
      symbol: "",
      timeframe: "1hour",
      date: { from: new Date(), to: new Date() },
    },
  })

  const { data: session, status } = useSession();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      setIsLoggedIn(true);
    }
  }, [status]);

  if (!isLoggedIn) {
    return <p>You are not logged in, please log in to see stock-chart page.</p>;
  }

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

  const onSubmit = async (values: z.infer<typeof StockChartValidationSchema>) => {
    try {
      const response: StockData[] = await getStockChart({
        symbol: values.symbol,
        timeframe: values.timeframe,
        from: format(values.date.from, "yyyy-MM-dd"),
        to: format(values.date.to, "yyyy-MM-dd"),
      });

      const sortedData = response.sort((a: StockData, b: StockData) => new Date(a.date).getTime() - new Date(b.date).getTime());

      setChartData(sortedData);
      setExportSymbol(values.symbol);

      await createQuery(values.symbol, "StockChart");
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

  const handleExport = () => {
    const chartDataString = JSON.stringify(chartData, null, 2);
    exportAsPDF(chartDataString, `${exportSymbol}-datas.pdf`);
  };

  return (
    <div className="w-full space-y-6">
      <Form form={form} onSubmit={onSubmit}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="symbol"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Input placeholder="AAPL" {...field} />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          <FormField name="date" render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Date</FormLabel>
              <DateRangePicker date={field.value} setDate={field.onChange} />
              <FormMessage className="text-red-400" />
            </FormItem>
          )} />
          <FormField name="timeframe" render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Timeframe</FormLabel>
              <TimeframeSelect timeframe={field.value} setTimeFrame={field.onChange} />
              <FormMessage className="text-red-400" />
            </FormItem>
          )} />

          <Button type="submit" className="max-sm:w-full">Submit</Button>
        </div>
      </Form>

      {chartData.length > 0 && (
        <div className='flex justify-center'>
          <Card className='mx-auto w-full p-4 pt-8'>
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
                    tickFormatter={(value) => format(value, "yyyy-MM-dd / HH:mm")}
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
            <CardFooter>
              <Button onClick={handleExport} className="max-sm:w-full">Export Chart datas to PDF</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
