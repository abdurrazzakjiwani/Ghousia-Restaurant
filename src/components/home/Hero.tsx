import Link from "next/link";
import Button from "@/components/ui/Button";
import { Clock, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-gradient-start to-gradient-end text-white">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Open Daily 5:30 PM – 2:00 AM</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Where Every Bite Tells a Story
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-4">
            Born in the heart of Federal B Area, Ghousia Golden Spoon brings you
            the authentic flavors of Pakistan — charcoal-grilled BBQ, rich karahi,
            and traditional recipes passed down through generations.
          </p>
          <p className="text-sm text-white/70 mb-8 flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            Block 3, Federal B Area, Hussainabad • Delivery across all of Karachi
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/menu">
              <Button variant="secondary" size="lg" className="border-white text-white hover:bg-white/20">
                View Menu
              </Button>
            </Link>
            <Link href="/reservation">
              <Button size="lg" className="bg-white text-gradient-start hover:bg-gray-100">
                Reserve Table
              </Button>
            </Link>
            <Link href="https://wa.me/923013631555?text=Hi!%20I%27d%20like%20to%20place%20an%20order" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
                Order on WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
