import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "@/components/ui/toaster"


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Stocks Profiles",
  description: "Welcome to Stocks Profiles, your ultimate destination for comprehensive information on every stock.",
  icons: [{ rel: "icon", url: "/icon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en">
        <body className={`font-sans ${inter.variable}`}>
          <TRPCReactProvider>
            <Toaster />
            {children}
          </TRPCReactProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
