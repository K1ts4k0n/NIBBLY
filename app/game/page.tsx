"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  RotateCcw,
  Volume2,
  VolumeX,
  Trophy,
  ArrowRight,
  ShoppingBag,
  Copy,
  Check,
  Star,
  Flame,
  Gift,
  Heart,
  ChevronLeft,
} from "lucide-react";

// Snack candy tile types
type SnackType = "strawberry" | "blueberry" | "banana" | "avocado" | "choco" | "gummy";

interface Tile {
  id: string;
  type: SnackType;
  emoji: string;
  name: string;
  color: string;
  bgGrad: string;
  borderCol: string;
}

const SNACK_ITEMS: Record<SnackType, Omit<Tile, "id">> = {
  strawberry: {
    type: "strawberry",
    emoji: "🍓",
    name: "สตรอว์เบอร์รี",
    color: "#FF4D6D",
    bgGrad: "from-[#FF758F] to-[#E63946]",
    borderCol: "#C9184A",
  },
  blueberry: {
    type: "blueberry",
    emoji: "🫐",
    name: "บลูเบอร์รี",
    color: "#4361EE",
    bgGrad: "from-[#4CC9F0] to-[#4361EE]",
    borderCol: "#3A0CA3",
  },
  banana: {
    type: "banana",
    emoji: "🍌",
    name: "กล้วยหอมทอง",
    color: "#F7B801",
    bgGrad: "from-[#FFE169] to-[#F7B801]",
    borderCol: "#E09F3E",
  },
  avocado: {
    type: "avocado",
    emoji: "🥑",
    name: "อโวคาโดคลีน",
    color: "#38B000",
    bgGrad: "from-[#70E000] to-[#38B000]",
    borderCol: "#007200",
  },
  choco: {
    type: "choco",
    emoji: "🍫",
    name: "ดาร์กโกโก้",
    color: "#6F1D1B",
    bgGrad: "from-[#A65B32] to-[#6F1D1B]",
    borderCol: "#4A1513",
  },
  gummy: {
    type: "gummy",
    emoji: "🧸",
    name: "เยลลี่น้องหมี",
    color: "#06D6A0",
    bgGrad: "from-[#5EEAD4] to-[#0D9488]",
    borderCol: "#0F766E",
  },
};

const SNACK_KEYS: SnackType[] = ["strawberry", "blueberry", "banana", "avocado", "choco", "gummy"];

const GRID_SIZE = 7;
const TARGET_SCORE = 1200;
const INITIAL_MOVES = 16;
const PROMO_CODE_30 = "NIBBLYCRUSH30";

// Sound synthesizer using Web Audio API
class SoundFX {
  private ctx: AudioContext | null = null;
  public enabled = true;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playPop(pitch = 520) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(pitch * 1.5, this.ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  playSwap() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(320, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(480, this.ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playFanfare() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + idx * 0.12);
      gain.gain.setValueAtTime(0.3, this.ctx!.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx!.currentTime + idx * 0.12 + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(this.ctx!.currentTime + idx * 0.12);
      osc.stop(this.ctx!.currentTime + idx * 0.12 + 0.35);
    });
  }
}

const sfx = new SoundFX();

