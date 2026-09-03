"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  Star,
  CheckCircle2,
  Tag,
} from "lucide-react";
import {
  HEALTH_GOALS,
  HealthGoalId,
  LIFESTYLES,
  LifestyleId,
  getRecommendations,
  RecommendationResult,
} from "@/data/health-recommendations";
import { ProductArt } from "@/components/ui/product-art";
import { useCart } from "@/components/providers/cart-provider";
import { useLanguage } from "@/components/providers/language-provider";

const ALLERGEN_LIST = [
  { id: "none", labelTh: "ทานได้ทุกอย่าง (ไม่มีข้อจำกัด)", labelEn: "None (Eat anything)" },
  { id: "Almond", labelTh: "หลีกเลี่ยงถั่วอัลมอนด์/ถั่วเปลือกแข็ง", labelEn: "Tree Nuts / Almond" },
  { id: "Milk", labelTh: "หลีกเลี่ยงนมวัว / แพ้แลคโตส", labelEn: "Dairy / Milk" },
  { id: "Gluten", labelTh: "หลีกเลี่ยงกลูเตน", labelEn: "Gluten" },
  { id: "Peanut", labelTh: "หลีกเลี่ยงถั่วลิสง", labelEn: "Peanuts" },
];

export function HealthQuiz() {
  const { add } = useCart();
  const { lang } = useLanguage();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedLifestyle, setSelectedLifestyle] = useState<LifestyleId>("office");
  const [selectedGoal, setSelectedGoal] = useState<HealthGoalId>("weight-control");
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [results, setResults] = useState<RecommendationResult[]>([]);
  const [addedItemSlug, setAddedItemSlug] = useState<string | null>(null);

  const handleSelectLifestyle = (id: LifestyleId) => {
    setSelectedLifestyle(id);
    const lifestyle = LIFESTYLES.find((l) => l.id === id);
    if (lifestyle) {
      setSelectedGoal(lifestyle.defaultGoal);
    }
  };

  const toggleAllergen = (id: string) => {
    if (id === "none") {
      setSelectedAllergens([]);
      return;
    }
    if (selectedAllergens.includes(id)) {
      setSelectedAllergens(selectedAllergens.filter((a) => a !== id));
    } else {
      setSelectedAllergens([...selectedAllergens, id]);
    }
  };

  const handleCalculate = () => {
    const recs = getRecommendations(selectedGoal, selectedLifestyle, selectedAllergens);
    setResults(recs);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedLifestyle("office");
    setSelectedGoal("weight-control");
    setSelectedAllergens([]);
    setResults([]);
  };

  const handleAddToCart = (product: RecommendationResult["product"]) => {
    add(product);
    setAddedItemSlug(product.slug);
    setTimeout(() => setAddedItemSlug(null), 2000);
  };

  const activeGoalData = HEALTH_GOALS.find((g) => g.id === selectedGoal);

  return (
    <div className="overflow-hidden rounded-[36px] border border-white/80 bg-[#FFFDF8] p-6 shadow-[0_20px_50px_rgba(82,67,22,0.08)] sm:p-10">
      {/* Progress Stepper */}
      {step < 4 && (
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500">
            <span>
              {lang === "th" ? `ขั้นตอนที่ ${step} จาก 3` : `Step ${step} of 3`}
            </span>
            <span>
              {step === 1
                ? lang === "th"
                  ? "เลือกไลฟ์สไตล์ของคุณ"
                  : "Your Lifestyle"
                : step === 2
                ? lang === "th"
                  ? "เป้าหมายสุขภาพที่ต้องการดูแล"
                  : "Health Priority"
                : lang === "th"
                ? "ข้อจำกัดด้านอาหาร"
                : "Dietary Restrictions"}
            </span>
          </div>

          <div className="mt-2.5 flex h-2 gap-2 overflow-hidden rounded-full bg-[#F3E8CE]">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                step >= 1 ? "bg-[#354B2D] w-1/3" : "w-0"
              }`}
            />
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                step >= 2 ? "bg-[#354B2D] w-1/3" : "w-0"
              }`}
            />
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                step >= 3 ? "bg-[#354B2D] w-1/3" : "w-0"
              }`}
            />
          </div>
        </div>
      )}

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <span className="rounded-full bg-[#354B2D]/10 px-3 py-1 text-xs font-bold text-[#354B2D]">
                {lang === "th" ? "คำถามที่ 1/3" : "Question 1/3"}
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-[#354B2D] sm:text-3xl">
                {lang === "th"
                  ? "ใครกำลังมองหาของว่าง? ไลฟ์สไตล์ประจำวันของคุณตรงกับข้อไหนมากที่สุด"
                  : "Who is snacking? Which lifestyle best represents your daily routine?"}
              </h2>
              <p className="mt-1 text-xs text-stone-500 sm:text-sm">
                {lang === "th"
                  ? "เลือกไลฟ์สไตล์เพื่อให้ระบบคำนวณความต้องการพลังงานและสารอาหารที่เหมาะสม"
                  : "Pick your routine so we can balance your exact energy and macro requirements."}
              </p>
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {LIFESTYLES.map((lifestyle) => {
                const isSelected = selectedLifestyle === lifestyle.id;
                return (
                  <button
                    key={lifestyle.id}
                    type="button"
                    onClick={() => handleSelectLifestyle(lifestyle.id)}
                    className={`flex flex-col items-start rounded-3xl border-2 p-5 text-left transition ${
                      isSelected
                        ? "border-[#354B2D] bg-[#FFF8E6] shadow-md ring-2 ring-[#354B2D]/10"
                        : "border-stone-200 bg-white hover:border-[#354B2D]/30 hover:bg-[#FFFCF3]"
                    }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-2xl bg-white text-2xl shadow-xs">
                        {lifestyle.icon}
                      </span>
                      {isSelected ? (
                        <span className="grid size-6 place-items-center rounded-full bg-[#354B2D] text-white">
                          <Check size={14} />
                        </span>
                      ) : (
                        <span className="size-6 rounded-full border border-stone-300" />
                      )}
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold text-[#354B2D]">
                      {lang === "th" ? lifestyle.nameTh : lifestyle.nameEn}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-stone-600">
                      {lang === "th" ? lifestyle.descriptionTh : lifestyle.descriptionEn}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 rounded-full bg-[#354B2D] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:scale-105 hover:bg-[#244A1A]"
              >
                <span>{lang === "th" ? "ถัดไป: เลือกเป้าหมายสุขภาพ" : "Next: Health Priority"}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <span className="rounded-full bg-[#354B2D]/10 px-3 py-1 text-xs font-bold text-[#354B2D]">
                {lang === "th" ? "คำถามที่ 2/3" : "Question 2/3"}
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-[#354B2D] sm:text-3xl">
                {lang === "th"
                  ? "คุณต้องการดูแลสุขภาพหรือเน้นสิ่งใดเป็นพิเศษในตอนนี้?"
                  : "What health benefit or goal is your top priority right now?"}
              </h2>
              <p className="mt-1 text-xs text-stone-500 sm:text-sm">
                {lang === "th"
                  ? "คลิกเลือก 1 เป้าหมายหลัก เพื่อให้เราจัดสูตรขนมที่ตรงจุดที่สุด"
                  : "Choose your main focus to unlock snacks formulated precisely for that need."}
              </p>
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {HEALTH_GOALS.map((goal) => {
                const isSelected = selectedGoal === goal.id;
                return (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => setSelectedGoal(goal.id)}
                    className={`flex flex-col items-start rounded-3xl border-2 p-5 text-left transition ${
                      isSelected
                        ? "border-[#354B2D] bg-[#FFF8E6] shadow-md ring-2 ring-[#354B2D]/10"
                        : "border-stone-200 bg-white hover:border-[#354B2D]/30 hover:bg-[#FFFCF3]"
                    }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span className="grid size-12 place-items-center rounded-2xl bg-white text-2xl shadow-xs">
                        {goal.icon}
                      </span>
                      {isSelected ? (
                        <span className="grid size-6 place-items-center rounded-full bg-[#354B2D] text-white">
                          <Check size={14} />
                        </span>
                      ) : (
                        <span className="size-6 rounded-full border border-stone-300" />
                      )}
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold text-[#354B2D]">
                      {lang === "th" ? goal.titleTh : goal.titleEn}
                    </h3>
                    <p className="mt-1 text-xs font-semibold text-[#8B5E3C]">
                      {lang === "th" ? goal.subtitleTh : goal.subtitleEn}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-stone-500">
                      {lang === "th" ? goal.descriptionTh.slice(0, 90) + "..." : goal.descriptionEn.slice(0, 90) + "..."}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-5 py-3 text-xs font-bold text-stone-700 hover:bg-stone-50"
              >
                <ArrowLeft size={15} />
                <span>{lang === "th" ? "ย้อนกลับ" : "Back"}</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 rounded-full bg-[#354B2D] px-7 py-3.5 text-sm font-bold text-white shadow-md transition hover:scale-105 hover:bg-[#244A1A]"
              >
                <span>{lang === "th" ? "ถัดไป: ข้อจำกัดอาหาร" : "Next: Dietary Restrictions"}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <span className="rounded-full bg-[#354B2D]/10 px-3 py-1 text-xs font-bold text-[#354B2D]">
                {lang === "th" ? "คำถามที่ 3/3 (ขั้นตอนสุดท้าย)" : "Question 3/3 (Final Step)"}
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-[#354B2D] sm:text-3xl">
                {lang === "th"
                  ? "มีสารก่อภูมิแพ้หรือสิ่งที่คุณต้องการหลีกเลี่ยงหรือไม่?"
                  : "Any allergies or ingredients you want to avoid?"}
              </h2>
              <p className="mt-1 text-xs text-stone-500 sm:text-sm">
                {lang === "th"
                  ? "เลือกส่วนผสมที่คุณแพ้หรือไม่ต้องการ เพื่อให้ระบบคัดกรองออกอย่างปลอดภัย 100%"
                  : "We'll filter out matching snacks containing these allergens to keep you safe."}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {ALLERGEN_LIST.map((item) => {
                const isSelected =
                  item.id === "none"
                    ? selectedAllergens.length === 0
                    : selectedAllergens.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleAllergen(item.id)}
                    className={`flex items-center justify-between rounded-2xl border-2 p-4 text-left transition ${
                      isSelected
                        ? "border-[#354B2D] bg-[#FFF8E6] shadow-sm"
                        : "border-stone-200 bg-white hover:border-[#354B2D]/30"
                    }`}
                  >
                    <span className="text-sm font-semibold text-[#354B2D]">
                      {lang === "th" ? item.labelTh : item.labelEn}
                    </span>
                    {isSelected && (
                      <span className="grid size-6 place-items-center rounded-full bg-[#354B2D] text-white">
                        <Check size={14} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-6">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-5 py-3 text-xs font-bold text-stone-700 hover:bg-stone-50"
              >
                <ArrowLeft size={15} />
                <span>{lang === "th" ? "ย้อนกลับ" : "Back"}</span>
              </button>

              <button
                type="button"
                onClick={handleCalculate}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#354B2D] via-[#2D5A27] to-[#1E3E1A] px-8 py-4 text-base font-bold text-white shadow-xl transition hover:scale-105"
              >
                <Sparkles size={18} className="text-[#FFD95A]" />
                <span>{lang === "th" ? "ดูผลวิเคราะห์ขนมที่เหมาะกับคุณ" : "Reveal My Snack Matches"}</span>
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            {/* Header Result Summary */}
            <div className="rounded-3xl border border-[#d8c79e] bg-gradient-to-br from-[#FFF9EA] via-[#FFF3D6] to-[#FFEECB] p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#354B2D] px-3.5 py-1 text-xs font-bold text-white">
                    <Sparkles size={14} className="text-[#FFD95A]" />
                    <span>{lang === "th" ? "ผลการจับคู่ขนมของคุณ" : "Your Tailored Snack Results"}</span>
                  </div>
                  <h2 className="mt-2 font-display text-3xl font-extrabold text-[#354B2D]">
                    {lang === "th"
                      ? `ขนมที่ตอบโจทย์: ${activeGoalData?.titleTh}`
                      : `Snacks for: ${activeGoalData?.titleEn}`}
                  </h2>
                  <p className="mt-1 text-sm text-[#8B5E3C]">
                    {lang === "th" ? activeGoalData?.subtitleTh : activeGoalData?.subtitleEn}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 self-start rounded-full border border-[#d8c79e] bg-white px-4 py-2 text-xs font-bold text-[#354B2D] shadow-xs transition hover:bg-[#FFF9E9]"
                >
                  <RotateCcw size={14} />
                  <span>{lang === "th" ? "ทำแบบทดสอบใหม่" : "Retake Quiz"}</span>
                </button>
              </div>

              {/* Nutritionist Note */}
              {activeGoalData && (
                <div className="mt-5 rounded-2xl border border-white/80 bg-white/70 p-4 text-xs leading-relaxed text-[#354B2D] shadow-xs">
                  <span className="font-bold text-[#FF718D]">💡 </span>
                  <span className="font-semibold">
                    {lang === "th" ? activeGoalData.nutritionistTipTh : activeGoalData.nutritionistTipEn}
                  </span>
                </div>
              )}
            </div>

            {/* Recommended Products Grid */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-[#354B2D]">
                  {lang === "th"
                    ? `พบขนมที่แนะนำ ${results.length} รายการ`
                    : `Discovered ${results.length} Matching Snacks`}
                </h3>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {results.map(({ product, matchScore, matchReasonTh, matchReasonEn }) => {
                  const isAdded = addedItemSlug === product.slug;

                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-[#d8c79e]/60 bg-white p-4 shadow-[0_10px_30px_rgba(82,67,22,0.06)] transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      {/* Top Match Badge */}
                      <div className="relative overflow-hidden rounded-2xl">
                        <ProductArt
                          variant={product.art}
                          image={product.image}
                          alt={product.name}
                          className="aspect-[1.1] transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute left-3 top-3 rounded-full bg-[#354B2D] px-3 py-1 text-[11px] font-extrabold text-[#FFD95A] shadow-md">
                          {matchScore}% MATCH
                        </div>
                        {product.badge && (
                          <div className="absolute right-3 top-3 rounded-full bg-[#FF718D] px-2.5 py-1 text-[9px] font-extrabold text-white shadow-sm">
                            {product.badge}
                          </div>
                        )}
                      </div>

                      {/* Content */}
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

                          {/* Nutrition Pills */}
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

                          {/* Why this snack fits */}
                          <div className="mt-3 rounded-xl bg-emerald-50/70 p-2.5 text-[11px] leading-relaxed text-emerald-900">
                            <span className="font-bold">🎯 {lang === "th" ? "เหตุผลที่เหมาะกับคุณ: " : "Why it matches: "}</span>
                            {lang === "th" ? matchReasonTh : matchReasonEn}
                          </div>
                        </div>

                        {/* Price & Add to Cart */}
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
                                <span>{lang === "th" ? "เพิ่มลงถุงแล้ว!" : "Added!"}</span>
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

            {/* Bottom Promo Teaser for Member discount */}
            <div className="rounded-3xl border border-[#FFD95A] bg-gradient-to-r from-[#FFF5DC] to-[#FFEBEB] p-6 text-center shadow-xs">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-[#FF718D] px-3.5 py-1 text-xs font-bold text-white">
                <Tag size={13} />
                <span>{lang === "th" ? "สิทธิ์พิเศษสมาชิกใหม่" : "New Member Perk"}</span>
              </div>
              <h4 className="mt-2 font-display text-2xl font-bold text-[#354B2D]">
                {lang === "th" ? "สั่งซื้อขนมที่แมตช์แล้ว รับส่วนลด 15% ทันที!" : "Order your matches with 15% off!"}
              </h4>
              <p className="mt-1 text-xs text-stone-600">
                {lang === "th"
                  ? "สมัครสมาชิก NIBBLY Club ฟรีใน 1 นาที ใช้โค้ด NIBBLYWELCOME15 ได้ทันทีในบิลแรก"
                  : "Sign up free in 1 minute to use code NIBBLYWELCOME15 on your first order."}
              </p>
              <div className="mt-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-[#354B2D] px-6 py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#244A1A]"
                >
                  <Sparkles size={14} className="text-[#FFD95A]" />
                  <span>{lang === "th" ? "สมัครสมาชิกรับโค้ดส่วนลด 15%" : "Sign Up for 15% Off"}</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
