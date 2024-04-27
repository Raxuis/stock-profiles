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
  title: "Get-Infos",
  description: "Welcome to Get-Infos, your ultimate destination for comprehensive and reliable information on a wide array of subjects.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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
