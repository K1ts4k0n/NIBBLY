import {
  CategoryShop,
  FeaturedProducts,
  Hero,
  Ingredients,
  LifestyleAndBest,
  PromoReviewsNewsletter,
  WhyNibbly,
  HealthSnackFinderBanner,
} from "@/components/home/home-sections";
import { InteractiveProductShowcase } from "@/components/home/product-showcase";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <InteractiveProductShowcase />
      <CategoryShop />
      <HealthSnackFinderBanner />
      <Ingredients />
      <WhyNibbly />
      <LifestyleAndBest />
      <PromoReviewsNewsletter />
    </main>
  );
}
