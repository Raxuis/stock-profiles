import { Section } from "@/components/Section";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/use-toast"
export const ProblemsSection = () => {

  async function handleClick() {
    toast({
      description: "That's only a demo...",
    });
  }
  const words = 'What is the price of Apple\'s Stock?';
  return (
    <Section>
      <motion.div initial={{
        x: -100
      }} whileInView={{
        x: 0
      }}
        transition={{
          type: "spring",
          stiffness: 100,
          duration: 0.5
        }} className="flex shrink-0 scale-[0.9] flex-col items-center justify-start space-y-6 py-14 text-center [perspective:800px] sm:scale-100 sm:py-28"
      >
        <div>
          <p className='text-3xl'>We will help you invest on the best stocks!</p>
          <h2 className="text-center text-xl font-bold">
            📈 Invest in the best stocks = Invest in your future life 👴
          </h2>
        </div>
        <Tabs defaultValue="before">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="before">Before Stocks-Profiles</TabsTrigger>
            <TabsTrigger value="after">After Stocks-Profiles</TabsTrigger>
          </TabsList>
          <TabsContent value="before">
            <Card>
              <CardHeader className="flex flex-col">
                <CardTitle>Before Stocks-Profiles</CardTitle>
                <CardDescription>
                  Oh no! I've got to search on the web to find stocks' prices.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <motion.div>
                  <p className="text-xl">{words}</p>
                </motion.div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="after">
            <Card>
              <CardHeader className="flex flex-col">
                <CardTitle>After Stocks-Profiles</CardTitle>
                <CardDescription>
                  Directly having stocks' prices when putting the symbol!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="new" className="flex self-start pb-1">Stock's Symbol</Label>
                  <Input type="text" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleClick}>Submit</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </Section>
  );
};
