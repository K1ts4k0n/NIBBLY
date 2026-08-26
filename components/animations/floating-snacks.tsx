"use client";

import { motion } from "framer-motion";

const decorations = [
  { icon: "🍓", className: "left-[2.5%] top-[18%] hidden lg:block", size: "text-3xl", duration: 6.2, delay: 0 },
  { icon: "🫐", className: "right-[3%] top-[30%] hidden xl:block", size: "text-3xl", duration: 7.4, delay: 0.8 },
  { icon: "🥜", className: "left-[3%] top-[52%] hidden lg:block", size: "text-4xl", duration: 7, delay: 1.1 },
  { icon: "🍪", className: "right-[2.5%] top-[64%] hidden lg:block", size: "text-3xl", duration: 6.7, delay: 0.4 },
  { icon: "🍌", className: "left-[4%] bottom-[13%] hidden xl:block", size: "text-4xl", duration: 7.8, delay: 0.6 },
  { icon: "🍍", className: "right-[4%] bottom-[12%] hidden xl:block", size: "text-4xl", duration: 6.5, delay: 1.2 },
  { icon: "✦", className: "left-[8%] top-[37%]", size: "text-2xl text-[#c77725]/45", duration: 4.5, delay: 0.3 },
  { icon: "✦", className: "right-[8%] top-[48%]", size: "text-xl text-[#8063a3]/40", duration: 5.3, delay: 0.9 },
  { icon: "✦", className: "right-[17%] bottom-[19%] hidden md:block", size: "text-2xl text-[#618a45]/40", duration: 4.8, delay: 0.2 },
];

export function FloatingSnacks() {
  return <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[5] overflow-hidden">
    {decorations.map((item, index) => <motion.span
      key={`${item.icon}-${index}`}
      className={`absolute select-none ${item.className} ${item.size}`}
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: [0, 0.42, 0.42, 0], y: [0, -18, -6, 0], x: [0, index % 2 ? -8 : 8, index % 2 ? 5 : -5, 0], rotate: [-8, 7, -4, -8], scale: [0.82, 1, 0.94, 0.82] }}
      transition={{ duration: item.duration, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
    >{item.icon}</motion.span>)}
  </div>;
}
