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

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <CategoryShop />
      <HealthSnackFinderBanner />
      <Ingredients />
      <WhyNibbly />
      <LifestyleAndBest />
      <PromoReviewsNewsletter />
    </main>
  );
}

