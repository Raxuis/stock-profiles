import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod";

const letterRegex = /^[A-Z]+$/;

const StockSchema = z.string().regex(letterRegex, {
  message: "Stock's symbol must contain only capital letters.",
}).max(5, {
  message: "Stock's symbol mustn't be more than 5 characters.",
}).min(2, {
  message: "Stock's symbol must be at least 2 characters.",
});

interface StockInputProps {
  stock: z.infer<typeof StockSchema> | undefined;
  setStock: React.Dispatch<React.SetStateAction<z.infer<typeof StockSchema> | undefined>>;
}

export function StockInput({ stock, setStock }: StockInputProps) {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="stock">Stock Symbol</Label>
      <Input type="text" id="stock" placeholder="Stock Symbol" onChange={(e) => setStock(e.target.value)} />
    </div>
  );
}