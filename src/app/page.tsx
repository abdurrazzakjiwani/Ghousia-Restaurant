import Hero from "@/components/home/Hero";
import FeaturedMenu from "@/components/home/FeaturedMenu";
import GrillCharghaShowcase from "@/components/home/GrillCharghaShowcase";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import AboutPreview from "@/components/home/AboutPreview";
import PopularCategories from "@/components/home/PopularCategories";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";
import FAQSection from "@/components/home/FAQSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedMenu />
      <GrillCharghaShowcase />
      <WhyChooseUs />
      <AboutPreview />
      <PopularCategories />
      <Testimonials />
      <CTABanner />
      <FAQSection />
    </>
  );
}
