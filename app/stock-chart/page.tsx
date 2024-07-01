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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
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
            <CardContent className='flex flex-col space-y-6'>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="close" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="open" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
