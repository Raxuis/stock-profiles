"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import DateRangePicker from "@/components/ui/date-range-picker";
import TimeframeSelect from "@/components/ui/timeframe-select";
import { useState } from "react";
import { DateRange } from "react-day-picker";
type Timeframe = '1min' | '5min' | '15min' | '30min' | '1hour' | '4hour';

export default function StockChart() {
  const [date, setDate] = useState<DateRange | undefined>();
  const [timeframe, setTimeFrame] = useState<Timeframe | undefined>();

  return (
    <div className="w-full space-y-6 sm:w-3/4">
      <div className="flex flex-col space-y-3">
        <DateRangePicker date={date} setDate={setDate} />
        <TimeframeSelect timeframe={timeframe} setTimeFrame={setTimeFrame} />
      </div>
      <Button type="submit" className='max-sm:w-full'>Submit</Button>
    </div>
  )
}
