import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { CinematicHero } from "@/components/sections/cinematic-hero";
import { SignatureOffersSection } from "@/components/sections/signature-offers";
import { LuxuryCategoryCardsSection } from "@/components/sections/luxury-category-cards";
import { FeaturedProductsSection } from "@/components/sections/featured-products";
import { StorytellingSection } from "@/components/sections/storytelling-section";
import { BrandValuesSection } from "@/components/sections/brand-values-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { PremiumOrderExperienceSection } from "@/components/sections/premium-order-experience";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home() {
  return (
    <div className="overflow-x-clip">
      <AnnouncementBar />
      <CinematicHero />
      <LuxuryCategoryCardsSection />
      <FeaturedProductsSection />
      <SignatureOffersSection />
      <StorytellingSection />
      <PremiumOrderExperienceSection />
      <BrandValuesSection />
      <TestimonialsSection />
    </div>
  );
}
