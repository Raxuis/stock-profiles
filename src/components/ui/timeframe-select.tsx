import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Timeframe = '1min' | '5min' | '15min' | '30min' | '1hour' | '4hour';
interface TimeFrameProps {
  timeframe: string | undefined,
  setTimeFrame: React.Dispatch<React.SetStateAction<Timeframe | undefined>>,
}
export default function TimeframeSelect({ timeframe, setTimeFrame }: TimeFrameProps) {
  const timeframes: Timeframe[] = [
    '1min', '5min', '15min', '30min', '1hour', '4hour'
  ]
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Timeframe" />
      </SelectTrigger>
      <SelectContent>
        {
          timeframes.map((timeframe) => (
            <SelectItem
              key={timeframe}
              value={timeframe}
              onClick={() => setTimeFrame(timeframe)}
            >
              {timeframe}
            </SelectItem>
          ))
        }
      </SelectContent>
    </Select>

  )
}
