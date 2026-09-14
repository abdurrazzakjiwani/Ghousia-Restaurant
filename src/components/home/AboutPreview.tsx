import Link from "next/link";

export default function AboutPreview() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              Ghousia Golden Spoon brings the authentic flavors of Pakistan to your table.
              Our chefs use traditional recipes passed down through generations, combined
              with the finest ingredients to create an unforgettable dining experience.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              From our signature BBQ platters to our rich karahi and handi dishes,
              every meal is crafted with love and served with warmth.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center text-gradient-start hover:text-gradient-end font-semibold transition-colors"
            >
              Learn More About Us →
            </Link>
          </div>
          <div className="bg-gradient-to-br from-gradient-start to-gradient-end rounded-2xl p-8 text-white">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4">
                <p className="text-3xl font-bold">57+</p>
                <p className="text-white/80 text-sm">Menu Items</p>
              </div>
              <div className="p-4">
                <p className="text-3xl font-bold">13</p>
                <p className="text-white/80 text-sm">Categories</p>
              </div>
              <div className="p-4">
                <p className="text-3xl font-bold">5:30 PM</p>
                <p className="text-white/80 text-sm">Open Daily</p>
              </div>
              <div className="p-4">
                <p className="text-3xl font-bold">All KHI</p>
                <p className="text-white/80 text-sm">Delivery Areas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
