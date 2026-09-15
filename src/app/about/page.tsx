import { Flame, Heart, Utensils, Shield, Users, MapPin, Phone, Clock } from "lucide-react";

export default function AboutPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-gradient-start to-gradient-end text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            From a small kitchen in Federal B Area to one of Karachi&apos;s most
            loved dining destinations — Ghousia Golden Spoon is a family legacy
            built on authentic flavors, traditional recipes, and a deep love for
            Pakistani cuisine.
          </p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">How It All Began</h2>
          <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-400 space-y-6">
            <p>
              Ghousia Golden Spoon was born from a simple idea: that the rich,
              complex flavors of Pakistani cuisine deserve to be shared with
              everyone. What started as a family kitchen in the heart of Federal
              B Area has grown into a beloved restaurant known for its
              charcoal-grilled BBQ, rich karahi, and traditional recipes that
              have been passed down through generations.
            </p>
            <p>
              Our founders grew up watching their grandmother prepare traditional
              dishes using hand-ground spice blends and time-honored cooking
              techniques. She believed that great food starts with the finest
              ingredients and a whole lot of love. That philosophy lives on in
              every dish we serve today.
            </p>
            <p>
              Today, we serve thousands of happy customers every week — from
              families enjoying a weekend dinner to friends gathering over our
              signature Tikka Platter. Whether you dine in at our Hussainabad
              location or order delivery anywhere in Karachi, we bring the same
              passion and quality to every meal.
            </p>
          </div>
        </div>
      </section>

      {/* Cooking Philosophy */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Cooking Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center">
              <Flame className="w-10 h-10 mx-auto text-gradient-start mb-4" />
              <h3 className="font-semibold text-lg mb-2">Charcoal-Grilled Perfection</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Our BBQ is prepared over natural charcoal, giving every kebab and
                tikka that authentic smoky flavor you can&apos;t get from a gas grill.
                The slow grilling process ensures tender, juicy meat every time.
              </p>
            </div>
            <div className="card p-8 text-center">
              <Utensils className="w-10 h-10 mx-auto text-gradient-start mb-4" />
              <h3 className="font-semibold text-lg mb-2">Hand-Ground Spices</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We grind our spice blends fresh daily using traditional methods.
                From our karahi masala to our chargha seasoning, every spice mix
                is crafted to bring out the authentic taste of Pakistani cuisine.
              </p>
            </div>
            <div className="card p-8 text-center">
              <Heart className="w-10 h-10 mx-auto text-gradient-start mb-4" />
              <h3 className="font-semibold text-lg mb-2">Made with Love</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Every dish is prepared with the same care and attention as if
                we were cooking for our own family. We believe food is not just
                nourishment — it&apos;s an experience that brings people together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Shield, title: "Quality First", desc: "No compromise on the quality of our food and service. We source the freshest ingredients daily from local markets and maintain strict quality standards across every dish." },
              { icon: Users, title: "Customer Satisfaction", desc: "Your satisfaction is our top priority. From the moment you place your order to the last bite, we ensure every detail is perfect." },
              { icon: Heart, title: "Hygiene Standards", desc: "We maintain the highest standards of cleanliness and hygiene in our kitchen. Every dish is prepared in a clean, safe environment." },
              { icon: Flame, title: "Community", desc: "Proudly serving the communities of Karachi with warmth and care. We believe in giving back to the neighborhoods that have supported us." },
            ].map((v, i) => (
              <div key={i} className="card p-6 flex gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gradient-start to-gradient-end flex items-center justify-center shrink-0">
                  <v.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">{v.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Visit Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gradient-start to-gradient-end flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Address</h4>
                  <p className="text-gray-600 dark:text-gray-400">Block 3, Federal B Area, Hussainabad, Gulberg Town, Karachi</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gradient-start to-gradient-end flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <p className="text-gray-600 dark:text-gray-400">0321-8221010 / 0301-3631555</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gradient-start to-gradient-end flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Hours</h4>
                  <p className="text-gray-600 dark:text-gray-400">Open Daily: 5:30 PM – 2:00 AM</p>
                </div>
              </div>
              <a
                href="https://wa.me/923013631555?text=Hi!%20I%27d%20like%20to%20reserve%20a%20table"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
              >
                Reserve on WhatsApp
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.0!2d67.0!3d24.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sFederal%20B%20Area%2C%20Karachi!5e0!3m2!1sen!2spk!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ghousia Golden Spoon Location"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
