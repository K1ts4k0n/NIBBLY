"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShoppingBag, Star, Sparkles, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { HEALTH_GOALS, HealthGoalId, getRecommendations } from "@/data/health-recommendations";
import { ProductArt } from "@/components/ui/product-art";
import { useCart } from "@/components/providers/cart-provider";
import { useLanguage } from "@/components/providers/language-provider";

export function HealthMatrix() {
  const { add } = useCart();
  const { lang } = useLanguage();
  const [activeGoalId, setActiveGoalId] = useState<HealthGoalId>("weight-control");
  const [addedItemSlug, setAddedItemSlug] = useState<string | null>(null);

  const activeGoal = HEALTH_GOALS.find((g) => g.id === activeGoalId) || HEALTH_GOALS[0];
  const recommendations = getRecommendations(activeGoalId);

  const handleAddToCart = (product: (typeof recommendations)[0]["product"]) => {
    add(product);
    setAddedItemSlug(product.slug);
    setTimeout(() => setAddedItemSlug(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Category Pills Slider/Grid */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
        {HEALTH_GOALS.map((goal) => {
          const isSelected = activeGoalId === goal.id;
          return (
            <button
              key={goal.id}
              onClick={() => setActiveGoalId(goal.id)}
              className={`flex flex-col items-center justify-center rounded-2xl border p-3.5 text-center transition ${
                isSelected
                  ? "border-[#354B2D] bg-[#354B2D] text-white shadow-md ring-2 ring-[#354B2D]/20"
                  : "border-[#d8c79e]/80 bg-white text-[#354B2D] hover:bg-[#FFF9E9]"
              }`}
            >
              <span className="text-2xl">{goal.icon}</span>
              <span className="mt-1.5 text-xs font-bold leading-tight">
                {lang === "th" ? goal.titleTh : goal.titleEn}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Goal Deep Dive Card */}
      <motion.div
        key={activeGoal.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[32px] border border-[#d8c79e] bg-gradient-to-br from-[#FFF9EA] via-[#FFF5DE] to-[#FFEECB] p-6 sm:p-8"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#354B2D] shadow-2xs">
              <span>{activeGoal.icon}</span>
              <span>{lang === "th" ? activeGoal.subtitleTh : activeGoal.subtitleEn}</span>
            </div>
            <h2 className="mt-2 font-display text-2xl font-bold text-[#354B2D] sm:text-3xl">
              {lang === "th" ? activeGoal.titleTh : activeGoal.titleEn}
            </h2>
            <p className="mt-2 max-w-3xl text-xs leading-relaxed text-stone-700 sm:text-sm">
              {lang === "th" ? activeGoal.descriptionTh : activeGoal.descriptionEn}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 lg:max-w-xs">
            {(lang === "th" ? activeGoal.keyNutrientsTh : activeGoal.keyNutrientsEn).map((nut) => (
              <span
                key={nut}
                className="rounded-full border border-[#354B2D]/20 bg-white/80 px-3 py-1 text-[11px] font-bold text-[#354B2D]"
              >
                ✓ {nut}
              </span>
            ))}
          </div>
        </div>

        {/* Nutritionist Tip Note */}
        <div className="mt-5 rounded-2xl border border-[#d8c79e]/60 bg-white/80 p-4 text-xs leading-relaxed text-[#354B2D] shadow-xs">
          <span className="font-bold text-[#FF718D]">💡 {lang === "th" ? "คำแนะนำจากนักโภชนาการ: " : "Nutritionist Tip: "}</span>
          <span>{lang === "th" ? activeGoal.nutritionistTipTh : activeGoal.nutritionistTipEn}</span>
        </div>
      </motion.div>

      {/* Matching Snacks List */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-bold text-[#354B2D]">
            {lang === "th"
              ? `ขนมแนะนำสำหรับหมวดนี้ (${recommendations.length} เมนู)`
              : `Recommended Snacks for this goal (${recommendations.length})`}
          </h3>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map(({ product, matchScore, matchReasonTh, matchReasonEn }) => {
            const isAdded = addedItemSlug === product.slug;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-[#d8c79e]/60 bg-white p-4 shadow-[0_10px_30px_rgba(82,67,22,0.06)] transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <ProductArt
                    variant={product.art}
                    image={product.image}
                    alt={product.name}
                    className="aspect-[1.1] transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-[#354B2D] px-2.5 py-0.5 text-[10px] font-extrabold text-[#FFD95A] shadow-md">
                    {matchScore}% MATCH
                  </div>
                  {product.badge && (
                    <div className="absolute right-3 top-3 rounded-full bg-[#FF718D] px-2.5 py-0.5 text-[9px] font-extrabold text-white shadow-sm">
                      {product.badge}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-[#FF9F43]">
                      <Star size={13} fill="currentColor" />
                      <span className="font-bold">{product.rating}</span>
                      <span className="text-stone-400">({product.reviews})</span>
                    </div>

                    <Link href={`/shop/${product.slug}`}>
                      <h4 className="mt-1 font-display text-lg font-bold text-[#354B2D] transition hover:text-[#FF718D]">
                        {product.name}
                      </h4>
                    </Link>

                    {/* Nutrition Values */}
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {product.nutrition.map((item) => (
                        <span
                          key={item.label}
                          className="rounded-md bg-[#FFF9E9] px-2 py-0.5 text-[10px] font-bold text-[#8B5E3C]"
                        >
                          {item.label}: {item.value}
                        </span>
                      ))}
                    </div>

                    {/* Reason */}
                    <div className="mt-3 rounded-xl bg-emerald-50/70 p-2.5 text-[11px] leading-relaxed text-emerald-900">
                      <span className="font-bold">✨ {lang === "th" ? "จุดเด่นทางสุขภาพ: " : "Health Benefit: "}</span>
                      {lang === "th" ? matchReasonTh : matchReasonEn}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3">
                    <span className="font-display text-2xl font-bold text-[#8B5E3C]">
                      ฿{product.price}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold transition shadow-sm ${
                        isAdded
                          ? "bg-emerald-600 text-white"
                          : "bg-[#354B2D] text-white hover:bg-[#FF718D]"
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <CheckCircle2 size={14} />
                          <span>{lang === "th" ? "เพิ่มแล้ว!" : "Added!"}</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={14} />
                          <span>{lang === "th" ? "ใส่ถุงขนม" : "Add to Bag"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