export default function SnackCrushGame() {
  const [grid, setGrid] = useState<Tile[][]>([]);
  const [selectedPos, setSelectedPos] = useState<{ r: number; c: number } | null>(null);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(INITIAL_MOVES);
  const [combo, setCombo] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
  const [copied, setCopied] = useState(false);
  const [floatingPoints, setFloatingPoints] = useState<{ id: number; text: string; x: number; y: number }[]>([]);
  const pointCounterRef = useRef(0);

  // Helper to spawn random tile
  const makeTile = (type?: SnackType): Tile => {
    const chosenType = type || SNACK_KEYS[Math.floor(Math.random() * SNACK_KEYS.length)];
    return {
      id: "t_" + Math.random().toString(36).substring(2, 9),
      ...SNACK_ITEMS[chosenType],
    };
  };

  // Build grid without initial matches
  const initGrid = useCallback(() => {
    const newGrid: Tile[][] = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      newGrid[r] = [];
      for (let c = 0; c < GRID_SIZE; c++) {
        let tile: Tile;
        do {
          tile = makeTile();
        } while (
          (r >= 2 && newGrid[r - 1][c]?.type === tile.type && newGrid[r - 2][c]?.type === tile.type) ||
          (c >= 2 && newGrid[r][c - 1]?.type === tile.type && newGrid[r][c - 2]?.type === tile.type)
        );
        newGrid[r][c] = tile;
      }
    }
    setGrid(newGrid);
    setScore(0);
    setMoves(INITIAL_MOVES);
    setCombo(0);
    setGameState("playing");
    setSelectedPos(null);
  }, []);

  useEffect(() => {
    initGrid();
  }, [initGrid]);

  const toggleSound = () => {
    sfx.enabled = !soundOn;
    setSoundOn(!soundOn);
  };

  // Check matching lines
  const findMatches = (currentGrid: Tile[][]): { r: number; c: number }[] => {
    const matchedCoords: Set<string> = new Set();

    // Check rows
    for (let r = 0; r < GRID_SIZE; r++) {
      let count = 1;
      for (let c = 1; c < GRID_SIZE; c++) {
        if (currentGrid[r][c].type === currentGrid[r][c - 1].type) {
          count++;
        } else {
          if (count >= 3) {
            for (let i = c - count; i < c; i++) matchedCoords.add(`${r},${i}`);
          }
          count = 1;
        }
      }
      if (count >= 3) {
        for (let i = GRID_SIZE - count; i < GRID_SIZE; i++) matchedCoords.add(`${r},${i}`);
      }
    }

    // Check cols
    for (let c = 0; c < GRID_SIZE; c++) {
      let count = 1;
      for (let r = 1; r < GRID_SIZE; r++) {
        if (currentGrid[r][c].type === currentGrid[r - 1][c].type) {
          count++;
        } else {
          if (count >= 3) {
            for (let i = r - count; i < r; i++) matchedCoords.add(`${i},${c}`);
          }
          count = 1;
        }
      }
      if (count >= 3) {
        for (let i = GRID_SIZE - count; i < GRID_SIZE; i++) matchedCoords.add(`${i},${c}`);
      }
    }

    return Array.from(matchedCoords).map((str) => {
      const [r, c] = str.split(",").map(Number);
      return { r, c };
    });
  };

  // Gravity & refilling matches
  const resolveBoard = (initialGrid: Tile[][], currentMoves: number, initialScore: number) => {
    let current = initialGrid.map((row) => [...row]);
    let totalAddedScore = 0;
    let currentCombo = 0;

    const step = () => {
      const matches = findMatches(current);
      if (matches.length === 0) {
        // Finished cascading
        const finalScore = initialScore + totalAddedScore;
        setScore(finalScore);
        setGrid(current);
        setMoves(currentMoves);

        if (finalScore >= TARGET_SCORE) {
          setGameState("won");
          sfx.playFanfare();
        } else if (currentMoves <= 0) {
          setGameState("lost");
        }
        return;
      }

      currentCombo++;
      sfx.playPop(480 + currentCombo * 60);

      // Add points
      const pts = matches.length * 40 * currentCombo;
      totalAddedScore += pts;

      // Create floating score animation
      const centerMatch = matches[Math.floor(matches.length / 2)];
      const ptId = pointCounterRef.current++;
      setFloatingPoints((prev) => [
        ...prev,
        {
          id: ptId,
          text: `+${pts} ${currentCombo > 1 ? `Combo x${currentCombo}!` : ""}`,
          x: centerMatch.c * 48 + 20,
          y: centerMatch.r * 48,
        },
      ]);
      setTimeout(() => {
        setFloatingPoints((prev) => prev.filter((p) => p.id !== ptId));
      }, 1000);

      // Clear matched
      matches.forEach(({ r, c }) => {
        current[r][c] = null as any;
      });

      // Gravity: drop down
      for (let c = 0; c < GRID_SIZE; c++) {
        let emptyRow = GRID_SIZE - 1;
        for (let r = GRID_SIZE - 1; r >= 0; r--) {
          if (current[r][c] !== null) {
            if (emptyRow !== r) {
              current[emptyRow][c] = current[r][c];
              current[r][c] = null as any;
            }
            emptyRow--;
          }
        }
        // Fill top empty with new tiles
        for (let r = emptyRow; r >= 0; r--) {
          current[r][c] = makeTile();
        }
      }

      setGrid([...current.map((r) => [...r])]);
      setTimeout(step, 240);
    };

    step();
  };

  // Handle tile click
  const handleTileClick = (r: number, c: number) => {
    if (gameState !== "playing" || moves <= 0) return;

    if (!selectedPos) {
      setSelectedPos({ r, c });
      sfx.playSwap();
      return;
    }

    const dr = Math.abs(selectedPos.r - r);
    const dc = Math.abs(selectedPos.c - c);
    const isAdjacent = (dr === 1 && dc === 0) || (dr === 0 && dc === 1);

    if (!isAdjacent) {
      // Select new tile
      setSelectedPos({ r, c });
      sfx.playSwap();
      return;
    }

    // Try swap
    const nextGrid = grid.map((row) => [...row]);
    const tileA = nextGrid[selectedPos.r][selectedPos.c];
    const tileB = nextGrid[r][c];

    nextGrid[selectedPos.r][selectedPos.c] = tileB;
    nextGrid[r][c] = tileA;

    const matches = findMatches(nextGrid);
    if (matches.length > 0) {
      // Valid swap!
      setSelectedPos(null);
      sfx.playSwap();
      const newMoves = moves - 1;
      resolveBoard(nextGrid, newMoves, score);
    } else {
      // Invalid swap: shake / swap back
      sfx.playSwap();
      setSelectedPos(null);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(PROMO_CODE_30);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const progressPercent = Math.min(100, Math.round((score / TARGET_SCORE) * 100));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#B8E6FF] via-[#E2F5FF] to-[#FFF9ED] text-[#2C4026] relative overflow-hidden">
      {/* Background Sweet Clouds & Floating Gummy Bear */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-5 size-72 rounded-full bg-white/60 blur-3xl" />
        <div className="absolute top-40 right-5 size-80 rounded-full bg-[#FF718D]/20 blur-3xl" />
        <div className="absolute bottom-20 left-1/3 size-96 rounded-full bg-[#FFD95A]/25 blur-3xl" />
      </div>

      {/* Main Container */}
      <div className="relative mx-auto max-w-4xl px-4 py-6 sm:px-6">
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-[#354B2D] shadow-xs backdrop-blur-md hover:bg-white transition"
          >
            <ChevronLeft size={16} />
            <span>กลับสู่ร้านค้า</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleSound}
              className="flex size-9 items-center justify-center rounded-full border border-white/80 bg-white/90 text-stone-700 shadow-xs hover:bg-white transition"
              title="เปิด/ปิดเสียง"
            >
              {soundOn ? <Volume2 size={16} className="text-[#354B2D]" /> : <VolumeX size={16} className="text-stone-400" />}
            </button>

            <button
              onClick={initGrid}
              className="flex items-center gap-1 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-bold text-[#354B2D] shadow-xs hover:bg-white transition"
            >
              <RotateCcw size={14} />
              <span>เริ่มใหม่</span>
            </button>
          </div>
        </div>

        {/* Game Title & Mission */}
        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FF718D] px-4 py-1 text-xs font-black text-white shadow-md">
            <Sparkles size={14} className="text-[#FFD95A] animate-spin-slow" />
            <span>NIBBLY SNACK CRUSH • เล่นชนะรับส่วนลด 30%!</span>
          </div>

          <h1 className="mt-2 font-display text-3xl sm:text-5xl font-black text-[#263D20] tracking-tight">
            แคนดี้สแน็ก <span className="bg-gradient-to-r from-[#FF718D] via-[#FF9F43] to-[#8BC34A] bg-clip-text text-transparent">ปาร์ตี้ผลไม้</span> 🍓🧸
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-600 font-medium">
            สลับขนมสุขภาพให้เรียงติดกัน 3 ชิ้นขึ้นไป ทำคะแนนให้ถึง <b>{TARGET_SCORE} คะแนน</b> เพื่อปลดล็อกโค้ดลด 30%!
          </p>
        </div>

        {/* Game Layout (Dashboard + Board) */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[260px_1fr] items-start">
          {/* Left: Candy Soda Style Dashboard Panel */}
          <div className="space-y-4">
            {/* Moves & Gummy Bear Box */}
            <div className="relative overflow-hidden rounded-3xl border-4 border-[#78C9FF] bg-gradient-to-b from-[#2596FF] via-[#0077E6] to-[#005AB3] p-5 text-white shadow-xl shadow-[#0077E6]/25">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black tracking-wider uppercase opacity-90">จำนวนครั้งที่สลับ</span>
                <span className="text-xs font-mono font-bold bg-white/20 px-2 py-0.5 rounded-full">Moves</span>
              </div>

              {/* Big Moves Number */}
              <div className="mt-2 text-center">
                <span className="font-display text-5xl font-black tracking-tight text-[#FFF3B0] drop-shadow-md">
                  {moves}
                </span>
                <p className="text-[11px] font-bold text-white/80">ตาที่เหลือ</p>
              </div>

              {/* Mission Goal Cute Box */}
              <div className="mt-4 rounded-2xl bg-white/15 p-3.5 backdrop-blur-xs border border-white/20 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl animate-bounce">🧸</span>
                  <div className="text-left">
                    <p className="text-[11px] font-black text-[#FFE082]">เป้าหมายชัยชนะ:</p>
                    <p className="text-xs font-extrabold">{TARGET_SCORE} คะแนน</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Score & Star Progress */}
            <div className="rounded-3xl border-2 border-[#E8DCB8] bg-white/95 p-5 shadow-lg shadow-black/5">
              <div className="flex items-center justify-between text-xs font-bold text-stone-600">
                <span>คะแนนปัจจุบัน</span>
                <span className="font-mono text-sm font-black text-[#2D4125]">{score}</span>
              </div>

              {/* Star Progress Bar */}
              <div className="mt-3 relative h-4 w-full overflow-hidden rounded-full bg-stone-100 border border-stone-200">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#FFD95A] via-[#FF9F43] to-[#FF718D]"
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* 3 Stars Milestone */}
              <div className="mt-3 flex items-center justify-between px-1">
                <div className={`flex items-center gap-0.5 ${score >= TARGET_SCORE * 0.33 ? "text-[#FFB703]" : "text-stone-300"}`}>
                  <Star size={16} fill="currentColor" />
                  <span className="text-[10px] font-bold">1★</span>
                </div>
                <div className={`flex items-center gap-0.5 ${score >= TARGET_SCORE * 0.66 ? "text-[#FFB703]" : "text-stone-300"}`}>
                  <Star size={18} fill="currentColor" />
                  <span className="text-[10px] font-bold">2★</span>
                </div>
                <div className={`flex items-center gap-0.5 ${score >= TARGET_SCORE ? "text-[#FFB703]" : "text-stone-300"}`}>
                  <Star size={22} fill="currentColor" className="animate-spin-slow" />
                  <span className="text-[11px] font-black">3★ ปลดล็อก!</span>
                </div>
              </div>

              {/* Discount Promo Teaser */}
              <div className="mt-4 rounded-2xl bg-[#FFF0F4] border border-[#FFCCD8] p-3 text-center">
                <span className="text-xs font-black text-[#FF718D]">🎁 รางวัลเมื่อชนะ:</span>
                <p className="font-mono text-sm font-black text-[#354B2D] mt-0.5">ส่วนลด 30% ไม่มีขั้นต่ำ!</p>
              </div>
            </div>
          </div>

          {/* Right: The Match-3 Grid Board */}
          <div className="relative mx-auto flex flex-col items-center">
            {/* Glossy Candy Board Frame */}
            <div className="relative rounded-3xl border-4 border-[#BCE1FF] bg-gradient-to-b from-[#62B8FF]/40 via-[#99D5FF]/30 to-[#CCE9FF]/40 p-3 sm:p-4 shadow-2xl backdrop-blur-md">
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2 select-none">
                {grid.map((row, r) =>
                  row.map((tile, c) => {
                    if (!tile) return <div key={`${r}-${c}`} className="size-11 sm:size-14" />;

                    const isSelected = selectedPos?.r === r && selectedPos?.c === c;

                    return (
                      <motion.button
                        key={tile.id}
                        layout
                        initial={{ scale: 0 }}
                        animate={{
                          scale: isSelected ? 1.15 : 1,
                          rotate: isSelected ? [0, -6, 6, 0] : 0,
                        }}
                        transition={{ duration: 0.18 }}
                        onClick={() => handleTileClick(r, c)}
                        className={`relative size-11 sm:size-14 flex items-center justify-center rounded-2xl sm:rounded-3xl shadow-md transition-all ${
                          isSelected
                            ? "ring-4 ring-[#FFD95A] ring-offset-2 z-20 shadow-xl"
                            : "hover:scale-105 active:scale-90"
                        } bg-gradient-to-br ${tile.bgGrad} border-b-4 border-r-2`}
                        style={{ borderColor: tile.borderCol }}
                      >
                        {/* Glossy highlight reflection */}
                        <div className="pointer-events-none absolute top-1 left-2 h-2.5 w-5 rounded-full bg-white/40 blur-[0.5px]" />
                        <span className="text-2xl sm:text-3xl drop-shadow-sm">{tile.emoji}</span>
                      </motion.button>
                    );
                  })
                )}
              </div>

              {/* Floating score badges */}
              <div className="pointer-events-none absolute inset-0">
                {floatingPoints.map((pt) => (
                  <motion.div
                    key={pt.id}
                    initial={{ opacity: 1, y: pt.y, x: pt.x, scale: 0.8 }}
                    animate={{ opacity: 0, y: pt.y - 45, scale: 1.25 }}
                    transition={{ duration: 0.85 }}
                    className="absolute font-display text-sm sm:text-base font-black text-[#FFD95A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                  >
                    {pt.text}
                  </motion.div>
                ))}
              </div>
            </div>

            <p className="mt-4 text-xs font-bold text-stone-500">
              💡 แตะขนมชิ้นแรก แล้วแตะชิ้นข้างๆ เพื่อสลับตำแหน่งให้เรียงครบ 3 ชิ้น
            </p>
          </div>
        </div>

        {/* Victory Modal with 30% Discount Coupon! */}
        <AnimatePresence>
          {gameState === "won" && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative w-full max-w-md overflow-hidden rounded-[36px] border-4 border-[#FFD95A] bg-white p-7 text-center shadow-2xl"
              >
                {/* Decorative floating ribbon */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 size-40 rounded-full bg-[#FF718D]/20 blur-2xl pointer-events-none" />

                <div className="flex justify-center -space-x-1">
                  <Star size={36} className="text-[#FFB703] fill-[#FFB703] animate-bounce" />
                  <Star size={48} className="text-[#FFD95A] fill-[#FFD95A] -mt-3 animate-pulse" />
                  <Star size={36} className="text-[#FFB703] fill-[#FFB703] animate-bounce" />
                </div>

                <span className="mt-3 inline-block rounded-full bg-[#8BC34A]/20 px-3.5 py-1 text-xs font-black text-[#2E7D32]">
                  🎉 VICTORY! ชนะเลิศ 3 ดาวเต็ม!
                </span>

                <h2 className="mt-2 font-display text-3xl font-black text-[#2D4125]">
                  คุณคือเซียน Snack Crush! 🍓🧸
                </h2>
                <p className="mt-1 text-xs text-stone-600">
                  ทำคะแนนทะลุเป้าสำเร็จ รับรางวัลใหญ่ส่วนลด 30% ไปช้อปขนมคลีนให้จุใจเลยค่า!
                </p>

                {/* Big Coupon Card */}
                <div className="mt-5 rounded-3xl border-2 border-dashed border-[#FF718D] bg-[#FFF0F4] p-5">
                  <span className="text-xs font-bold text-[#FF718D]">คูปองส่วนลดพิเศษเฉพาะผู้ชนะ:</span>
                  <div className="mt-2 font-display text-4xl font-black text-[#D81159]">
                    ลด 30%
                  </div>
                  <p className="text-[11px] text-stone-500 mt-0.5">ใช้ได้กับขนมทุกหมวดหมู่บนเว็บไซต์ ไม่มีขั้นต่ำ!</p>

                  <div className="mt-4 flex items-center justify-between rounded-2xl bg-white p-2.5 border border-[#FFCCD8]">
                    <span className="font-mono text-base font-black text-[#2D4125] tracking-widest pl-2">
                      {PROMO_CODE_30}
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition ${
                        copied ? "bg-[#2D4125] text-white" : "bg-[#FF718D] text-white hover:bg-[#D81159]"
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check size={14} />
                          <span>คัดลอกแล้ว</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>คัดลอกโค้ด</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col gap-2.5">
                  <Link
                    href="/shop"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2D4125] py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#FF718D] hover:scale-[1.02]"
                  >
                    <ShoppingBag size={17} />
                    <span>นำโค้ดไปช้อปขนมเลย 🛒</span>
                  </Link>

                  <button
                    onClick={initGrid}
                    className="inline-flex items-center justify-center gap-1 text-xs font-bold text-stone-500 hover:text-stone-800 py-1"
                  >
                    <RotateCcw size={13} />
                    <span>เล่นใหม่อีกรอบ</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Game Over Modal */}
        <AnimatePresence>
          {gameState === "lost" && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-full max-w-sm rounded-[32px] border-2 border-stone-200 bg-white p-7 text-center shadow-2xl"
              >
                <span className="text-5xl">🥺</span>
                <h2 className="mt-3 font-display text-2xl font-black text-[#2D4125]">
                  หมดจำนวนครั้งสลับแล้วน้า!
                </h2>
                <p className="mt-1 text-xs text-stone-600">
                  คุณทำได้ <b>{score} คะแนน</b> อีกนิดเดียวจะถึงเป้า {TARGET_SCORE} แล้ว สู้ๆ นะคะ!
                </p>

                <div className="mt-6 flex flex-col gap-2">
                  <button
                    onClick={initGrid}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FF718D] py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#D81159]"
                  >
                    <RotateCcw size={16} />
                    <span>ลองใหม่อีกรอบ! (แจก 30%)</span>
                  </button>

                  <Link
                    href="/"
                    className="text-xs font-bold text-stone-500 hover:text-stone-800 py-2"
                  >
                    กลับสู่หน้าหลัก
                  </Link>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
