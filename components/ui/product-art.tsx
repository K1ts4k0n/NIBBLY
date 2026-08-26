"use client";
import { motion } from "framer-motion";
import Image from "next/image";
type Art = { top: string; bottom: string; blob: string; label: string; emoji: string; bits: string[]; ink: string };
const art: Record<string, Art> = {
  "berry-granola": {top:"#FF8BA4",bottom:"#A678FF",blob:"#FFD7E1",label:"BERRY GRANOLA",emoji:"🥣",bits:["🍓","🫐","🌾"],ink:"#5B256C"},
  honey:{top:"#FFD95A",bottom:"#FF9F43",blob:"#FFF0AA",label:"HONEY ALMOND",emoji:"🍯",bits:["🥜","🌾","✨"],ink:"#7B451B"},
  tropical:{top:"#FFE26F",bottom:"#FF9F43",blob:"#FFF2B8",label:"TROPICAL MIX",emoji:"🍍",bits:["🥭","🍌","🥥"],ink:"#975319"},
  banana:{top:"#C8E86B",bottom:"#6EC8FF",blob:"#FFF5B8",label:"BANANA OAT",emoji:"🍌",bits:["🌾","🥜","✨"],ink:"#266244"},
  "strawberry-yogurt":{top:"#FF9DB1",bottom:"#FF718D",blob:"#FFE1E9",label:"STRAWBERRY YOGURT",emoji:"🍓",bits:["🥛","✨","🍓"],ink:"#8E2846"},
  blueberry:{top:"#6EC8FF",bottom:"#A678FF",blob:"#DBF0FF",label:"BLUEBERRY NUT",emoji:"🫐",bits:["🥜","🌱","✨"],ink:"#343A89"},
  cashew:{top:"#FFCA7A",bottom:"#FF8E57",blob:"#FFF0D0",label:"CASHEW HONEY",emoji:"🥜",bits:["🍯","🌾","✨"],ink:"#80441F"},
  choco:{top:"#9A6A59",bottom:"#8D65BC",blob:"#F3D8C4",label:"CHOCO OAT",emoji:"🍫",bits:["🥜","🌾","✨"],ink:"#492B35"},
  coconut:{top:"#AEE68A",bottom:"#77C7B2",blob:"#FFF0D8",label:"COCONUT ALMOND",emoji:"🥥",bits:["🥜","🌾","✨"],ink:"#235B4A"},
  "mixed-berry":{top:"#FF8BA4",bottom:"#9F75ED",blob:"#FFE5EF",label:"MIXED BERRY",emoji:"🍓",bits:["🫐","🍒","✨"],ink:"#61265B"},
  "banana-chips":{top:"#FFE36C",bottom:"#FFC25B",blob:"#FFF8C7",label:"BANANA CHIPS",emoji:"🍌",bits:["✨","🍂","🌿"],ink:"#855817"},
  pumpkin:{top:"#9DDA70",bottom:"#43B6AA",blob:"#E4F9C6",label:"PUMPKIN CRUNCH",emoji:"🌻",bits:["🌾","🌱","✨"],ink:"#1E624E"},
  mango:{top:"#FFD55D",bottom:"#FF8C51",blob:"#FFF3B4",label:"MANGO CASHEW",emoji:"🥭",bits:["🥜","✨","🌿"],ink:"#8B471C"},
  matcha:{top:"#9DDC72",bottom:"#61BFA1",blob:"#E9F9C8",label:"MATCHA OAT",emoji:"🍵",bits:["🥜","🌾","✨"],ink:"#265E42"},
  protein:{top:"#70C9FF",bottom:"#62B4A6",blob:"#D8F3FF",label:"PROTEIN BITES",emoji:"💪",bits:["🥜","🌱","✨"],ink:"#205A70"},
  apple:{top:"#FFAE72",bottom:"#F87572",blob:"#FFE1BD",label:"APPLE CINNAMON",emoji:"🍎",bits:["🌾","🥜","✨"],ink:"#803B30"},
  "dark-cocoa":{top:"#8D5D66",bottom:"#8C64BC",blob:"#EFD8DF",label:"DARK COCOA",emoji:"🍫",bits:["🥜","✨","🌰"],ink:"#44273F"},
  pineapple:{top:"#FFE35F",bottom:"#FFA24A",blob:"#FFF7B3",label:"PINEAPPLE COCONUT",emoji:"🍍",bits:["🥥","🌾","✨"],ink:"#854B15"},
  "berry-cookies":{top:"#FF91AC",bottom:"#D58CEC",blob:"#FFE3EC",label:"BERRY OAT COOKIES",emoji:"🍪",bits:["🍓","🫐","✨"],ink:"#722957"},
  "super-mix":{top:"#81D6A0",bottom:"#6EC8FF",blob:"#E7FAC9",label:"SUPER SNACK MIX",emoji:"🌈",bits:["🥜","🫐","🍓"],ink:"#245D57"}
};
export function ProductArt({ variant, image, alt, className = "", priority = false }: { variant: string; image?: string; alt?: string; className?: string; priority?: boolean }) {
  const item = art[variant] ?? art.honey;
  if (image) return <div aria-label={alt ?? `${item.label} healthy snack`} className={`product-art relative isolate overflow-hidden ${className}`}>
    <Image src={image} alt={alt ?? item.label} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" priority={priority}/>
    <div className="absolute inset-0 bg-gradient-to-t from-[#2c2115]/45 via-transparent to-transparent"/><span className="absolute bottom-3 left-3 rounded-full bg-[#fff8e8]/90 px-2.5 py-1 text-[8px] font-extrabold tracking-[.14em] text-[#534028] shadow-sm">NIBBLY GOODNESS</span>
  </div>;
  return <div aria-label={`${item.label} healthy snack`} className={`product-art relative isolate overflow-hidden ${className}`} style={{background:`linear-gradient(140deg, ${item.top}, ${item.bottom})`}}>
    <div className="absolute -left-9 -top-9 size-32 rounded-full bg-white/25 blur-[1px]"/><div className="absolute -bottom-10 -right-7 size-36 rounded-full bg-white/20"/>
    {item.bits.map((bit,i)=><motion.span key={`${bit}-${i}`} animate={priority?{y:[0,-7,0],rotate:[-8,8,-8]}:undefined} transition={{repeat:Infinity,duration:2.8+i*.5,delay:i*.3}} className={`absolute z-10 text-${i===0?"3xl":"2xl"}`} style={{left:["12%","72%","18%"][i],top:["18%","20%","72%"][i]}}>{bit}</motion.span>)}
    <motion.div animate={priority?{y:[0,-6,0],rotate:[-1.5,1.5,-1.5]}:undefined} transition={{repeat:Infinity,duration:4.3,ease:"easeInOut"}} className="absolute inset-x-[15%] bottom-[7%] grid h-[69%] place-items-center rounded-[42%_42%_28%_28%] border-[5px] border-white/55 bg-[#FFF8E8] shadow-[0_16px_24px_rgba(80,55,54,.19)]">
      <div className="px-2 text-center"><p className="font-display text-[10px] tracking-[.25em]" style={{color:item.ink}}>NIBBLY</p><span className="my-1 block text-5xl">{item.emoji}</span><p className="text-[7px] font-extrabold tracking-[.13em]" style={{color:item.ink}}>{item.label}</p><span className="mt-2 inline-block rounded-full px-2 py-1 text-[6px] font-extrabold tracking-wider text-white" style={{background:item.ink}}>SNACK HAPPY</span></div>
    </motion.div><span className="absolute right-[8%] top-[48%] text-lg text-white">✦</span>
  </div>;
}
