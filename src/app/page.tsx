import Hero from "@/components/home/Hero";
import FeaturedMenu from "@/components/home/FeaturedMenu";
import AboutPreview from "@/components/home/AboutPreview";
import ReviewsSection from "@/components/home/ReviewsSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedMenu />
      <AboutPreview />
      <ReviewsSection />
    </>
  );
}
