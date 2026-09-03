import { Product, products } from "./products";

export type HealthGoalId =
  | "weight-control"
  | "fitness-protein"
  | "gut-health"
  | "brain-focus"
  | "vegan-clean"
  | "skin-glow";

export type LifestyleId =
  | "office"
  | "fitness"
  | "diet"
  | "vegan"
  | "student";

export interface HealthGoal {
  id: HealthGoalId;
  icon: string;
  titleTh: string;
  titleEn: string;
  subtitleTh: string;
  subtitleEn: string;
  descriptionTh: string;
  descriptionEn: string;
  nutritionistTipTh: string;
  nutritionistTipEn: string;
  keyNutrientsTh: string[];
  keyNutrientsEn: string[];
  badgeColor: string;
  accentBg: string;
  criteria: (product: Product) => boolean;
  matchReasonTh: (product: Product) => string;
  matchReasonEn: (product: Product) => string;
}

export interface LifestyleOption {
  id: LifestyleId;
  icon: string;
  nameTh: string;
  nameEn: string;
  descriptionTh: string;
  descriptionEn: string;
  defaultGoal: HealthGoalId;
}

export const LIFESTYLES: LifestyleOption[] = [
  {
    id: "office",
    icon: "💼",
    nameTh: "วัยทำงาน / ออฟฟิศ",
    nameEn: "Desk & Office Life",
    descriptionTh: "นั่งทำงานหน้าคอมพิวเตอร์เป็นเวลานาน สมองล้า บ่าย ๆ ต้องการของว่างเคี้ยวเพลินคลายเครียดแบบไม่อ้วน",
    descriptionEn: "Long screen hours, needing energizing guilt-free focus snacks for 3 PM slumps.",
    defaultGoal: "brain-focus",
  },
  {
    id: "fitness",
    icon: "🏃‍♂️",
    nameTh: "สายฟิตเนส & แอคทีฟ",
    nameEn: "Workout & Active",
    descriptionTh: "ออกกำลังกายเป็นประจำ ต้องการโปรตีนช่วยซ่อมแซมกล้ามเนื้อ และคาร์บเชิงซ้อนเติมพลังงานยั่งยืน",
    descriptionEn: "Regular gym, running or sports—fueling muscles with high protein and clean carbs.",
    defaultGoal: "fitness-protein",
  },
  {
    id: "diet",
    icon: "🥗",
    nameTh: "สายดูแลหุ่น & คุมน้ำหนัก",
    nameEn: "Weight & Sugar Watchers",
    descriptionTh: "นับแคลอรี คุมน้ำตาล ลดของทอด อยากได้ขนมแคลต่ำ ไฟเบอร์สูง เคี้ยวแล้วอิ่มนาน ไม่พุ่งปรี๊ด",
    descriptionEn: "Counting calories, low sugar, high fibre to stay full longer without afternoon sugar crashes.",
    defaultGoal: "weight-control",
  },
  {
    id: "vegan",
    icon: "🌱",
    nameTh: "สายวีแกน & แพลนต์เบส",
    nameEn: "100% Plant-Based & Clean",
    descriptionTh: "ทานมังสวิรัติ วีแกน หรือมีภาวะแพ้นมวัว (Lactose Intolerance) ย่อยง่าย สบายท้อง",
    descriptionEn: "Dairy-free, egg-free, 100% wholesome plant goodness that is easy on the gut.",
    defaultGoal: "vegan-clean",
  },
  {
    id: "student",
    icon: "📚",
    nameTh: "นักเรียน / สายอ่านหนังสือ",
    nameEn: "Students & Fast Paced",
    descriptionTh: "เตรียมสอบ ทำโปรเจกต์ ใช้สมาธิสูง ต้องการสารอาหารบำรุงระบบประสาทและเพิ่มความสดชื่น",
    descriptionEn: "Study sessions, quick wholesome bites packed with brain-boosting nutrients and natural energy.",
    defaultGoal: "brain-focus",
  },
];

