import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type TimeframeType = '1min' | '5min' | '15min' | '30min' | '1hour' | '4hour';
interface TimeFrameProps {
  timeframe: TimeframeType | undefined,
  setTimeFrame: React.Dispatch<React.SetStateAction<TimeframeType | undefined>>,
}
export default function TimeframeSelect({ timeframe, setTimeFrame }: TimeFrameProps) {
  const timeframes: TimeframeType[] = [
    '1min', '5min', '15min', '30min', '1hour', '4hour'
  ];

  return (
    <Select onValueChange={(value: string) => setTimeFrame(value as TimeframeType)} >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Timeframe" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Timeframes</SelectLabel>
          {
            timeframes.map((e) => {
              return (
                <SelectItem
                  key={e}
                  value={e}
                >
                  {e}
                </SelectItem>
              );
            })
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
