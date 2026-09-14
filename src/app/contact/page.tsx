import { Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  const phone1 = process.env.NEXT_PUBLIC_RESTAURANT_PHONE1 || "0321-8221010";
  const phone2 = process.env.NEXT_PUBLIC_RESTAURANT_PHONE2 || "0301-3631555";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Have a question or want to place a bulk order? Get in touch with us.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-semibold mb-6">Send us a message</h2>
          <ContactForm />
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold mb-6">Quick Contact</h2>
          <a
            href={`tel:${phone1}`}
            className="card p-6 flex items-center gap-4 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gradient-start to-gradient-end flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold">{phone1}</p>
              <p className="text-sm text-gray-500">Call for orders</p>
            </div>
          </a>
          <a
            href={`tel:${phone2}`}
            className="card p-6 flex items-center gap-4 hover:shadow-lg transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gradient-start to-gradient-end flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold">{phone2}</p>
              <p className="text-sm text-gray-500">WhatsApp orders</p>
            </div>
          </a>

          <div className="card p-6">
            <h3 className="font-semibold mb-2">WhatsApp Orders</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              For quick ordering, message us on WhatsApp with your order details.
            </p>
            <a
              href={`https://wa.me/923013631555?text=${encodeURIComponent("Assalam-o-Alaikum! I'd like to place an order.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