export const HEALTH_GOALS: HealthGoal[] = [
  {
    id: "weight-control",
    icon: "🥗",
    titleTh: "คุมน้ำหนัก & ลดน้ำตาล",
    titleEn: "Weight Control & Low Sugar",
    subtitleTh: "แคลอรีต่ำ ไฟเบอร์สูง ไม่เติมน้ำตาลทรายขัดสี",
    subtitleEn: "Low calorie, high fibre, no refined sugar crashes",
    descriptionTh: "คัดสรรขนมที่มีพลังงานไม่เกิน 165 kcal ต่อน้ำตาลต่ำ และมีไฟเบอร์สูงเพื่อชะลอการดูดซึมน้ำตาล ช่วยให้อิ่มนาน ลดการกินจุกจิกยามบ่ายได้ดีเยี่ยม",
    descriptionEn: "Selected snacks under 165 kcal with high fibre and minimal natural sugars to keep you satiated without sugar spikes.",
    nutritionistTipTh: "เคล็ดลับจากนักโภชนาการ: ขนมที่มีใยอาหารสูงอย่างข้าวโอ๊ตและผลไม้อบแห้งธรรมชาติ จะช่วยดูดซับน้ำในกระเพาะและทำให้อิ่มทนกว่าขนมกรุบกรอบทั่วไปถึง 3 เท่า",
    nutritionistTipEn: "Nutritionist Tip: High-fibre whole grains and natural dried fruits swell in the stomach, keeping you satisfied up to 3x longer than ordinary processed chips.",
    keyNutrientsTh: ["ใยอาหารสูง (High Fibre)", "น้ำตาลต่ำ (Low Sugar)", "แคลอรีเบาใจ (<165 kcal)"],
    keyNutrientsEn: ["High Dietary Fibre", "Low Natural Sugar", "Portion-controlled (<165 kcal)"],
    badgeColor: "bg-[#6EC8FF] text-blue-900",
    accentBg: "bg-blue-50 border-blue-200 text-blue-900",
    criteria: (product) => {
      const cal = parseInt(product.nutrition.find((n) => n.label === "Calories")?.value || "200");
      const sugar = parseInt(product.nutrition.find((n) => n.label === "Sugar")?.value || "10");
      return (cal <= 165 && sugar <= 9) || product.category === "Dried Fruits" || product.slug.includes("banana-chips") || product.badge === "HEALTHY PICK";
    },
    matchReasonTh: (product) => `แคลอรีเพียง ${product.nutrition.find((n) => n.label === "Calories")?.value} พร้อมไฟเบอร์ ${product.nutrition.find((n) => n.label === "Fibre")?.value} คุมหิวอยู่หมัด น้ำตาลธรรมชาติล้วนๆ`,
    matchReasonEn: (product) => `Only ${product.nutrition.find((n) => n.label === "Calories")?.value} with ${product.nutrition.find((n) => n.label === "Fibre")?.value} fibre for sustained fullness and no sugar crash.`,
  },
  {
    id: "fitness-protein",
    icon: "⚡",
    titleTh: "เพิ่มโปรตีน & ฟิตเนส",
    titleEn: "High Protein & Fitness Energy",
    subtitleTh: "โปรตีนจากพืชและถั่ว ช่วยฟื้นฟูกล้ามเนื้อ อิ่มนาน",
    subtitleEn: "Plant protein & healthy fats for sustained workout fuel",
    descriptionTh: "สูตรโปรตีนสูง 5-8 กรัมต่อเสิร์ฟ ผสมผสานเนยถั่ว ถั่วลายเสือ และเมล็ดฟักทอง เพื่อเสริมสร้างมวลกล้ามเนื้อและเติมไกลโคเจนให้ร่างกายสดชื่นหลังออกกำลังกาย",
    descriptionEn: "Rich in 5-8g of wholesome plant protein per serving to rebuild muscle fibers and replenish glycogen stores.",
    nutritionistTipTh: "เคล็ดลับจากนักโภชนาการ: ทานขนมโปรตีนไบต์หรือถั่วรวม 30-45 นาที ก่อนหรือหลังออกกำลังกาย เพื่อช่วยรักษาระดับกรดอะมิโนในกระแสเลือดและป้องกันการสลายของกล้ามเนื้อ",
    nutritionistTipEn: "Nutritionist Tip: Consume protein snacks 30-45 minutes pre/post-workout to optimize muscle protein synthesis and maintain steady energy.",
    keyNutrientsTh: ["โปรตีนสูง 5-8g", "ไขมันดีไม่อิ่มตัว (MUFA/PUFA)", "แมกนีเซียมและสังกะสี"],
    keyNutrientsEn: ["High Plant Protein (5-8g)", "Healthy Unsaturated Fats", "Zinc & Magnesium"],
    badgeColor: "bg-[#FF9F43] text-orange-950",
    accentBg: "bg-orange-50 border-orange-200 text-orange-950",
    criteria: (product) => {
      const protein = parseInt(product.nutrition.find((n) => n.label === "Protein")?.value || "0");
      return protein >= 5 || product.category === "Protein Snacks" || product.slug.includes("peanut-butter") || product.slug.includes("super-snack-mix");
    },
    matchReasonTh: (product) => `อัดแน่นโปรตีนสูงถึง ${product.nutrition.find((n) => n.label === "Protein")?.value} เติมพลังกล้ามเนื้อแบบคลีนๆ ไม่พึ่งเวย์สังเคราะห์`,
    matchReasonEn: (product) => `Packed with ${product.nutrition.find((n) => n.label === "Protein")?.value} clean plant protein to fuel muscle recovery naturally.`,
  },
  {
    id: "gut-health",
    icon: "🌾",
    titleTh: "ขับถ่ายคล่อง & สุขภาพลำไส้",
    titleEn: "Gut Health & High Fibre",
    subtitleTh: "พรีไบโอติกธรรมชาติจากข้าวโอ๊ต เมล็ดแฟลกซ์ และผลไม้",
    subtitleEn: "Prebiotic oats, chia & dietary fibre for smooth digestion",
    descriptionTh: "อุดมด้วยเบต้ากลูแคน (Beta-Glucan) จากข้าวโอ๊ตเต็มเมล็ด และพรีไบโอติกจากเมล็ดฟักทอง ช่วยปรับสมดุลจุลินทรีย์ดีในลำไส้ ขับถ่ายง่าย สบายพุง ไม่ท้องอืด",
    descriptionEn: "Loaded with prebiotic beta-glucan from whole oats and seeds to nurture your gut microbiome and promote digestive comfort.",
    nutritionistTipTh: "เคล็ดลับจากนักโภชนาการ: พรีไบโอติกคืออาหารของโพรไบโอติก การทานกราโนล่าคู่กับโยเกิร์ตตอนเช้า จะช่วยให้ระบบขับถ่ายทำงานได้อย่างมีประสิทธิภาพสูงสุดตลอดวัน",
    nutritionistTipEn: "Nutritionist Tip: Pairing whole oat granola with Greek yogurt combines prebiotics and probiotics, maximizing gut microbial diversity.",
    keyNutrientsTh: ["เบต้ากลูแคน (Beta-Glucan)", "พรีไบโอติกธรรมชาติ", "ใยอาหาร 4-5g"],
    keyNutrientsEn: ["Beta-Glucan Oats", "Natural Prebiotics", "High Fibre (4-5g)"],
    badgeColor: "bg-[#8BC34A] text-emerald-950",
    accentBg: "bg-lime-50 border-lime-200 text-lime-950",
    criteria: (product) => {
      const fibre = parseInt(product.nutrition.find((n) => n.label === "Fibre")?.value || "0");
      return fibre >= 4 || product.category === "Granola" || product.slug.includes("oat");
    },
    matchReasonTh: (product) => `ไฟเบอร์เข้มข้น ${product.nutrition.find((n) => n.label === "Fibre")?.value} พร้อมพรีไบโอติกธรรมชาติจากข้าวโอ๊ต ช่วยให้ขับถ่ายสบายทุกเช้า`,
    matchReasonEn: (product) => `Rich in ${product.nutrition.find((n) => n.label === "Fibre")?.value} fibre and gentle prebiotics for a happy, comfortable gut balance.`,
  },
  {
    id: "brain-focus",
    icon: "🧠",
    titleTh: "บำรุงสมอง & วัยทำงาน",
    titleEn: "Focus & Brain Power",
    subtitleTh: "สารต้านอนุมูลอิสระ โอเมก้า และโกโก้แท้ คลายเครียด สดชื่น",
    subtitleEn: "Flavonoids, healthy fats & magnesium to beat brain fatigue",
    descriptionTh: "คัดขนมที่มีโกโก้แท้ ชาเขียวมัทฉะแท้ และถั่ววอลนัท อัลมอนด์ อุดมด้วยสารต้านอนุมูลอิสระและแมกนีเซียม ช่วยลดความเหนื่อยล้าของเซลล์สมอง เพิ่มโฟกัสในการทำงานและเรียน",
    descriptionEn: "Crafted with dark cocoa, matcha, and antioxidant-rich nuts to sharpen concentration and elevate mood during long mental tasks.",
    nutritionistTipTh: "เคล็ดลับจากนักโภชนาการ: ฟลาโวนอยด์ในโกโก้แท้และแอล-ธีอะนีนในมัทฉะ ช่วยกระตุ้นคลื่นสมองอัลฟ่า ทำให้มีสมาธิจดจ่อได้นิ่ง สงบ และไม่ตึงเครียด",
    nutritionistTipEn: "Nutritionist Tip: Real cocoa flavonoids and matcha L-theanine promote calm focus without the jittery crash of excessive caffeine.",
    keyNutrientsTh: ["ฟลาโวนอยด์จากโกโก้", "แมกนีเซียมคลายเครียด", "กรดไขมันดีโอเมก้า"],
    keyNutrientsEn: ["Cocoa Flavonoids", "Magnesium for Calm", "Omega-rich Nuts"],
    badgeColor: "bg-[#A678FF] text-purple-950",
    accentBg: "bg-purple-50 border-purple-200 text-purple-950",
    criteria: (product) => {
      return (
        product.slug.includes("choco") ||
        product.slug.includes("dark-cocoa") ||
        product.slug.includes("matcha") ||
        product.slug.includes("super-mix") ||
        product.category === "Nut Mix" ||
        product.perfectFor.includes("Study") ||
        product.perfectFor.includes("Work")
      );
    },
    matchReasonTh: (product) => `ผสมผสานสารสกัดจากธรรมชาติและไขมันดี ช่วยเติมพลังสมอง คลายความล้า และเสริมสมาธิระหว่างวัน`,
    matchReasonEn: (product) => `Nutrient-dense with brain-loving fats and antioxidant compounds to keep your thoughts sharp and energized.`,
  },
  {
    id: "vegan-clean",
    icon: "🌱",
    titleTh: "สายวีแกน & แพ้นมวัว",
    titleEn: "100% Plant-Based & Vegan",
    subtitleTh: "พืช 100% ปราศจากนม เนย ไข่ และน้ำผึ้ง ท้องไม่อืด",
    subtitleEn: "Dairy-free, egg-free, pure plant nutrition for sensitive stomachs",
    descriptionTh: "ขนมสูตร Clean Plant-Based แท้ 100% ไม่ใช้สารปรุงแต่งจากสัตว์ ไม่ผสมนมผงหรือเนย ปลอดภัยสำหรับผู้ที่แพ้โปรตีนนมวัว หรือผู้ที่ทานมังสวิรัติเป็นประจำ",
    descriptionEn: "100% certified plant ingredients with zero dairy, honey or animal derivatives, completely gentle on sensitive tummies.",
    nutritionistTipTh: "เคล็ดลับจากนักโภชนาการ: ขนมแพลนต์เบสจากผลไม้แท้และธัญพืชไม่ผ่านการฟอกสี ให้พลังงานสะอาดที่ร่างกายนำไปใช้ได้ทันทีโดยไม่ตกค้างในระบบย่อย",
    nutritionistTipEn: "Nutritionist Tip: Whole plant treats nourish cells with clean enzymes and unrefined vitamins that digest smoothly without heaviness.",
    keyNutrientsTh: ["พืชแท้ 100% (Pure Vegan)", "ปราศจากแลคโตสและนม", "ไม่แต่งกลิ่นสังเคราะห์"],
    keyNutrientsEn: ["100% Plant Derived", "Dairy & Lactose Free", "Zero Artificial Additives"],
    badgeColor: "bg-[#62BFA1] text-teal-950",
    accentBg: "bg-teal-50 border-teal-200 text-teal-950",
    criteria: (product) => {
      return (
        product.badge === "VEGAN" ||
        (!product.allergens.includes("Milk") &&
          (product.category === "Dried Fruits" ||
            product.slug.includes("matcha") ||
            product.slug.includes("pineapple-coconut") ||
            product.slug.includes("coconut-almond")))
      );
    },
    matchReasonTh: (product) => `สูตรแพลนต์เบส 100% ไร้นมเนยไข่ ย่อยง่าย สบายท้อง เหมาะสำหรับชาววีแกนและผู้แพ้นมวัวอย่างแท้จริง`,
    matchReasonEn: (product) => `100% plant-based formulation, entirely free of dairy and animal ingredients, comforting for sensitive stomachs.`,
  },
  {
    id: "skin-glow",
    icon: "✨",
    titleTh: "ผิวพรรณสดใส & แอนตี้ออกซิแดนท์",
    titleEn: "Skin Glow & Antioxidants",
    subtitleTh: "เบอร์รี่รวม วิตามินซีสูง และวิตามินอี ปกป้องเซลล์ผิว",
    subtitleEn: "Rich berries, vitamin C & natural vitamin E to nourish glowing skin",
    descriptionTh: "รวมคุณค่าเบอร์รี่หลากสี (สตรอว์เบอร์รี่ บลูเบอร์รี่ ราสเบอร์รี่ แครนเบอร์รี่) ที่อุดมด้วยแอนโทไซยานินและวิตามินซี ช่วยเสริมการสร้างคอลลาเจนและปกป้องผิวจากแสงแดด",
    descriptionEn: "Bursting with wild berries, anthocyanins, and natural vitamin E to defend skin cells from oxidative stress and encourage collagen vitality.",
    nutritionistTipTh: "เคล็ดลับจากนักโภชนาการ: สารต้านอนุมูลอิสระจากเบอร์รี่ธรรมชาติจะทำงานเสริมฤทธิ์ได้ดีที่สุดเมื่อทานคู่กับไขมันดีจากถั่วอัลมอนด์ ซึ่งช่วยในการดูดซึมวิตามินที่ละลายในไขมัน",
    nutritionistTipEn: "Nutritionist Tip: Berry polyphenols work synergistically with the healthy fats in almonds, optimizing fat-soluble antioxidant absorption.",
    keyNutrientsTh: ["วิตามินซีจากผลไม้แท้", "แอนโทไซยานิน (Anthocyanins)", "วิตามินอีบำรุงเซลล์ผิว"],
    keyNutrientsEn: ["Natural Berry Vitamin C", "Potent Anthocyanins", "Vitamin E from Nuts & Seeds"],
    badgeColor: "bg-[#FF718D] text-pink-950",
    accentBg: "bg-pink-50 border-pink-200 text-pink-950",
    criteria: (product) => {
      return (
        product.ingredients.some((i) => ["Strawberry", "Blueberry", "Raspberry", "Cranberry", "Berry"].includes(i)) ||
        product.slug.includes("berry") ||
        product.slug.includes("strawberry") ||
        product.slug.includes("blueberry")
      );
    },
    matchReasonTh: (product) => `อัดแน่นด้วยเบอร์รี่แท้และสารต้านอนุมูลอิสระสูง ชะลอความเสื่อมของเซลล์ บำรุงผิวให้เปล่งปลั่งสดใส`,
    matchReasonEn: (product) => `Rich in genuine berries and potent polyphenols to guard against daily oxidative stress and brighten skin vitality.`,
  },
];

