import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-gradient-start to-gradient-end text-white">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Ghousia Golden Spoon
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Authentic Pakistani cuisine with a modern touch. From sizzling BBQ to
            traditional karahi, we bring the flavors of Karachi to your table.
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
          </div>
        </div>
      </div>
    </section>
  );
}
