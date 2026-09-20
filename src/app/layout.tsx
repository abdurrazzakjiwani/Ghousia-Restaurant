import type { Metadata } from "next";
import { Inter, Poppins, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeProvider from "@/components/providers/ThemeProvider";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import SpooniFAB from "@/components/ui/SpooniFAB";
import { ChatProvider } from "@/components/chat/ChatContext";
import { CartProvider } from "@/contexts/CartContext";
import GroqChatWidget from "@/components/chat/GroqChatWidget";
import BackToTop from "@/components/ui/BackToTop";
import PageTransition from "@/components/layout/PageTransition";
import LocationPrompt from "@/components/ui/LocationPrompt";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-poppins",
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Ghousia Golden Spoon - Authentic Pakistani Restaurant in Karachi",
  description:
    "Order delicious Pakistani food online. Burgers, BBQ, Karahi, Chinese, and more. Delivery across Karachi. Call 0301-3631555.",
  keywords: "Pakistani restaurant, Karachi food, BBQ, Karahi, delivery, online order",
  icons: {
    icon: "/images/logo/Logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${poppins.variable} ${dmSans.variable}`}>
        <LocationPrompt />
        <ThemeProvider>
          <ChatProvider>
            <CartProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">
                  <PageTransition>{children}</PageTransition>
                </main>
                <Footer />
                <WhatsAppButton />
                <SpooniFAB />
                <GroqChatWidget />
                <BackToTop />
              </div>
            </CartProvider>
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