export interface RecommendationResult {
  product: Product;
  matchScore: number;
  matchReasonTh: string;
  matchReasonEn: string;
  highlights: string[];
}

export function getRecommendations(
  goalId: HealthGoalId,
  lifestyleId?: LifestyleId,
  avoidAllergens: string[] = []
): RecommendationResult[] {
  const goal = HEALTH_GOALS.find((g) => g.id === goalId) || HEALTH_GOALS[0];

  return products
    .filter((p) => {
      if (avoidAllergens.length > 0) {
        const hasAllergen = p.allergens.some((a) =>
          avoidAllergens.some((avoid) => a.toLowerCase().includes(avoid.toLowerCase()))
        );
        if (hasAllergen) return false;
      }
      return true;
    })
    .map((product) => {
      let score = 75;

      if (goal.criteria(product)) {
        score += 18;
      }

      if (lifestyleId) {
        const lifestyle = LIFESTYLES.find((l) => l.id === lifestyleId);
        if (lifestyle?.id === "office" && (product.perfectFor.includes("Work") || product.perfectFor.includes("Study"))) score += 5;
        if (lifestyle?.id === "fitness" && (product.perfectFor.includes("Workout") || product.category === "Protein Snacks")) score += 6;
        if (lifestyle?.id === "diet" && (product.badge === "HEALTHY PICK" || product.badge === "VEGAN")) score += 5;
        if (lifestyle?.id === "student" && product.perfectFor.includes("Study")) score += 5;
      }

      if (product.badge === "BEST SELLER" || product.badge === "HEALTHY PICK") {
        score += 3;
      }

      const matchScore = Math.min(score, 99);

      return {
        product,
        matchScore,
        matchReasonTh: goal.matchReasonTh(product),
        matchReasonEn: goal.matchReasonEn(product),
        highlights: product.benefits.slice(0, 3),
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}
