"use client";

import Link from "next/link";
import { ArrowRight, Heart, Leaf, Send, ShieldCheck, Sparkles, Star, Sun, Wheat, CheckCircle2, Gift, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { products } from "@/data/products";
import { ProductCard } from "@/components/products/product-card";
import { ProductArt } from "@/components/ui/product-art";
import { useAuth } from "@/components/providers/auth-provider";
import { RibbonMarquee, IngredientSlideBar } from "@/components/ui/text-slide-bar";

const categories = [
  { title: "กราโนล่า", count: "กรอบเพลิน 4 รส", emoji: "🥣", bits: "🌾", color: "from-[#FFD95A] to-[#FF9F43]" },
  { title: "ถั่วรวม", count: "เคี้ยวมัน 4 แบบ", emoji: "🥜", bits: "🌿", color: "from-[#8BC34A] to-[#6EC8FF]" },
  { title: "เอเนอร์จี้ไบต์", count: "พกง่าย 6 รส", emoji: "⚡", bits: "🍌", color: "from-[#6EC8FF] to-[#A678FF]" },
  { title: "ฟรุตสแน็ก", count: "ผลไม้กรุบกรอบ 2 แบบ", emoji: "🍓", bits: "🫐", color: "from-[#FF718D] to-[#A678FF]" },
  { title: "คุกกี้", count: "อบนุ่ม หอมเบอร์รี", emoji: "🍪", bits: "✨", color: "from-[#FF9DB1] to-[#FFB88C]" },
  { title: "โปรตีนไบต์", count: "เติมแรง 1 สูตร", emoji: "💪", bits: "🌱", color: "from-[#70C9FF] to-[#62BFA1]" },
];

const features = [
  { icon: Leaf, title: "Real food joy", text: "ผลไม้แท้ ถั่วคัดเกรด ข้าวโอ๊ตเต็มเมล็ด และวัตถุดิบที่คุณคุ้นเคย 100%", bg: "bg-[#DFF3C1]" },
  { icon: ShieldCheck, title: "Feel-good choice", text: "ขนมเพื่อสุขภาพที่ใส่ใจทุกแคลอรี ไม่ใช้น้ำตาลทรายขาว อบไม่ทอด", bg: "bg-[#DDF3FF]" },
  { icon: Heart, title: "Big flavour first", text: "สุขภาพดีจะแฮปปี้ที่สุด เมื่อรสชาติอร่อยเข้มข้น จัดจ้านทุกคำ", bg: "bg-[#FFE0E8]" },
  { icon: Sun, title: "Made to brighten", text: "เติมพลังความสดชื่นและรอยยิ้ม ให้ทุกช่วงเวลาของวัน", bg: "bg-[#FFF2B4]" },
];

export function Hero() {
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-bit", {
        y: -18,
        rotation: 10,
        repeat: -1,
        yoyo: true,
        duration: 2.8,
        ease: "sine.inOut",
        stagger: 0.18,
      });
    }, scene);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#FFF8E8] pb-6 pt-10">
      {/* Dynamic ambient glow orbs */}
      <div className="pointer-events-none absolute -left-16 top-6 size-80 rounded-full bg-[#FFD95A]/45 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 size-96 rounded-full bg-[#A678FF]/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 size-72 rounded-full bg-[#FF718D]/15 blur-3xl" />

      <div ref={scene} className="relative mx-auto grid min-h-[640px] max-w-7xl items-center gap-10 px-5 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        {/* Left Hero Content */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex flex-wrap items-center gap-2"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d8c79e] bg-white/90 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[.12em] text-[#8B5E3C] shadow-xs backdrop-blur-xs">
              <Sparkles size={13} className="text-[#FF9F43]" />
              <span>Healthy can be a party</span>
            </span>

            <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[#FF718D]/15 px-3 py-1 text-[11px] font-extrabold text-[#FF718D]">
              <Gift size={12} /> สมาชิกใหม่ลด 15%
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-5 max-w-xl font-display text-[3.2rem] leading-[.92] tracking-tight text-[#354B2D] sm:text-7xl"
          >
            Snack <span className="text-[#FF718D]">Happy</span>.<br />
            <span className="text-[#8BC34A]">Live</span> <i className="text-[#A678FF]">Healthy.</i>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-5 max-w-md text-base leading-relaxed text-stone-600"
          >
            ขนมสุขภาพที่คัดสรรวัตถุดิบธรรมชาติ รสชาติจัดเต็ม เคี้ยวเพลินแบบไม่ต้องกังวลเรื่องแคลอรี ไม่ใช้น้ำตาลทรายขาว อบสดใหม่ทุกวัน
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-7 flex flex-wrap items-center gap-3.5"
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF718D] px-7 py-3.5 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(255,113,141,.32)] transition hover:-translate-y-1 hover:bg-[#A678FF]"
            >
              <span>เลือกซื้อขนมเลย</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/recommend"
              className="inline-flex items-center gap-2 rounded-full border border-[#354B2D] bg-white px-6 py-3.5 text-sm font-extrabold text-[#354B2D] shadow-xs transition hover:-translate-y-1 hover:bg-[#FFF9E9]"
            >
              <Sparkles size={15} className="text-[#FF9F43]" />
              <span>แนะนำขนมตามสุขภาพ</span>
            </Link>
          </motion.div>

          {/* Social Proof Counters */}
          <div className="mt-10 flex items-center gap-4">
            <div className="flex -space-x-2">
              <span className="grid size-10 place-items-center rounded-full border-2 border-[#FFF8E8] bg-[#FFB5C4] text-sm shadow-xs">🍓</span>
              <span className="grid size-10 place-items-center rounded-full border-2 border-[#FFF8E8] bg-[#AEDD76] text-sm shadow-xs">🥑</span>
              <span className="grid size-10 place-items-center rounded-full border-2 border-[#FFF8E8] bg-[#B8DFFF] text-sm shadow-xs">🥣</span>
              <span className="grid size-10 place-items-center rounded-full border-2 border-[#FFF8E8] bg-[#FFD95A] text-sm shadow-xs">🥜</span>
            </div>
            <p className="text-xs text-stone-600">
              <b className="text-[#354B2D]">20 รสชาติสุขภาพ</b> ส่งตรงความแฮปปี้<br />
              <span className="text-[#8B5E3C] font-semibold">12,800+ กล่องส่งถึงมือคนรักสุขภาพ</span>
            </p>
          </div>
        </div>

        {/* Right Hero Graphic */}
        <div className="relative mx-auto h-[460px] w-full max-w-[500px] sm:h-[530px]">
          <div className="absolute inset-[5%] rounded-[47%_53%_39%_61%/56%_39%_61%_44%] bg-gradient-to-br from-[#FFD95A] via-[#FFB85B] to-[#FF718D] shadow-[0_24px_50px_rgba(255,159,67,.28)]" />
          <div className="absolute left-[9%] top-[14%] size-20 rounded-full bg-[#6EC8FF]/80 blur-[1px]" />
          <div className="absolute bottom-[12%] right-[11%] size-24 rounded-full bg-[#A678FF]/70" />

          {/* Floating Food Bits */}
          <span className="hero-bit absolute left-[4%] top-[18%] text-5xl drop-shadow-md">🍓</span>
          <span className="hero-bit absolute right-[4%] top-[16%] text-5xl drop-shadow-md">🫐</span>
          <span className="hero-bit absolute bottom-[10%] left-[8%] text-5xl drop-shadow-md">🥜</span>
          <span className="hero-bit absolute bottom-[8%] right-[2%] text-5xl drop-shadow-md">🍌</span>
          <span className="hero-bit absolute right-[20%] top-[8%] text-3xl drop-shadow-md">🍯</span>
          <span className="absolute left-[18%] top-[24%] text-2xl text-white">✦</span>
          <span className="absolute right-[14%] top-[45%] text-2xl text-white">✦</span>

          {/* Floating Pill Badges */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-2xl border border-white bg-white/95 px-3.5 py-2 shadow-lg backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">🥣</span>
              <div>
                <p className="text-[10px] font-bold text-stone-400">BEST SELLER</p>
                <p className="text-xs font-bold text-[#354B2D]">Berry Granola</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-2 bottom-1/4 z-20 rounded-2xl border border-white bg-white/95 px-3.5 py-2 shadow-lg backdrop-blur-md"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">💪</span>
              <div>
                <p className="text-[10px] font-bold text-emerald-600">HIGH PROTEIN</p>
                <p className="text-xs font-bold text-[#354B2D]">8g Plant Fuel</p>
              </div>
            </div>
          </motion.div>

          {/* Center Mascot Box */}
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute inset-x-[19%] bottom-[10%] grid h-[70%] place-items-center rounded-[42%_42%_25%_25%] border-[8px] border-white/90 bg-[#354B2D] shadow-[0_30px_36px_rgba(91,59,32,.28)]"
          >
            <div className="grid h-[88%] w-[82%] place-items-center rounded-[35%_35%_20%_20%] border border-white/30 bg-[radial-gradient(circle_at_30%_20%,#8bc34a,transparent_35%),#466632] text-center">
              <div>
                <p className="font-display text-sm tracking-[.4em] text-[#FFD95A]">NIBBLY</p>
                <span className="mt-2 block text-7xl">🌈</span>
                <p className="mt-2 text-xs font-extrabold tracking-[.18em] text-white">
                  SUPER SNACK<br />MIX
                </p>
                <span className="mt-3 inline-block rounded-full bg-[#FF718D] px-3 py-1 text-[8px] font-extrabold text-white">
                  TASTE THE HAPPY
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Infinite Vibrant Ribbon Marquee */}
      <RibbonMarquee />
    </section>
  );
}

export function FeaturedProducts() {
  return (
    <section id="flavors" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <Heading
        eyebrow="MOST-LOVED MUNCHIES"
        title={
          <>
            Popular <i className="text-[#FF718D]">snacks</i>
          </>
        }
        text="ขนมสุขภาพยอดนิยม 20 รสชาติ คัดสรรเพื่อความสุขในทุกคำที่หยิบทาน"
        link="ดูขนมทั้งหมด"
      />
      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.slice(0, 4).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}

export function CategoryShop() {
  return (
    <section className="relative overflow-hidden bg-[#E7F8D0] py-20">
      <div className="pointer-events-none absolute right-0 top-0 size-72 rounded-full bg-[#6EC8FF]/25 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Heading
          eyebrow="เลือกตามใจวันนี้"
          title={
            <>
              อยากกินแบบไหน<br />
              <i className="text-[#62BFA1]">เลือกได้เลย</i>
            </>
          }
          text="มีทั้งกรอบ ๆ เคี้ยวเพลิน ๆ และคำเล็ก ๆ สำหรับพกติดกระเป๋า"
        />
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <motion.div
              whileHover={{ y: -8, rotate: i % 2 ? -0.5 : 0.5 }}
              key={category.title}
              className={`group relative min-h-[210px] overflow-hidden rounded-[30px] border border-white/60 bg-gradient-to-br ${category.color} p-6 shadow-[0_14px_34px_rgba(74,95,43,.14)]`}
            >
              <span className="absolute -right-2 -top-4 text-8xl opacity-25 transition duration-300 group-hover:scale-110">
                {category.emoji}
              </span>
              <span className="absolute bottom-5 right-7 text-6xl transition duration-300 group-hover:-rotate-12 group-hover:scale-110">
                {category.emoji}
              </span>
              <span className="absolute bottom-16 right-20 text-3xl opacity-80">{category.bits}</span>
              <span className="absolute right-5 top-16 text-xl text-white">✦</span>
              <div className="relative z-10 max-w-[60%]">
                <h3 className="font-display text-3xl leading-none text-[#354B2D]">{category.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-snug text-[#354B2D]/80">{category.count}</p>
                <Link
                  href="/shop"
                  className="mt-8 inline-flex items-center gap-1 rounded-full bg-[#FFF8E8]/95 px-4 py-2.5 text-xs font-extrabold text-[#354B2D] shadow-xs transition hover:bg-white"
                >
                  <span>ดูขนมทั้งหมด</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Ingredients() {
  return (
    <section className="overflow-hidden bg-[#DDF3FF] py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
        <div className="relative h-[360px] overflow-hidden rounded-[40px_22px_40px_22px] bg-gradient-to-br from-[#6EC8FF] via-[#74D1B8] to-[#8BC34A] shadow-lg">
          <span className="drift absolute left-[16%] top-[16%] text-6xl drop-shadow-md">🫐</span>
          <span className="drift-slow absolute right-[14%] top-[20%] text-7xl drop-shadow-md">🍓</span>
          <span className="drift absolute bottom-[10%] left-[14%] text-6xl drop-shadow-md">🥜</span>
          <span className="drift-slow absolute bottom-[10%] right-[18%] text-6xl drop-shadow-md">🍯</span>
          <span className="absolute left-[46%] top-[43%] text-4xl text-white">✦</span>
        </div>

        <div>
          <p className="text-xs font-extrabold tracking-[.2em] text-[#277E96]">COLOR FROM NATURE</p>
          <h2 className="mt-2 font-display text-4xl leading-tight text-[#354B2D] sm:text-5xl">
            Good ingredients.<br />
            <i className="text-[#A678FF]">Great big flavour.</i>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-600">
            เราคัดสรรวัตถุดิบที่ให้ความสดใสเหมือนกับรสชาติ ไม่มีสารปรุงแต่งซับซ้อน มีเพียงความสุขจากธรรมชาติแท้ 100% ที่ทานง่ายทุกที่ทุกเวลา
          </p>

          {/* Scrolling Ingredients Bar */}
          <div className="mt-6">
            <IngredientSlideBar />
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhyNibbly() {
  return (
    <section id="why" className="bg-[#FFF8E8] py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Heading
          eyebrow="ทำไมต้อง NIBBLY?"
          title={
            <>
              ขนมดี ๆ ที่กินแล้ว<br />
              รู้สึก <i className="text-[#FF9F43]">ดีกับตัวเอง</i>
            </>
          }
          text="อร่อยแบบไม่ต้องคิดเยอะ หยิบกินได้ทุกวัน เพื่อสุขภาพที่ดีในทุกคำ"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text, bg }, i) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              className="rounded-[30px] border border-white/80 bg-[#FFF1D5] p-6 shadow-[0_12px_30px_rgba(87,71,91,.09)] transition hover:-translate-y-1"
              key={title}
            >
              <span className={`grid size-12 place-items-center rounded-2xl ${bg} text-[#354B2D] shadow-2xs`}>
                <Icon size={23} />
              </span>
              <h3 className="mt-5 font-display text-2xl text-[#354B2D]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LifestyleAndBest() {
  const moments = [
    { e: "☀️", t: "Morning", c: "bg-[#FFF2B4]" },
    { e: "💻", t: "Work break", c: "bg-[#DDF3FF]" },
    { e: "📚", t: "Study", c: "bg-[#F0E5FF]" },
    { e: "💪", t: "Workout", c: "bg-[#DFF3C1]" },
    { e: "✈️", t: "Travel", c: "bg-[#FFE0E8]" },
  ];

  return (
    <>
      <section className="bg-[#F0E5FF] py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Heading
            eyebrow="SNACKING, YOUR WAY"
            title={
              <>
                A happy bite for<br />
                <i className="text-[#A678FF]">every moment.</i>
              </>
            }
            text="เติมพลังงานดี ๆ ให้กระเป๋า โต๊ะทำงาน และตู้ขนมของคุณ"
          />
          <div className="mt-9 grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-5">
            {moments.map((m) => (
              <motion.div
                whileHover={{ scale: 1.04, y: -4 }}
                key={m.t}
                className={`${m.c} rounded-[28px] border border-white/60 p-5 text-center shadow-xs transition`}
              >
                <span className="text-4xl">{m.e}</span>
                <p className="mt-3 font-display text-xl text-[#354B2D]">{m.t}</p>
                <p className="mt-1 text-[11px] text-[#354B2D]/70 font-semibold">Perfect little boost</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <Heading
          eyebrow="THE CROWD-PLEASERS"
          title={
            <>
              Best sellers, <i className="text-[#FF718D]">big smiles.</i>
            </>
          }
          text="ขนมยอดนิยมที่ทุกคนติดใจ หมดกล่องไวที่สุด"
          link="ดูสินค้าขายดีทั้งหมด"
        />
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products
            .filter((p) => p.badge === "BEST SELLER")
            .concat(products.slice(5, 7))
            .slice(0, 4)
            .map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
        </div>
      </section>
    </>
  );
}

export function PromoReviewsNewsletter() {
  const reviews = [
    { text: "ตู้ขนมที่บ้านไม่เคยสดใสขนาดนี้มาก่อน กราโนล่าเบอร์รีหอมกรอบอร่อยมาก!", name: "MAY · BANGKOK" },
    { text: "ในที่สุดก็เจอขนมคลีนที่กินสนุกและอร่อยจริง ๆ ไม่หวานเลี่ยนเลยค่ะ", name: "FAY · CHIANG MAI" },
    { text: "Super Snack Mix ต้องมีติดกระเป๋าตลอดเวลา บ่าย ๆ หยิบกินแล้วตื่นเลย", name: "NINA · PHUKET" },
  ];

  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="relative overflow-hidden rounded-[38px] border-2 border-white bg-gradient-to-r from-[#FF9F43] via-[#FFD95A] to-[#FF718D] px-8 py-12 shadow-xl sm:px-12">
          <span className="absolute right-[10%] top-[15%] text-7xl">🍍</span>
          <span className="absolute bottom-[5%] right-[30%] text-5xl">🥜</span>
          <span className="absolute right-[40%] top-[10%] text-3xl text-white">✦</span>
          <div className="relative max-w-lg">
            <p className="text-xs font-extrabold tracking-[.2em] text-[#8B5E3C]">ของขวัญสำหรับลูกค้าใหม่</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-[#354B2D] sm:text-5xl">
              สั่งครั้งแรก<br />
              <i className="text-white">ลดเลย 15%</i>
            </h2>
            <p className="mt-3 text-sm text-[#354B2D]/80">
              สมัครสมาชิกฟรีวันนี้ รับโค้ด NIBBLYWELCOME15 และขนมฟรีในเดือนเกิด
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-[#354B2D] px-6 py-3.5 text-sm font-extrabold text-white transition hover:-translate-y-1 hover:bg-[#244A1A]"
              >
                <span>สมัครสมาชิกรับส่วนลด</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-extrabold text-[#354B2D] shadow-xs transition hover:-translate-y-1"
              >
                <span>เลือกดูขนมเลย</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FFE0E8] py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Heading
            eyebrow="เสียงจากคนชอบกินเล่น"
            title={
              <>
                อร่อยจนอยาก<br />
                <i className="text-[#A678FF]">บอกต่อ</i>
              </>
            }
            text="เรื่องเล็ก ๆ จากคนที่มี NIBBLY ติดบ้านไว้แล้ว"
          />
          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <div
                className="rounded-[30px] border border-white/80 bg-[#FFF6E4] p-6 shadow-[0_12px_30px_rgba(120,66,102,.10)] transition hover:-translate-y-1"
                key={i}
              >
                <div className="flex text-[#FF9F43]">
                  {Array.from({ length: 5 }).map((_, x) => (
                    <Star key={x} size={15} fill="currentColor" />
                  ))}
                </div>
                <p className="mt-5 font-display text-xl leading-relaxed text-[#354B2D]">
                  “{review.text}”
                </p>
                <p className="mt-5 text-[10px] font-extrabold tracking-[.14em] text-[#A678FF]">
                  {review.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-20">
        <div className="rainbow-border-thick rounded-[38px] shadow-xl">
          <div className="rounded-[35px] bg-[#FFF1D5] p-8 text-center sm:p-12">
            <span className="text-4xl">🌈</span>
            <p className="mt-2 text-xs font-extrabold tracking-[.2em] text-[#62BFA1]">JOIN THE NIBBLY FAMILY</p>
            <h2 className="mt-2 font-display text-4xl text-[#354B2D]">มีข่าวขนมมาบอก</h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-stone-600">
              รสใหม่ โปรดี และไอเดียกินเล่นแบบไม่จำเจ ส่งให้เป็นครั้งคราวพอให้คิดถึง
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-6 flex max-w-md flex-col gap-2.5 sm:flex-row">
              <input
                aria-label="Email address"
                type="email"
                placeholder="อีเมลของคุณ"
                className="min-w-0 flex-1 rounded-full border border-[#E5D5B5] bg-[#FFF8E8] px-5 py-3 text-sm text-[#354B2D] outline-none focus:ring-2 focus:ring-[#FF718D]"
              />
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#A678FF] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#FF718D]">
                <span>สมัครเลย</span>
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export function HealthSnackFinderBanner() {
  const { isLoggedIn } = useAuth();
  const goals = [
    { icon: "🥗", title: "คุมน้ำหนัก & ลดน้ำตาล", color: "bg-[#FFF0F3] text-[#FF718D] border-[#FFD2DC]" },
    { icon: "💪", title: "เสริมโปรตีน & ฟิตหุ่น", color: "bg-[#EBF8FF] text-[#2B6CB0] border-[#BEE3F8]" },
    { icon: "🥑", title: "ปรับสมดุลลำไส้ & ไฟเบอร์สูง", color: "bg-[#F0FFF4] text-[#2F855A] border-[#C6F6D5]" },
    { icon: "⚡", title: "บำรุงสมอง & เติมสมาธิ", color: "bg-[#FAF5FF] text-[#6B46C1] border-[#E9D8FD]" },
    { icon: "🌱", title: "วีแกน & แพลนต์เบส 100%", color: "bg-[#F7FAFC] text-[#2D3748] border-[#E2E8F0]" },
    { icon: "✨", title: "ผิวใส & ต้านอนุมูลอิสระ", color: "bg-[#FFFDF0] text-[#B7791F] border-[#FEFCBF]" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF8] to-[#FFF4DE] py-20">
      {/* Background soft glow blobs */}
      <div className="pointer-events-none absolute -left-10 top-10 size-64 rounded-full bg-[#FFD95A]/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-10 size-64 rounded-full bg-[#FF718D]/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="overflow-hidden rounded-[38px] border-2 border-white bg-gradient-to-br from-[#354B2D] via-[#436139] to-[#25391F] p-8 text-white shadow-[0_24px_50px_rgba(53,75,45,0.22)] sm:p-12 lg:p-14">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {/* Left Info */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold text-[#FFD95A] backdrop-blur-xs">
                <Sparkles size={14} />
                <span>NIBBLY SMART SNACK MATCHER</span>
              </div>

              <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-white sm:text-5xl">
                ไม่แน่ใจว่ากินอะไรดี?<br />
                <span className="text-[#FFD95A]">ให้เราช่วยจับคู่ขนม</span> ที่ใช่สำหรับคุณ
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                ตอบคำถามสั้น ๆ 1 นาที เลือกไลฟ์สไตล์และเป้าหมายสุขภาพ ระบบนักโภชนาการ NIBBLY จะแนะนำขนมที่ตรงกับความต้องการของร่างกายคุณที่สุด
              </p>

              {/* Goals Pills */}
              <div className="mt-6 flex flex-wrap gap-2">
                {goals.map((g) => (
                  <Link
                    key={g.title}
                    href="/recommend"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-white transition hover:bg-white hover:text-[#354B2D]"
                  >
                    <span>{g.icon}</span>
                    <span>{g.title}</span>
                  </Link>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/recommend"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FF718D] px-7 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:scale-105 hover:bg-[#FF859F]"
                >
                  <Sparkles size={16} />
                  <span>เริ่มค้นหาขนมของคุณเลย</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-extrabold text-white backdrop-blur-xs transition hover:bg-white hover:text-[#354B2D]"
                >
                  <span>{isLoggedIn ? "ข้อมูลของฉัน" : "สมัครสมาชิก รับลด 15% & ขนมฟรี"}</span>
                </Link>
              </div>
            </div>

            {/* Right Interactive Preview Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-[32px] border border-white/30 bg-white/95 p-6 text-[#354B2D] shadow-2xl backdrop-blur-md sm:p-8">
                <div className="flex items-center justify-between border-b border-stone-200/80 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="grid size-9 place-items-center rounded-xl bg-[#E8F8E3] text-xl">
                      🍓
                    </span>
                    <div>
                      <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#FF718D]">
                        Personalized Match
                      </p>
                      <p className="font-display text-base font-bold">ผลการวิเคราะห์ตัวอย่าง</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-extrabold text-emerald-800">
                    98% Match
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-3 rounded-2xl bg-[#FFF9E9] p-3">
                    <span className="text-3xl">🥣</span>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-[#354B2D]">NIBBLY Berry Granola</p>
                      <p className="text-[11px] text-stone-500">ไฟเบอร์สูง 5g · ไม่ใส่น้ำตาลทรายขาว</p>
                    </div>
                    <span className="font-bold text-[#FF718D]">฿149</span>
                  </div>

                  <div className="rounded-2xl border border-stone-200/70 bg-[#FDFBF7] p-3 text-xs text-stone-600">
                    <span className="font-bold text-[#354B2D]">💡 ทำไมถึงเหมาะกับคุณ:</span> ช่วยให้อิ่มนาน คุมความหิวยามบ่าย ไม่ทำให้น้ำตาลในเลือดเหวี่ยง
                  </div>
                </div>

                <Link
                  href="/recommend"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#354B2D] py-3 text-xs font-bold text-white transition hover:bg-[#244A1A]"
                >
                  <span>ทำแบบทดสอบเฉพาะตัวคุณ</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Heading({
  eyebrow,
  title,
  text,
  link,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text: string;
  link?: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs font-extrabold tracking-[.2em] text-[#62BFA1]">{eyebrow}</p>
        <h2 className="mt-2 font-display text-4xl leading-tight text-[#354B2D] sm:text-5xl">{title}</h2>
        <p className="mt-2 max-w-md text-sm text-stone-500">{text}</p>
      </div>
      {link && (
        <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-extrabold text-[#354B2D] hover:text-[#FF718D]">
          {link}
          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}
