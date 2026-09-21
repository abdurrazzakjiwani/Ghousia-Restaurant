"use client";

import Image from "next/image";
import { Flame, Heart, Utensils, Shield, Users, MapPin, Phone, Clock, ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { fadeInUp, staggerContainer, staggerItem, viewportConfig, slideInLeft, slideInRight } from "@/lib/animations";
import { useCountUp } from "@/hooks/useCountUp";

function StatNumber({ value, label, suffix = "+" }: { value: number; label: string; suffix?: string }) {
  const { ref, count } = useCountUp({ end: value });
  return (
    <div className="p-4 text-center" ref={ref}>
      <p className="text-3xl md:text-4xl font-bold text-white">{count}{suffix}</p>
      <p className="text-white/80 text-sm mt-1">{label}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div>
      {/* Hero Banner — T001, T002, T003 */}
      <motion.section
        className="relative min-h-[50vh] sm:min-h-[70vh] flex items-center justify-center text-white overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero1.webp"
            alt="Ghousia Golden Spoon restaurant interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
            From a small kitchen in Federal B Area to one of Karachi&apos;s most
            loved dining destinations — Ghousia Golden Spoon is a family legacy
            built on authentic flavors, traditional recipes, and a deep love for
            Pakistani cuisine.
          </p>
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-8 h-8 text-white/70" />
        </motion.div>
      </motion.section>

      {/* Origin Story — T004, T005, T006 */}
      <motion.section
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">How It All Began</h2>

          {/* Beat 1: Heritage — image right */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16"
            variants={fadeInUp}
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Born from a Family Kitchen</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Ghousia Golden Spoon was born from a simple idea: that the rich,
                complex flavors of Pakistani cuisine deserve to be shared with
                everyone. What started as a family kitchen in the heart of Federal
                B Area has grown into a beloved restaurant known for its
                charcoal-grilled BBQ, rich karahi, and traditional recipes that
                have been passed down through generations.
              </p>
            </div>
            <motion.div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg" variants={slideInRight}>
              <Image
                src="/images/food/bbq/BBQ Platter.png"
                alt="Signature BBQ platter with charcoal-grilled meats"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Beat 2: Craft — image left */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16"
            variants={fadeInUp}
          >
            <motion.div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg order-2 md:order-1" variants={slideInLeft}>
              <Image
                src="/images/food/bbq/Chicken Malai Boti.png"
                alt="Creamy malai chicken boti prepared with hand-ground spices"
                fill
                className="object-cover"
              />
            </motion.div>
            <div className="space-y-4 order-1 md:order-2">
              <h3 className="text-2xl font-bold">Traditional Techniques</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our founders grew up watching their grandmother prepare traditional
                dishes using hand-ground spice blends and time-honored cooking
                techniques. She believed that great food starts with the finest
                ingredients and a whole lot of love. That philosophy lives on in
                every dish we serve today.
              </p>
              <blockquote className="border-l-4 border-gradient-start pl-4 py-2 italic text-gray-500 dark:text-gray-400 text-lg">
                &ldquo;Great food starts with the finest ingredients and a whole lot of love.&rdquo;
              </blockquote>
            </div>
          </motion.div>

          {/* Beat 3: Community — image right */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            variants={fadeInUp}
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Serving Thousands Weekly</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Today, we serve thousands of happy customers every week — from
                families enjoying a weekend dinner to friends gathering over our
                signature Tikka Platter. Whether you dine in at our Hussainabad
                location or order delivery anywhere in Karachi, we bring the same
                passion and quality to every meal.
              </p>
            </div>
            <motion.div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg" variants={slideInRight}>
              <Image
                src="/images/branches/family-hall-1.jpg"
                alt="Ghousia Golden Spoon restaurant family dining hall"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Cooking Philosophy — T007, T008, T009 */}
      <motion.section
        className="py-16 bg-gray-50 dark:bg-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Cooking Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Flame,
                title: "Charcoal-Grilled Perfection",
                desc: "Our BBQ is prepared over natural charcoal, giving every kebab and tikka that authentic smoky flavor you can't get from a gas grill. The slow grilling process ensures tender, juicy meat every time.",
                image: "/images/food/bbq/Sizzling Tikka.png",
                alt: "Sizzling chicken tikka on charcoal grill",
              },
              {
                icon: Utensils,
                title: "Hand-Ground Spices",
                desc: "We grind our spice blends fresh daily using traditional methods. From our karahi masala to our chargha seasoning, every spice mix is crafted to bring out the authentic taste of Pakistani cuisine.",
                image: "/images/food/karahi/Chicken Red Karahi.png",
                alt: "Traditional chicken karahi with hand-ground spices",
              },
              {
                icon: Heart,
                title: "Made with Love",
                desc: "Every dish is prepared with the same care and attention as if we were cooking for our own family. We believe food is not just nourishment — it's an experience that brings people together.",
                image: "/images/food/bbq/Beef Bihari Boti.png",
                alt: "Tender beef bihari boti prepared with care",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="group relative min-h-80 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                variants={staggerItem}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center text-white">
                  <item.icon className="w-8 h-8 mb-3 opacity-90" />
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Bar — T010, T011 */}
      <motion.section
        className="py-16 bg-linear-to-r from-gradient-start to-gradient-end"
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatNumber value={39} label="Menu Items" />
            <StatNumber value={13} label="Categories" />
            <StatNumber value={1000} label="Weekly Customers" />
            <div className="p-4 text-center">
              <p className="text-3xl md:text-4xl font-bold text-white">Family</p>
              <p className="text-white/80 text-sm mt-1">Kitchen Since Day One</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Our Values */}
      <motion.section
        className="py-16"
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Shield, title: "Quality First", desc: "No compromise on the quality of our food and service. We source the freshest ingredients daily from local markets and maintain strict quality standards across every dish." },
              { icon: Users, title: "Customer Satisfaction", desc: "Your satisfaction is our top priority. From the moment you place your order to the last bite, we ensure every detail is perfect." },
              { icon: Heart, title: "Hygiene Standards", desc: "We maintain the highest standards of cleanliness and hygiene in our kitchen. Every dish is prepared in a clean, safe environment." },
              { icon: Flame, title: "Community", desc: "Proudly serving the communities of Karachi with warmth and care. We believe in giving back to the neighborhoods that have supported us." },
            ].map((v, i) => (
              <motion.div key={i} className="card p-6 flex gap-4" variants={staggerItem}>
                <div className="w-12 h-12 rounded-full bg-linear-to-r from-gradient-start to-gradient-end flex items-center justify-center shrink-0">
                  <v.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">{v.title}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact Section — T012, T013 */}
      <motion.section
        className="py-16 bg-gray-50 dark:bg-gray-900"
        initial="hidden"
        whileInView="visible"
        viewport={viewportConfig}
        variants={fadeInUp}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">Visit Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-gradient-start to-gradient-end flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Address</h4>
                  <p className="text-gray-600 dark:text-gray-400">Block 3, Federal B Area, Hussainabad, Gulberg Town, Karachi</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-gradient-start to-gradient-end flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <p className="text-gray-600 dark:text-gray-400">0321-8221010 / 0301-3631555</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-linear-to-r from-gradient-start to-gradient-end flex items-center justify-center shrink-0">
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
            <div className="rounded-2xl overflow-hidden shadow-lg h-64 sm:h-80 bg-gray-200 dark:bg-gray-800">
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
      </motion.section>
    </div>
  );
}
