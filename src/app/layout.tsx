import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/layout/Header";
import { Layout } from "@/components/layout";
import { ClerkProvider } from '@clerk/nextjs';


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
          <ClerkProvider>
            <TRPCReactProvider>
              <Toaster />
              <Layout>
                <Header />
                {children}
              </Layout>
            </TRPCReactProvider>
          </ClerkProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
