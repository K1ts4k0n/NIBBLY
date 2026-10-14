"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * Mascot 1: Cute cartoon illustration for Newsletter Subscription Thank-You
 * "ขอบคุณสำหรับการสมัครรับข่าวสาร" 🍓🥑💌
 */
export function SubscribeCuteMascot({ className = "w-64 h-56" }: { className?: string }) {
  return (
    <div className={`relative mx-auto flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 320 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        <defs>
          <linearGradient id="sub-bg-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF0F5" />
            <stop offset="50%" stopColor="#FFF8E7" />
            <stop offset="100%" stopColor="#E8F8F5" />
          </linearGradient>
          <linearGradient id="straw-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6584" />
            <stop offset="100%" stopColor="#FF3366" />
          </linearGradient>
          <linearGradient id="avo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#80ED99" />
            <stop offset="100%" stopColor="#38B000" />
          </linearGradient>
          <linearGradient id="avo-belly" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF3B0" />
            <stop offset="100%" stopColor="#FFE066" />
          </linearGradient>
          <linearGradient id="letter-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFF9EB" />
          </linearGradient>
          <filter id="cute-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#FF718D" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Soft magical background cloud */}
        <ellipse cx="160" cy="245" rx="120" ry="18" fill="#F0E0D6" opacity="0.6" />
        <ellipse cx="160" cy="140" rx="140" ry="110" fill="url(#sub-bg-glow)" />

        {/* Floating Confetti and Sparkles */}
        <circle cx="50" cy="50" r="6" fill="#FFD166" />
        <circle cx="270" cy="60" r="7" fill="#FF70A6" />
        <circle cx="40" cy="130" r="5" fill="#70D6FF" />
        <circle cx="280" cy="140" r="5" fill="#E9FF70" />
        <circle cx="160" cy="25" r="5" fill="#FF9770" />

        {/* Floating Star 1 */}
        <path d="M 75 80 L 80 92 L 92 92 L 82 100 L 86 112 L 75 104 L 64 112 L 68 100 L 58 92 L 70 92 Z" fill="#FFD166" />
        {/* Floating Star 2 */}
        <path d="M 245 75 L 249 85 L 259 85 L 251 91 L 254 101 L 245 95 L 236 101 L 239 91 L 231 85 L 241 85 Z" fill="#FF9E00" />
        {/* Little Heart */}
        <path d="M 160 55 C 160 45 145 45 145 55 C 145 65 160 75 160 75 C 160 75 175 65 175 55 C 175 45 160 45 160 55 Z" fill="#FF3366" />

        {/* ================= MASCOT 1: HAPPY AVOCADO (LEFT) ================= */}
        <g id="avocado-group">
          {/* Avocado Body */}
          <path
            d="M 95 120 C 70 145 65 190 85 220 C 105 245 145 245 155 220 C 165 195 145 145 120 120 C 110 110 100 110 95 120 Z"
            fill="url(#avo-grad)"
          />
          {/* Avocado Light Belly */}
          <ellipse cx="118" cy="190" rx="30" ry="38" fill="url(#avo-belly)" />
          {/* Seed / Center Heart */}
          <ellipse cx="118" cy="200" rx="14" ry="16" fill="#8B4513" opacity="0.35" />

          {/* Avocado Cute Face */}
          {/* Eyes (Happy curved eyes ^_^) */}
          <path d="M 106 175 Q 111 170 116 175" stroke="#2D3748" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 124 175 Q 129 170 134 175" stroke="#2D3748" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Blushing Cheeks */}
          <ellipse cx="104" cy="182" rx="5" ry="3" fill="#FF85A1" opacity="0.8" />
          <ellipse cx="136" cy="182" rx="5" ry="3" fill="#FF85A1" opacity="0.8" />
          {/* Cute Open Smile */}
          <path d="M 116 182 Q 120 188 124 182" stroke="#2D3748" strokeWidth="2.5" strokeLinecap="round" fill="#FF3366" />

          {/* Avocado Hand Waving */}
          <path d="M 75 170 C 60 160 62 145 70 140 C 78 135 85 155 80 172 Z" fill="#52B788" />
        </g>

        {/* ================= MASCOT 2: CUTE STRAWBERRY (RIGHT) ================= */}
        <g id="strawberry-group">
          {/* Strawberry Body */}
          <path
            d="M 195 115 C 235 115 255 150 245 195 C 235 235 190 245 175 240 C 160 230 155 195 160 165 C 165 130 175 115 195 115 Z"
            fill="url(#straw-grad)"
            filter="url(#cute-shadow)"
          />

          {/* Strawberry Green Leaves Hat */}
          <path d="M 195 118 Q 185 95 175 105 Q 190 115 195 118" fill="#52B788" />
          <path d="M 195 118 Q 198 90 205 95 Q 200 112 195 118" fill="#38B000" />
          <path d="M 195 118 Q 215 100 220 110 Q 205 118 195 118" fill="#52B788" />
          <circle cx="196" cy="98" r="3" fill="#FFD166" />

          {/* Strawberry Seeds (Cute little yellow drops) */}
          <ellipse cx="178" cy="145" rx="2" ry="3" fill="#FFE382" />
          <ellipse cx="225" cy="150" rx="2" ry="3" fill="#FFE382" />
          <ellipse cx="180" cy="215" rx="2" ry="3" fill="#FFE382" />
          <ellipse cx="230" cy="205" rx="2" ry="3" fill="#FFE382" />
          <ellipse cx="210" cy="225" rx="2" ry="3" fill="#FFE382" />

          {/* Strawberry Face (Sparkly Big Anime Eyes) */}
          <circle cx="188" cy="165" r="6" fill="#1A202C" />
          <circle cx="186" cy="163" r="2.2" fill="#FFFFFF" />
          <circle cx="190" cy="167" r="1.2" fill="#FFFFFF" />

          <circle cx="215" cy="165" r="6" fill="#1A202C" />
          <circle cx="213" cy="163" r="2.2" fill="#FFFFFF" />
          <circle cx="217" cy="167" r="1.2" fill="#FFFFFF" />

          {/* Blushing Cheeks */}
          <ellipse cx="179" cy="173" rx="6" ry="3.5" fill="#FFA5BA" />
          <ellipse cx="224" cy="173" rx="6" ry="3.5" fill="#FFA5BA" />

          {/* Big Cheerful Open Mouth */}
          <path d="M 197 172 Q 202 182 207 172 Z" fill="#990033" stroke="#990033" />
          <ellipse cx="202" cy="176" rx="3" ry="2" fill="#FF70A6" />
        </g>

        {/* ================= CENTER: LOVE NEWSLETTER ENVELOPE ================= */}
        <g id="envelope-group">
          {/* Envelope Body */}
          <rect x="125" y="150" width="75" height="52" rx="10" fill="url(#letter-grad)" stroke="#FFB5C5" strokeWidth="2.5" />
          {/* Envelope Flap Back */}
          <path d="M 126 152 L 162.5 178 L 199 152" stroke="#FF718D" strokeWidth="2" fill="none" />
          {/* Seal Heart */}
          <circle cx="162.5" cy="176" r="10" fill="#FF3366" />
          <path d="M 162.5 173 C 162.5 169 157 169 157 173 C 157 178 162.5 182 162.5 182 C 162.5 182 168 178 168 173 C 168 169 162.5 169 162.5 173 Z" fill="#FFFFFF" />

          {/* Cute Little Hands holding the envelope */}
          <ellipse cx="132" cy="175" rx="6" ry="5" fill="#70D668" />
          <ellipse cx="194" cy="175" rx="6" ry="5" fill="#FF6584" />
        </g>

        {/* Bottom Banner Ribbon */}
        <g id="banner-group">
          <rect x="35" y="235" width="250" height="34" rx="17" fill="#FFFFFF" stroke="#FFD2DC" strokeWidth="2.5" />
          <text x="160" y="258" textAnchor="middle" fill="#E63946" fontSize="13.5" fontWeight="900" fontFamily="sans-serif">
            💌 ขอบคุณที่สมัครรับข่าวสาร! 🌈✨
          </text>
        </g>
      </svg>
    </div>
  );
}

/**
 * Mascot 2: Cute cartoon illustration for Order Thank-You & Checkout Success
 * "ขอบคุณสำหรับการสั่งซื้อ" 📦🎉🍓🥣
 */
export function OrderCuteMascot({ className = "w-68 h-60" }: { className?: string }) {
  return (
    <div className={`relative mx-auto flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 340 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="order-bg-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4E6" />
            <stop offset="40%" stopColor="#FFF0F5" />
            <stop offset="100%" stopColor="#EBF8FF" />
          </linearGradient>
          <linearGradient id="box-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="100%" stopColor="#FFB300" />
          </linearGradient>
          <linearGradient id="box-lid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF3B0" />
            <stop offset="100%" stopColor="#FFCA28" />
          </linearGradient>
          <linearGradient id="ribbon-pink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF758F" />
            <stop offset="100%" stopColor="#FF3366" />
          </linearGradient>
          <filter id="box-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#E65100" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Soft shadow base */}
        <ellipse cx="170" cy="265" rx="125" ry="18" fill="#E8D5C4" opacity="0.6" />
        {/* Glow backdrop */}
        <ellipse cx="170" cy="150" rx="145" ry="120" fill="url(#order-bg-glow)" />

        {/* Celebration Confetti & Sparkles */}
        <circle cx="45" cy="65" r="7" fill="#FF5964" />
        <circle cx="295" cy="70" r="8" fill="#35A7FF" />
        <circle cx="35" cy="150" r="5" fill="#FFE74C" />
        <circle cx="305" cy="160" r="6" fill="#38B000" />
        <rect x="75" y="45" width="8" height="8" rx="2" transform="rotate(25 75 45)" fill="#FF9F1C" />
        <rect x="255" y="40" width="9" height="9" rx="2" transform="rotate(-30 255 40)" fill="#FF70A6" />
        <rect x="165" y="20" width="7" height="7" rx="2" transform="rotate(45 165 20)" fill="#70D6FF" />

        {/* Magical Stars */}
        <path d="M 60 95 L 64 105 L 74 105 L 66 111 L 69 121 L 60 115 L 51 121 L 54 111 L 46 105 L 56 105 Z" fill="#FFD166" />
        <path d="M 275 105 L 279 115 L 289 115 L 281 121 L 284 131 L 275 125 L 266 131 L 269 121 L 261 105 L 271 105 Z" fill="#FFD166" />

        {/* ================= CUTE SNACK CHARACTERS PEEKING OUT ================= */}
        {/* Strawberry Left */}
        <g transform="translate(100, 75) rotate(-15) scale(0.65)">
          <path d="M 40 10 C 65 10 75 35 70 65 C 65 90 35 98 25 95 C 15 90 12 65 15 45 C 18 20 25 10 40 10 Z" fill="#FF3366" />
          <path d="M 40 12 Q 33 -5 27 3 Q 36 10 40 12" fill="#38B000" />
          <path d="M 40 12 Q 42 -8 47 -4 Q 44 8 40 12" fill="#38B000" />
          <circle cx="34" cy="45" r="4.5" fill="#1A202C" />
          <circle cx="33" cy="43" r="1.5" fill="#FFFFFF" />
          <circle cx="52" cy="45" r="4.5" fill="#1A202C" />
          <circle cx="51" cy="43" r="1.5" fill="#FFFFFF" />
          <ellipse cx="27" cy="52" rx="4" ry="2.5" fill="#FFA5BA" />
          <ellipse cx="58" cy="52" rx="4" ry="2.5" fill="#FFA5BA" />
          <path d="M 40 52 Q 43 59 47 52" stroke="#1A202C" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Granola Bowl / Honey Bear Right */}
        <g transform="translate(185, 70) rotate(15) scale(0.65)">
          <ellipse cx="45" cy="55" rx="35" ry="32" fill="#FFAA00" />
          {/* Bear Ears */}
          <circle cx="20" cy="30" r="12" fill="#FFAA00" />
          <circle cx="20" cy="30" r="6" fill="#FFE082" />
          <circle cx="70" cy="30" r="12" fill="#FFAA00" />
          <circle cx="70" cy="30" r="6" fill="#FFE082" />
          {/* Eyes */}
          <circle cx="34" cy="52" r="4" fill="#2D3748" />
          <circle cx="33" cy="50" r="1.5" fill="#FFFFFF" />
          <circle cx="56" cy="52" r="4" fill="#2D3748" />
          <circle cx="55" cy="50" r="1.5" fill="#FFFFFF" />
          {/* Snout */}
          <ellipse cx="45" cy="62" rx="10" ry="8" fill="#FFF3B0" />
          <circle cx="45" cy="59" r="3" fill="#6B4513" />
          <path d="M 42 64 Q 45 68 48 64" stroke="#6B4513" strokeWidth="1.5" fill="none" />
          {/* Cheeks */}
          <ellipse cx="26" cy="60" rx="4" ry="2.5" fill="#FF85A1" />
          <ellipse cx="64" cy="60" rx="4" ry="2.5" fill="#FF85A1" />
        </g>

        {/* ================= CENTER: CUTE ANIMATED SNACK GIFT BOX ================= */}
        <g id="gift-box" filter="url(#box-shadow)">
          {/* Main Box Body */}
          <rect x="95" y="130" width="150" height="110" rx="20" fill="url(#box-grad)" stroke="#FFA000" strokeWidth="3" />
          {/* Box Lid */}
          <rect x="85" y="116" width="170" height="28" rx="12" fill="url(#box-lid)" stroke="#FFA000" strokeWidth="3" />

          {/* Ribbon Vertical */}
          <rect x="156" y="116" width="28" height="124" fill="url(#ribbon-pink)" />
          {/* Ribbon Horizontal */}
          <rect x="95" y="165" width="150" height="24" fill="url(#ribbon-pink)" />

          {/* Giant Ribbon Bow on Top */}
          <path d="M 170 116 C 145 80 120 100 156 116 Z" fill="url(#ribbon-pink)" />
          <path d="M 170 116 C 195 80 220 100 184 116 Z" fill="url(#ribbon-pink)" />
          {/* Ribbon Knot */}
          <circle cx="170" cy="116" r="11" fill="#FF1744" stroke="#FFFFFF" strokeWidth="2" />

          {/* Ribbon Tails */}
          <path d="M 166 122 C 160 140 148 145 142 148" stroke="#FF1744" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M 174 122 C 180 140 192 145 198 148" stroke="#FF1744" strokeWidth="4.5" strokeLinecap="round" fill="none" />

          {/* ================= BOX KAWAII FACE ================= */}
          {/* Sparkly Left Eye */}
          <circle cx="132" cy="180" r="7" fill="#1A202C" />
          <circle cx="130" cy="177" r="2.8" fill="#FFFFFF" />
          <circle cx="134" cy="182" r="1.4" fill="#FFFFFF" />

          {/* Sparkly Right Eye */}
          <circle cx="208" cy="180" r="7" fill="#1A202C" />
          <circle cx="206" cy="177" r="2.8" fill="#FFFFFF" />
          <circle cx="210" cy="182" r="1.4" fill="#FFFFFF" />

          {/* Rosy Blushing Cheeks */}
          <ellipse cx="122" cy="188" rx="8" ry="4.5" fill="#FF5252" opacity="0.85" />
          <ellipse cx="218" cy="188" rx="8" ry="4.5" fill="#FF5252" opacity="0.85" />

          {/* Cute Happy Smile */}
          <path d="M 162 188 Q 170 198 178 188" stroke="#1A202C" strokeWidth="3" strokeLinecap="round" fill="#FF3366" />
          <circle cx="170" cy="193" r="2.5" fill="#FF80AB" />
        </g>

        {/* NIBBLY Special Snack Badge Tag */}
        <g transform="translate(195, 205) rotate(-10)">
          <rect x="0" y="0" width="60" height="26" rx="8" fill="#FFFFFF" stroke="#FF758F" strokeWidth="2" />
          <text x="30" y="17" textAnchor="middle" fill="#E63946" fontSize="10.5" fontWeight="900" fontFamily="sans-serif">
            NIBBLY 🍓
          </text>
        </g>

        {/* Bottom Banner Ribbon */}
        <g id="banner-group">
          <rect x="30" y="250" width="280" height="38" rx="19" fill="#FFFFFF" stroke="#52B788" strokeWidth="2.5" />
          <text x="170" y="274" textAnchor="middle" fill="#1B4332" fontSize="14" fontWeight="900" fontFamily="sans-serif">
            🎉 ขอบคุณสำหรับการสั่งซื้อแสนอร่อย! 📦💖
          </text>
        </g>
      </svg>
    </div>
  );
}
