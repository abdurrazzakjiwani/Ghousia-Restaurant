"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Clock, MapPin, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { fadeInUp, viewportConfig } from "@/lib/animations";

const heroImages = ["/images/hero/hero1.webp", "/images/hero/hero2.webp", "/images/hero/hero3.webp"];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === 2 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) setIsPaused(true);
  }, []);

  const handleImageError = () => {
    setCurrentIndex((prev) => (prev === 2 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(false);
  };

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-gray-900 text-white">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Image
              src={heroImages[currentIndex]}
              alt={`Hero ${currentIndex + 1}`}
              fill
              priority={currentIndex === 0}
              onError={handleImageError}
              className="object-cover"
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <motion.div className="absolute inset-0 bg-black/20" style={{ y: bgY }} />
      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        style={{ opacity }}
      >
        <div className="max-w-2xl">
          <motion.div
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6"
            variants={fadeInUp}
          >
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Open Daily 5:30 PM – 2:00 AM</span>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            variants={fadeInUp}
          >
            Where Every Bite Tells a Story
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-white/90 mb-4"
            variants={fadeInUp}
          >
            Born in the heart of Federal B Area, Ghousia Golden Spoon brings you
            the authentic flavors of Pakistan — charcoal-grilled BBQ, rich karahi,
            and traditional recipes passed down through generations.
          </motion.p>
          <motion.p
            className="text-sm text-white/70 mb-8 flex items-center gap-1.5"
            variants={fadeInUp}
          >
            <MapPin className="w-4 h-4" />
            Block 3, Federal B Area, Hussainabad • Delivery across all of Karachi
          </motion.p>
          <motion.div className="flex flex-wrap gap-4" variants={fadeInUp}>
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
            <Link href="https://wa.me/923013631555?text=Hi!%20I%20d%20like%20to%20place%20an%20order" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
                Order on WhatsApp
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
              index === currentIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/75 w-3"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6 text-white/70" />
      </motion.div>
    </section>
  );
}
