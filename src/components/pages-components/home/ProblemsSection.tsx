import { Section } from "@/components/Section";
import { motion } from "framer-motion";

export const ProblemsSection = () => {
  return (
    <Section>
      <motion.div initial={{
        x: -100
      }} whileInView={{
        x: 0
      }} className="flex min-h-screen shrink-0 scale-[0.9] flex-col items-center justify-start py-16 text-center [perspective:800px] sm:scale-100 sm:py-32"
      >
        <p className='text-3xl'>We will help you invest on the best stocks!</p>
        <h2 className="text-center text-xl font-bold">
          📈 Invest in the best stocks = Invest in your future life 👴
        </h2>
        <div className="m-auto mt-8 flex flex-col">
        </div>
      </motion.div>
    </Section>
  );
};
