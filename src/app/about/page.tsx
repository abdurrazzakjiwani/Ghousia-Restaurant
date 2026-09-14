import { Flame, Heart, Utensils } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Welcome to Ghousia Golden Spoon, where tradition meets taste. We are a
          family-owned restaurant dedicated to bringing the authentic flavors of
          Pakistan to your table.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="card p-8 text-center">
          <Flame className="w-10 h-10 mx-auto text-gradient-start mb-4" />
          <h3 className="font-semibold text-lg mb-2">Authentic BBQ</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Our charcoal-grilled BBQ is prepared with traditional spices and
            recipes passed down through generations.
          </p>
        </div>
        <div className="card p-8 text-center">
          <Utensils className="w-10 h-10 mx-auto text-gradient-start mb-4" />
          <h3 className="font-semibold text-lg mb-2">Fresh Ingredients</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            We use only the freshest ingredients, sourced daily from local
            markets to ensure quality in every bite.
          </p>
        </div>
        <div className="card p-8 text-center">
          <Heart className="w-10 h-10 mx-auto text-gradient-start mb-4" />
          <h3 className="font-semibold text-lg mb-2">Made with Love</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Every dish is crafted with passion and care, because we believe food
            is not just nourishment, it&apos;s an experience.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Values</h2>
        <div className="space-y-4">
          {[
            { title: "Quality First", desc: "No compromise on the quality of our food and service." },
            { title: "Customer Satisfaction", desc: "Your satisfaction is our top priority." },
            { title: "Hygiene Standards", desc: "We maintain the highest standards of cleanliness and hygiene." },
            { title: "Community", desc: "Proudly serving the communities of Karachi with warmth and care." },
          ].map((v, i) => (
            <div key={i} className="card p-4 flex gap-4">
              <div className="w-1 bg-gradient-to-b from-gradient-start to-gradient-end rounded-full shrink-0" />
              <div>
                <h4 className="font-semibold">{v.title}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
