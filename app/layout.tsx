import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { ViewTransitions } from "next-view-transitions";
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/layout/Header";
import { Layout } from "@/components/layout";


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
    <SessionProvider>
      <ViewTransitions>
        <html lang="en">
          <body className={`font-sans ${inter.variable}`}>
            <Toaster />
            <Layout>
              <Header />
              {children}
            </Layout>
          </body>
        </html>
      </ViewTransitions>
    </SessionProvider>
  );
}
