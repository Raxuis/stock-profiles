"use client";
import { Button } from '@/components/ui/button';
import { useZodForm, Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { z } from 'zod';
import { FormNewsSchema } from '@/lib/validation';
import { Input } from '@/components/ui/input';


const StockNews = () => {


  const form = useZodForm({
    schema: FormNewsSchema,
    defaultValues: {
      symbol: 'AAPL',
      number: 5,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormNewsSchema>) => {
    try {
      toast({
        title: "📈 Wow 📈",
        description: (
          <p className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">That&apos;s one small step for man, one giant leap for Stocks!</p>
        ),
      });
    } catch (error) {
      toast({
        title: "❌ You entered a wrong symbol ❌",
        description: (
          <p className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-red-500">Please, try rewriting your Stock Symbol. 😀</p>
        ),
      });
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormField
        name="symbol"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Stock&apos;s Symbol</FormLabel>
            <FormControl>
              <Input
                autoFocus
                placeholder="Symbol"
                {...field}
              />
            </FormControl>
            <FormMessage>{form.formState.errors.symbol?.message}</FormMessage>
          </FormItem>
        )}
      />
      <FormField name="number" render={({ field }) => (
        <FormItem>
          <FormLabel>Number of news</FormLabel>
          <FormControl>
            <Input
              autoFocus
              placeholder="Number"
              type='number'
              {...field}
            />
          </FormControl>
          <FormMessage>{form.formState.errors.number?.message}</FormMessage>
        </FormItem>
      )} />
      <Button type="submit" className='mt-3 max-sm:w-full'>Search</Button>
    </Form>
  )
}

export default StockNews
