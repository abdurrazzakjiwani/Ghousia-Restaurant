import { MapPin, Phone, Clock } from "lucide-react";
import Link from "next/link";
import MapEmbed from "@/components/contact/MapEmbed";

export default function LocationPage() {
  const phone1 = process.env.NEXT_PUBLIC_RESTAURANT_PHONE1 || "0321-8221010";
  const phone2 = process.env.NEXT_PUBLIC_RESTAURANT_PHONE2 || "0301-3631555";
  const address = process.env.NEXT_PUBLIC_RESTAURANT_ADDRESS || "Block 3, Federal B Area, Hussainabad, Gulberg Town, Karachi";
  const hours = process.env.NEXT_PUBLIC_RESTAURANT_HOURS || "5:30 PM - 2:00 AM";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Find Us</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Visit us at our restaurant or order for delivery across Karachi
        </p>
        <Link
          href="/branches"
          className="inline-flex items-center mt-4 text-gradient-start hover:text-gradient-end font-semibold transition-colors"
        >
          View all branches →
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <MapEmbed />
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-gradient-start shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Address</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{address}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-gradient-start shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <a href={`tel:${phone1}`} className="hover:text-gradient-start">{phone1}</a>
                  <span className="mx-2">|</span>
                  <a href={`tel:${phone2}`} className="hover:text-gradient-start">{phone2}</a>
                </p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-gradient-start shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Hours</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{hours}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Open daily</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
