import Link from "next/link";
import { Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  const phone1 = process.env.NEXT_PUBLIC_RESTAURANT_PHONE1 || "0321-8221010";
  const phone2 = process.env.NEXT_PUBLIC_RESTAURANT_PHONE2 || "0301-3631555";
  const address = process.env.NEXT_PUBLIC_RESTAURANT_ADDRESS || "Block 3, Federal B Area, Hussainabad, Gulberg Town, Karachi";
  const hours = process.env.NEXT_PUBLIC_RESTAURANT_HOURS || "5:30 PM - 2:00 AM";

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              Ghousia Golden Spoon
            </h3>
            <p className="text-sm leading-relaxed">
              Authentic Pakistani cuisine with a modern touch. Serving Karachi&apos;s finest food since establishment.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/menu" className="block text-sm hover:text-white transition-colors">
                Our Menu
              </Link>
              <Link href="/about" className="block text-sm hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/reservation" className="block text-sm hover:text-white transition-colors">
                Reserve Table
              </Link>
              <Link href="/contact" className="block text-sm hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 shrink-0" />
                <div>
                  <a href={`tel:${phone1}`} className="hover:text-white">{phone1}</a>
                  <span className="mx-1">|</span>
                  <a href={`tel:${phone2}`} className="hover:text-white">{phone2}</a>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 shrink-0" />
                <span>{hours} (Daily)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Ghousia Golden Spoon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
