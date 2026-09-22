"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { staggerContainer, staggerItem, viewportConfig } from "@/lib/animations";

const faqs = [
  {
    question: "What are your opening hours?",
    answer: "We are open daily from 5:30 PM to 2:00 AM. We serve dinner and late-night meals seven days a week.",
  },
  {
    question: "Do you offer delivery? Which areas do you cover?",
    answer: "Yes, we deliver across all of Karachi. Whether you're in Federal B Area, Clifton, Defence, or any other part of the city, we'll bring hot and fresh food to your doorstep.",
  },
  {
    question: "How can I place an order?",
    answer: "You can order through multiple ways: directly from our website by clicking on any menu item, via WhatsApp at 0301-3631555, or by calling us at 0321-8221010. You can also visit us in person at any of our branches.",
  },
  {
    question: "Do you have family halls for events?",
    answer: "Yes! We have two large family halls available for weddings, dawat, and special occasions. They can accommodate large gatherings and can be booked by contacting us directly.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Cash on Delivery for all orders. For dine-in and pickup, you can pay with cash at the restaurant.",
  },
  {
    question: "Do you offer catering for large events?",
    answer: "Yes, we provide catering services for large events, parties, and corporate functions. Please contact us at least 24 hours in advance to discuss your requirements and customize a menu.",
  },
  {
    question: "Where are your branches located?",
    answer: "We have three branches: Ghousia Golden Spoon (Hussainabad, Opp. Masjid Hall, Block-3 FB Area), Ghousia Silver Spoon (914/3 Hussainabad), and Ghousia Fast Food & Chinese (914/3, opposite Silver Spoon). Visit our Branches page for details and map links.",
  },
  {
    question: "Can I customize my order?",
    answer: "Yes, you can add special instructions and notes when placing your order. Whether it's extra spice, no onions, or any other preference, we'll do our best to accommodate your request.",
  },
  {
    question: "Do you have vegetarian options?",
    answer: "Yes, we have several vegetarian options including Paneer Karahi, Vegetable dishes, French Fries, Naan, Salad, Raita, and more. Check our menu for the full selection.",
  },
  {
    question: "How can I contact you?",
    answer: "You can reach us by phone at 0321-8221010 or 0301-3631555, via WhatsApp at 0301-3631555, or through the contact form on our website. We're also on social media!",
  },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <motion.div
      className="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-md hover:border-orange-300 dark:hover:border-orange-600 transition-all"
      variants={staggerItem}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left group"
      >
        <span className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-gradient-start transition-colors pr-4">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pt-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
        >
          <motion.h2 className="text-3xl font-bold mb-4" variants={staggerItem}>
            Frequently Asked Questions
          </motion.h2>
          <motion.p className="text-gray-600 dark:text-gray-400" variants={staggerItem}>
            Everything you need to know about ordering from Ghousia Golden Spoon
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer}
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
