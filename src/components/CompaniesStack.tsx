import { HoverEffect } from "@/components/ui/card-hover-effect";
import { companies } from "@/constants/availableCompanies";

export default function CompaniesStack() {
  return (
    <div className="mb-8 flex flex-col items-center justify-center space-y-14 sm:space-y-16">
      <p className="text-4xl font-bold">Stocks we provide</p>
      <div className="mx-auto max-w-5xl px-8">
        <HoverEffect items={companies} />
      </div>
    </div>
  );
}
