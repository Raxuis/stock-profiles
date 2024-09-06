import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "sonner"

import { Header } from "@/layout/Header";
import { Layout } from "@/components/layout";
import TanStackProviders from "@/providers/TanstackProviders";
import { DockDemo } from "@/components/magicui/DockDemo";
import { getServerUrl } from "@/get-server-url";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Stocks Profiles",
  description: "Welcome to Stocks Profiles, your ultimate destination for comprehensive information on every stock.",
  metadataBase: new URL(getServerUrl())
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ViewTransitions>
        <html lang="en">
          <body className={`font-sans ${inter.variable}`}>
            <Toaster />
            <SonnerToaster richColors />
            <Layout>
              <Header />
              <TanStackProviders>
                {children}
              </TanStackProviders>
            </Layout>
            <DockDemo />
          </body>
        </html>
      </ViewTransitions>
    </SessionProvider>
  );
}
