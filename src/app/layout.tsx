import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/providers/ThemeProvider";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ChatWidget from "@/components/chat/ChatWidget";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ghousia Golden Spoon - Authentic Pakistani Restaurant in Karachi",
  description:
    "Order delicious Pakistani food online. Burgers, BBQ, Karahi, Chinese, and more. Delivery across Karachi. Call 0301-3631555.",
  keywords: "Pakistani restaurant, Karachi food, BBQ, Karahi, delivery, online order",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
            <ChatWidget />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
