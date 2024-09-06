import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

const Badge = ({ value, currency }: { value: number, currency: string }) => {
  const isPositive = value > 0
  const isNegative = value < 0

  if (isNaN(value)) return null

  const positiveClassname = 'bg-green-900/25 text-green-400 ring-green-400/25'
  const negativeClassname = 'bg-red-900/25 text-red-400 ring-red-400/25'

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${isPositive
        ? positiveClassname
        : negativeClassname
        }`}>
      {isPositive ? <ArrowUpRight className='size-3' /> : null}
      {isNegative ? <ArrowDownRight className='size-3' /> : null}
      {value > 0 ? `+${value.toFixed(2)}` : value.toFixed(2)} {currency}
    </span>
  )
}

export default Badge;
