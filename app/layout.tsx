import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import { SearchBarProvider } from "@/lib/SearchContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "arc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SearchBarProvider>
          <Sidebar />
          {children}
        </SearchBarProvider>
      </body>
    </html>
  );
}
