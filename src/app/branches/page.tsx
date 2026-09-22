import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { branches, familyHalls } from "@/lib/branches-data";

export const metadata = {
  title: "Our Branches - Ghousia Golden Spoon",
  description: "Find Ghousia Golden Spoon restaurant branches across Karachi. Visit us at Hussainabad, Federal B Area.",
};

export default function BranchesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Branches</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Find us at any of our locations across Karachi
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {branches.map((branch) => (
          <div key={branch.name} className="card overflow-hidden">
            <div className="relative h-56 bg-linear-to-br from-gradient-start to-gradient-end">
              <Image
                src={branch.image}
                alt={branch.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{branch.name}</h2>
              <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400 mb-4">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm">{branch.address}</p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold text-sm transition-colors"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">That&apos;s not all — we also have two large family halls for you</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Perfect for weddings, dawat, and special occasions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {familyHalls.map((hall) => (
          <div key={hall.name} className="card overflow-hidden">
            <div className="relative h-64 bg-linear-to-br from-gradient-start to-gradient-end">
              <Image
                src={hall.image}
                alt={hall.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{hall.name}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          href="/"
          className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
