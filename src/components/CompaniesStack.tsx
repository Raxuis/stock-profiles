import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Apple, Bitcoin, Ebay, Facebook, Microsoft } from "@/constants/availableCompanies";

export const projects = [
  {
    image: <Apple />,
    text: "Apple Inc.",
    link: "https://apple.com",
  },
  {
    image: <Microsoft />,
    text: "Microsoft",
    link: "https://microsoft.com",
  },
  {
    image: <Bitcoin />,
    text: "Bitcoin",
    link: "https://bitcoin.org",
  },
  {
    image: <Ebay />,
    text: "Ebay",
    link: "https://ebay.com",
  },
  {
    image: <Facebook />,
    text: "Facebook",
    link: "https://facebook.com",
  },
  {
    image: "/tesla.svg",
    text: "Tesla",
    link: "https://tesla.com",
  },
  {
    image: "/nike.svg",
    text: "Nike",
    link: "https://nike.com",
  },
  {
    image: "/mcdonalds.svg",
    text: "McDonald's",
    link: "https://www.mcdonalds.com",
  },
];

export default function CompaniesStack() {
  return (
    <div className="mb-8 flex flex-col items-center justify-center space-y-14 sm:space-y-28">
      <p className="text-2xl font-bold">Stocks we provide</p>
      <div className="mx-auto max-w-5xl px-8">
        <HoverEffect items={projects} />
      </div>
    </div>
  );
}
