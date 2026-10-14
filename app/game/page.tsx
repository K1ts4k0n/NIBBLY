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
  Lightbulb,
  Shuffle,
  Bomb,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
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

const BASE_SNACK_KEYS: SnackType[] = [
  "strawberry",
  "blueberry",
  "banana",
  "avocado",
  "choco",
  "gummy",
];

const GRID_SIZE = 7;
const TARGET_SCORE = 1000;
const INITIAL_MOVES = 22;
const PROMO_CODE_30 = "NIBBLYCRUSH30";

// Sound synthesizer using Web Audio API with safe browser fallback
class SoundFX {
  private ctx: AudioContext | null = null;
  public enabled = true;

  private init() {
    try {
      if (!this.ctx && typeof window !== "undefined") {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
    } catch {
      // AudioContext may be restricted by browser policy
    }
  }

  playPop(pitch = 520) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(pitch * 1.4, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {}
  }

  playSwap() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(540, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {}
  }

  playBoing() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(260, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.16);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch {}
  }

  playBlast() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch {}
  }

  playFanfare() {
    if (!this.enabled) return;
    try {
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
    } catch {}
  }
}

const sfx = new SoundFX();

export default function SnackCrushGame() {
  const [grid, setGrid] = useState<Tile[][]>([]);
  const [selectedPos, setSelectedPos] = useState<{ r: number; c: number } | null>(null);
  const [hintPair, setHintPair] = useState<[{ r: number; c: number }, { r: number; c: number }] | null>(null);
  const [invalidPair, setInvalidPair] = useState<[{ r: number; c: number }, { r: number; c: number }] | null>(null);
  const [isResolving, setIsResolving] = useState(false);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(INITIAL_MOVES);
  const [soundOn, setSoundOn] = useState(true);
  const [gameState, setGameState] = useState<"playing" | "won" | "lost">("playing");
  const [copied, setCopied] = useState(false);
  const [bombMode, setBombMode] = useState(false);
  const [bombsLeft, setBombsLeft] = useState(2);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [floatingPoints, setFloatingPoints] = useState<{ id: number; text: string; x: number; y: number }[]>([]);

  const pointCounterRef = useRef(0);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const dragStartRef = useRef<{ r: number; c: number; x: number; y: number } | null>(null);

  // Helper to spawn a snack candy tile
  const makeTile = useCallback((type?: SnackType): Tile => {
    const chosenType = type || BASE_SNACK_KEYS[Math.floor(Math.random() * BASE_SNACK_KEYS.length)];
    return {
      id: "t_" + Math.random().toString(36).substring(2, 9),
      ...SNACK_ITEMS[chosenType],
    };
  }, []);

  // Check matching 3+ lines in rows and columns
  const findMatches = useCallback((currentGrid: Tile[][]): { r: number; c: number }[] => {
    if (!currentGrid || currentGrid.length === 0) return [];
    const matchedCoords: Set<string> = new Set();

    // Check rows
    for (let r = 0; r < GRID_SIZE; r++) {
      let count = 1;
      for (let c = 1; c < GRID_SIZE; c++) {
        const curr = currentGrid[r]?.[c];
        const prev = currentGrid[r]?.[c - 1];
        if (curr && prev && curr.type === prev.type) {
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
        const curr = currentGrid[r]?.[c];
        const prev = currentGrid[r - 1]?.[c];
        if (curr && prev && curr.type === prev.type) {
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
  }, []);

  // Find all possible valid moves on the board
  const findPossibleMoves = useCallback(
    (board: Tile[][]): [{ r: number; c: number }, { r: number; c: number }][] => {
      if (!board || board.length === 0) return [];
      const movesList: [{ r: number; c: number }, { r: number; c: number }][] = [];

      const directions = [
        { dr: 0, dc: 1 },
        { dr: 1, dc: 0 },
      ];

      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          for (const { dr, dc } of directions) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr < GRID_SIZE && nc < GRID_SIZE) {
              // Test hypothetical swap
              const temp = board.map((row) => [...row]);
              const t = temp[r][c];
              temp[r][c] = temp[nr][nc];
              temp[nr][nc] = t;

              if (findMatches(temp).length > 0) {
                movesList.push([
                  { r, c },
                  { r: nr, c: nc },
                ]);
              }
            }
          }
        }
      }
      return movesList;
    },
    [findMatches]
  );

  // Build grid guaranteed to have at least 3 valid moves
  const initGrid = useCallback(() => {
    let attempts = 0;
    let newGrid: Tile[][] = [];

    while (attempts < 50) {
      attempts++;
      newGrid = [];
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

      const validMoves = findPossibleMoves(newGrid);
      if (validMoves.length >= 3) break;
    }

    setGrid(newGrid);
    setScore(0);
    setMoves(INITIAL_MOVES);
    setGameState("playing");
    setSelectedPos(null);
    setHintPair(null);
    setInvalidPair(null);
    setIsResolving(false);
    setBombMode(false);
    setBombsLeft(2);
    setStatusMessage(null);
  }, [makeTile, findPossibleMoves]);

  useEffect(() => {
    initGrid();
  }, [initGrid]);

  // Auto-hint timer after 4.5 seconds idle
  useEffect(() => {
    if (gameState !== "playing" || isResolving || !grid.length) return;

    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    idleTimerRef.current = setTimeout(() => {
      const valid = findPossibleMoves(grid);
      if (valid.length > 0 && !hintPair) {
        const randomPair = valid[Math.floor(Math.random() * valid.length)];
        setHintPair(randomPair);
      }
    }, 4500);

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [grid, gameState, isResolving, findPossibleMoves, hintPair]);

  const toggleSound = () => {
    sfx.enabled = !soundOn;
    setSoundOn(!soundOn);
  };

  // Shuffle board without moves penalty
  const shuffleBoard = (baseGrid = grid) => {
    sfx.playSwap();
    let current = baseGrid.map((row) => [...row]);
    const allTiles: Tile[] = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (current[r][c]) allTiles.push(current[r][c]);
      }
    }

    for (let i = allTiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allTiles[i], allTiles[j]] = [allTiles[j], allTiles[i]];
    }

    let idx = 0;
    const shuffled: Tile[][] = [];
    for (let r = 0; r < GRID_SIZE; r++) {
      shuffled[r] = [];
      for (let c = 0; c < GRID_SIZE; c++) {
        shuffled[r][c] = allTiles[idx++];
      }
    }
    setGrid(shuffled);
    setSelectedPos(null);
    setHintPair(null);
  };

  // Resolve cascades & gravity
  const resolveBoard = useCallback(
    (initialGrid: Tile[][], currentMoves: number, initialScore: number) => {
      setIsResolving(true);
      setSelectedPos(null);
      setHintPair(null);
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
          setIsResolving(false);

          if (finalScore >= TARGET_SCORE) {
            setGameState("won");
            sfx.playFanfare();
          } else if (currentMoves <= 0) {
            setGameState("lost");
          } else {
            const remainingMoves = findPossibleMoves(current);
            if (remainingMoves.length === 0) {
              setStatusMessage("🔀 ไม่เหลือคู่ที่สลับได้! กำลังสับเปลี่ยนกระดานใหม่...");
              setTimeout(() => {
                shuffleBoard(current);
                setStatusMessage(null);
              }, 1200);
            }
          }
          return;
        }

        currentCombo++;
        sfx.playPop(480 + currentCombo * 50);

        // Add points
        const pts = matches.length * 40 * currentCombo;
        totalAddedScore += pts;

        // Floating score tag
        const centerMatch = matches[Math.floor(matches.length / 2)];
        const ptId = pointCounterRef.current++;
        setFloatingPoints((prev) => [
          ...prev,
          {
            id: ptId,
            text: `+${pts} ${currentCombo > 1 ? `Combo x${currentCombo}! 🔥` : ""}`,
            x: centerMatch.c * 44 + 8,
            y: centerMatch.r * 44,
          },
        ]);
        setTimeout(() => {
          setFloatingPoints((prev) => prev.filter((p) => p.id !== ptId));
        }, 1100);

        // Clear matched tiles
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
    },
    [findMatches, makeTile, findPossibleMoves]
  );

  // Bomb 3x3 explosion booster
  const handleBombTile = (r: number, c: number) => {
    if (bombsLeft <= 0 || isResolving) return;
    sfx.playBlast();
    setBombMode(false);
    setBombsLeft((prev) => prev - 1);
    setStatusMessage("💥 บึ้ม! ระเบิดขนมสำเร็จ");
    setTimeout(() => setStatusMessage(null), 1500);

    const nextGrid = grid.map((row) => [...row]);
    const matched: { r: number; c: number }[] = [];

    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
          matched.push({ r: nr, c: nc });
          nextGrid[nr][nc] = null as any;
        }
      }
    }

    const blastPts = matched.length * 50;
    setFloatingPoints((prev) => [
      ...prev,
      {
        id: pointCounterRef.current++,
        text: `💥 +${blastPts} BOMB!`,
        x: c * 44 + 8,
        y: r * 44,
      },
    ]);

    // Apply gravity
    for (let col = 0; col < GRID_SIZE; col++) {
      let emptyRow = GRID_SIZE - 1;
      for (let row = GRID_SIZE - 1; row >= 0; row--) {
        if (nextGrid[row][col] !== null) {
          if (emptyRow !== row) {
            nextGrid[emptyRow][col] = nextGrid[row][col];
            nextGrid[row][col] = null as any;
          }
          emptyRow--;
        }
      }
      for (let row = emptyRow; row >= 0; row--) {
        nextGrid[row][col] = makeTile();
      }
    }

    resolveBoard(nextGrid, moves, score + blastPts);
  };

  // Swap execution
  const executeSwap = (r1: number, c1: number, r2: number, c2: number) => {
    if (gameState !== "playing" || moves <= 0 || isResolving) return;

    if (r2 < 0 || r2 >= GRID_SIZE || c2 < 0 || c2 >= GRID_SIZE) return;

    // Test swap
    const nextGrid = grid.map((row) => [...row]);
    const tileA = nextGrid[r1][c1];
    const tileB = nextGrid[r2][c2];

    nextGrid[r1][c1] = tileB;
    nextGrid[r2][c2] = tileA;

    const matches = findMatches(nextGrid);

    if (matches.length > 0) {
      // Valid swap!
      setSelectedPos(null);
      setHintPair(null);
      setInvalidPair(null);
      setStatusMessage(null);
      sfx.playSwap();
      const newMoves = moves - 1;
      resolveBoard(nextGrid, newMoves, score);
    } else {
      // Invalid swap: visually swap, shake & revert
      sfx.playBoing();
      setSelectedPos(null);
      setHintPair(null);
      setInvalidPair([
        { r: r1, c: c1 },
        { r: r2, c: c2 },
      ]);
      setStatusMessage("❌ สลับแล้วยังไม่เรียง 3 ชิ้นน้า (ลองจับคู่อื่น หรือกดปุ่ม 💡 ใบ้คู่)");

      setGrid(nextGrid);

      setTimeout(() => {
        const revertedGrid = nextGrid.map((row) => [...row]);
        revertedGrid[r1][c1] = tileA;
        revertedGrid[r2][c2] = tileB;
        setGrid(revertedGrid);
        setInvalidPair(null);
      }, 260);

      setTimeout(() => {
        setStatusMessage(null);
      }, 3000);
    }
  };

  // Direct tile click/tap handler
  const handleTileClick = (r: number, c: number) => {
    if (gameState !== "playing" || moves <= 0 || isResolving) return;

    if (bombMode) {
      handleBombTile(r, c);
      return;
    }

    if (!selectedPos) {
      // Select first tile
      setSelectedPos({ r, c });
      setHintPair(null);
      sfx.playSwap();
      return;
    }

    // Deselect if clicking the same tile
    if (selectedPos.r === r && selectedPos.c === c) {
      setSelectedPos(null);
      return;
    }

    const dr = Math.abs(selectedPos.r - r);
    const dc = Math.abs(selectedPos.c - c);
    const isAdjacent = (dr === 1 && dc === 0) || (dr === 0 && dc === 1);

    if (!isAdjacent) {
      // Switch selection to new tile
      setSelectedPos({ r, c });
      sfx.playSwap();
      return;
    }

    // Adjacent -> Perform swap!
    executeSwap(selectedPos.r, selectedPos.c, r, c);
  };

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (r: number, c: number, e: React.TouchEvent) => {
    const t = e.touches[0];
    dragStartRef.current = { r, c, x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!dragStartRef.current) return;
    const start = dragStartRef.current;
    dragStartRef.current = null;

    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 25) {
      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe
        executeSwap(start.r, start.c, start.r, start.c + (dx > 0 ? 1 : -1));
      } else {
        // Vertical swipe
        executeSwap(start.r, start.c, start.r + (dy > 0 ? 1 : -1), start.c);
      }
    }
  };

  // Manual Hint Button handler
  const handleShowHint = () => {
    const valid = findPossibleMoves(grid);
    if (valid.length > 0) {
      const chosen = valid[0];
      setHintPair(chosen);
      sfx.playPop(700);
      setStatusMessage("💡 ลองสลับขนม 2 ชิ้นที่มีประกายสีทองดูเลยจ้า!");
      setTimeout(() => setStatusMessage(null), 3500);
    } else {
      shuffleBoard();
      setStatusMessage("🔀 ไม่มีคู่ที่สลับได้ จึงสับเปลี่ยนกระดานใหม่ให้แล้วค่ะ!");
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(PROMO_CODE_30);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const progressPercent = Math.min(100, Math.round((score / TARGET_SCORE) * 100));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#B8E6FF] via-[#E2F5FF] to-[#FFF9ED] text-[#2C4026] relative overflow-x-hidden">
      {/* Background Sweet Clouds */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-5 size-72 rounded-full bg-white/60 blur-3xl" />
        <div className="absolute top-40 right-5 size-80 rounded-full bg-[#FF718D]/20 blur-3xl" />
        <div className="absolute bottom-20 left-1/3 size-96 rounded-full bg-[#FFD95A]/25 blur-3xl" />
      </div>

      {/* Main Container */}
      <div className="relative mx-auto max-w-4xl px-3 py-5 sm:px-6">
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
        <div className="mt-3 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FF718D] px-4 py-1 text-xs font-black text-white shadow-md">
            <Sparkles size={14} className="text-[#FFD95A] animate-spin-slow" />
            <span>NIBBLY SNACK CRUSH • เล่นชนะรับส่วนลด 30%!</span>
          </div>

          <h1 className="mt-2 font-display text-2xl sm:text-4xl font-black text-[#263D20] tracking-tight">
            แคนดี้สแน็ก <span className="bg-gradient-to-r from-[#FF718D] via-[#FF9F43] to-[#8BC34A] bg-clip-text text-transparent">ปาร์ตี้ผลไม้</span> 🍓🧸
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-600 font-medium">
            ใช้นิ้ว<b>ปัด (Swipe)</b> หรือ<b>แตะ 2 ชิ้น</b> เพื่อสลับขนมให้เรียงติดกัน 3 ชิ้นขึ้นไป ทำถึง <b>{TARGET_SCORE} คะแนน</b> รับโค้ดลด 30%!
          </p>
        </div>

        {/* Status Notification Banner */}
        <div className="mt-2.5 min-h-[36px] flex items-center justify-center">
          <AnimatePresence>
            {statusMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-1.5 text-xs font-bold text-[#D81159] shadow-lg border border-[#FFCCD8]"
              >
                <span>{statusMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Game Layout (Dashboard + Board) */}
        <div className="mt-2 grid gap-5 lg:grid-cols-[250px_1fr] items-start">
          {/* Left: Candy Soda Style Dashboard Panel */}
          <div className="space-y-3.5">
            {/* Moves & Gummy Bear Box */}
            <div className="relative overflow-hidden rounded-3xl border-4 border-[#78C9FF] bg-gradient-to-b from-[#2596FF] via-[#0077E6] to-[#005AB3] p-4 sm:p-5 text-white shadow-xl shadow-[#0077E6]/25">
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
              <div className="mt-3 rounded-2xl bg-white/15 p-3 backdrop-blur-xs border border-white/20 text-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl animate-bounce">🧸</span>
                  <div className="text-left">
                    <p className="text-[11px] font-black text-[#FFE082]">เป้าหมายชนะ:</p>
                    <p className="text-xs font-extrabold">{TARGET_SCORE} คะแนน</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Score & Star Progress */}
            <div className="rounded-3xl border-2 border-[#E8DCB8] bg-white/95 p-4 sm:p-5 shadow-lg shadow-black/5">
              <div className="flex items-center justify-between text-xs font-bold text-stone-600">
                <span>คะแนนปัจจุบัน</span>
                <span className="font-mono text-base font-black text-[#2D4125]">{score}</span>
              </div>

              {/* Star Progress Bar */}
              <div className="mt-2.5 relative h-4 w-full overflow-hidden rounded-full bg-stone-100 border border-stone-200">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#FFD95A] via-[#FF9F43] to-[#FF718D]"
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* 3 Stars Milestone */}
              <div className="mt-2.5 flex items-center justify-between px-1">
                <div className={`flex items-center gap-0.5 ${score >= TARGET_SCORE * 0.33 ? "text-[#FFB703]" : "text-stone-300"}`}>
                  <Star size={15} fill="currentColor" />
                  <span className="text-[10px] font-bold">1★</span>
                </div>
                <div className={`flex items-center gap-0.5 ${score >= TARGET_SCORE * 0.66 ? "text-[#FFB703]" : "text-stone-300"}`}>
                  <Star size={17} fill="currentColor" />
                  <span className="text-[10px] font-bold">2★</span>
                </div>
                <div className={`flex items-center gap-0.5 ${score >= TARGET_SCORE ? "text-[#FFB703]" : "text-stone-300"}`}>
                  <Star size={20} fill="currentColor" className="animate-spin-slow" />
                  <span className="text-[11px] font-black">3★ รับลด 30%!</span>
                </div>
              </div>
            </div>

            {/* Boosters & Power-ups */}
            <div className="rounded-3xl border-2 border-[#E8DCB8] bg-white/95 p-3.5 shadow-md">
              <span className="text-xs font-black text-stone-700 block mb-2">⚡️ ตัวช่วยพิเศษ:</span>
              <div className="grid grid-cols-3 gap-2 text-center">
                {/* Hint Button */}
                <button
                  id="hint-btn"
                  onClick={handleShowHint}
                  disabled={isResolving}
                  className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-[#FFF9E6] border border-[#FFE082] p-2 hover:bg-[#FFF2B2] transition active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Lightbulb size={20} className="text-[#F59E0B]" />
                  <span className="text-[10px] font-black text-stone-700">ใบ้คู่</span>
                </button>

                {/* Shuffle Button */}
                <button
                  id="shuffle-btn"
                  onClick={() => shuffleBoard()}
                  disabled={isResolving}
                  className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-[#EBF5FF] border border-[#BCE1FF] p-2 hover:bg-[#D4EAFF] transition active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Shuffle size={20} className="text-[#0284C7]" />
                  <span className="text-[10px] font-black text-stone-700">สับใหม่</span>
                </button>

                {/* Bomb Booster */}
                <button
                  id="bomb-btn"
                  onClick={() => setBombMode(!bombMode)}
                  disabled={isResolving || bombsLeft <= 0}
                  className={`flex flex-col items-center justify-center gap-1 rounded-2xl border p-2 transition active:scale-95 disabled:opacity-40 cursor-pointer ${
                    bombMode
                      ? "bg-[#FF4D6D] text-white border-[#C9184A] animate-pulse"
                      : "bg-[#FFF0F4] border-[#FFCCD8] text-stone-700 hover:bg-[#FFE0E9]"
                  }`}
                >
                  <Bomb size={20} className={bombMode ? "text-white" : "text-[#E63946]"} />
                  <span className="text-[10px] font-black">
                    ระเบิด ({bombsLeft})
                  </span>
                </button>
              </div>

              {bombMode && (
                <p className="mt-2 text-[11px] font-bold text-[#E63946] text-center animate-bounce">
                  👇 แตะขนมชิ้นไหนก็ได้เพื่อระเบิดรัศมี 3x3!
                </p>
              )}
            </div>
          </div>

          {/* Right: The Match-3 Grid Board */}
          <div className="relative mx-auto flex flex-col items-center w-full max-w-[430px]">
            {/* Glossy Candy Board Frame */}
            <div
              className="relative w-full rounded-3xl border-4 border-[#BCE1FF] bg-gradient-to-b from-[#62B8FF]/40 via-[#99D5FF]/30 to-[#CCE9FF]/40 p-2 sm:p-3.5 shadow-2xl backdrop-blur-md"
              style={{ touchAction: "none" }} // Prevents mobile touch drag from scrolling the screen
            >
              <div className="grid grid-cols-7 gap-1 sm:gap-1.5 select-none">
                {grid.map((row, r) =>
                  row.map((tile, c) => {
                    if (!tile) return <div key={`${r}-${c}`} className="aspect-square" />;

                    const isSelected = selectedPos?.r === r && selectedPos?.c === c;
                    const isHint =
                      hintPair &&
                      ((hintPair[0].r === r && hintPair[0].c === c) ||
                        (hintPair[1].r === r && hintPair[1].c === c));
                    const isInvalid =
                      invalidPair &&
                      ((invalidPair[0].r === r && invalidPair[0].c === c) ||
                        (invalidPair[1].r === r && invalidPair[1].c === c));

                    // Show arrow indicators around selected tile
                    const isAdjacentToSelected =
                      selectedPos &&
                      ((Math.abs(selectedPos.r - r) === 1 && selectedPos.c === c) ||
                        (Math.abs(selectedPos.c - c) === 1 && selectedPos.r === r));

                    let directionArrow: "up" | "down" | "left" | "right" | null = null;
                    if (selectedPos && isAdjacentToSelected) {
                      if (r === selectedPos.r - 1) directionArrow = "up";
                      else if (r === selectedPos.r + 1) directionArrow = "down";
                      else if (c === selectedPos.c - 1) directionArrow = "left";
                      else if (c === selectedPos.c + 1) directionArrow = "right";
                    }

                    return (
                      <div
                        key={tile.id}
                        className="relative aspect-square"
                        onTouchStart={(e) => handleTouchStart(r, c, e)}
                        onTouchEnd={handleTouchEnd}
                      >
                        <motion.button
                          id={`tile-${r}-${c}`}
                          data-row={r}
                          data-col={c}
                          data-type={tile.type}
                          layout
                          initial={{ scale: 0 }}
                          animate={{
                            scale: isSelected ? 1.15 : isHint ? [1, 1.12, 1] : 1,
                            rotate: isSelected ? [0, -5, 5, 0] : isInvalid ? [0, -10, 10, -6, 6, 0] : 0,
                          }}
                          transition={{
                            duration: isInvalid ? 0.35 : 0.2,
                            repeat: isHint ? Infinity : 0,
                            repeatDelay: 0.8,
                          }}
                          onClick={() => handleTileClick(r, c)}
                          className={`relative size-full flex items-center justify-center rounded-2xl sm:rounded-3xl shadow-md transition-all cursor-pointer ${
                            isSelected
                              ? "ring-4 ring-[#FFD95A] ring-offset-2 z-20 shadow-xl scale-105"
                              : isHint
                              ? "ring-4 ring-[#FFD95A] ring-offset-1 z-10 animate-pulse shadow-lg"
                              : isAdjacentToSelected
                              ? "ring-2 ring-white/90 ring-offset-1 z-10"
                              : "hover:scale-105 active:scale-90"
                          } bg-gradient-to-br ${tile.bgGrad} border-b-4 border-r-2`}
                          style={{ borderColor: isInvalid ? "#EF4444" : tile.borderCol }}
                        >
                          {/* Glossy highlight reflection */}
                          <div className="pointer-events-none absolute top-1 left-1.5 h-2 w-4 sm:h-2.5 sm:w-5 rounded-full bg-white/40 blur-[0.5px]" />

                          {/* Snack Emoji */}
                          <span className="text-xl sm:text-3xl drop-shadow-sm select-none pointer-events-none">
                            {tile.emoji}
                          </span>

                          {/* Directional arrow helper on adjacent neighbors */}
                          {directionArrow && (
                            <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25 rounded-2xl sm:rounded-3xl">
                              <span className="flex size-5 sm:size-6 items-center justify-center rounded-full bg-white text-[#2D4125] shadow-md animate-bounce">
                                {directionArrow === "up" && <ArrowUp size={13} className="stroke-[3]" />}
                                {directionArrow === "down" && <ArrowDown size={13} className="stroke-[3]" />}
                                {directionArrow === "left" && <ArrowLeft size={13} className="stroke-[3]" />}
                                {directionArrow === "right" && <ArrowRight size={13} className="stroke-[3]" />}
                              </span>
                            </span>
                          )}

                          {/* Sparkle badge for hinted tiles */}
                          {isHint && (
                            <span className="pointer-events-none absolute -top-1 -right-1 text-xs animate-spin-slow">
                              ✨
                            </span>
                          )}
                        </motion.button>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Floating score badges */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {floatingPoints.map((pt) => (
                  <motion.div
                    key={pt.id}
                    initial={{ opacity: 1, y: pt.y, x: pt.x, scale: 0.8 }}
                    animate={{ opacity: 0, y: pt.y - 45, scale: 1.25 }}
                    transition={{ duration: 0.85 }}
                    className="absolute font-display text-sm sm:text-base font-black text-[#FFD95A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
                  >
                    {pt.text}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* How to play easy guide */}
            <div className="mt-3.5 w-full rounded-2xl bg-white/90 p-3 text-center border border-white/80 shadow-xs backdrop-blur-xs">
              <p className="text-xs font-bold text-stone-700">
                👆 <b>วิธีเล่นง่ายๆ:</b> ใช้นิ้วปัด (Swipe) หรือ แตะขนม 2 ชิ้นที่ติดกัน เพื่อสลับให้เรียงครบ 3 ชิ้น!
              </p>
              <p className="text-[11px] font-medium text-stone-500 mt-0.5">
                ถ้าคิดไม่ออก กดปุ่ม <b>💡 ใบ้คู่</b> หรือ <b>🔀 สับใหม่</b> ด้านซ้ายได้ตลอดเลยค่ะ
              </p>
            </div>
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
                className="relative w-full max-w-md overflow-hidden rounded-[36px] border-4 border-[#FFD95A] bg-white p-6 sm:p-7 text-center shadow-2xl"
              >
                {/* Decorative floating glow */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 size-40 rounded-full bg-[#FF718D]/20 blur-2xl pointer-events-none" />

                <div className="flex justify-center -space-x-1">
                  <Star size={34} className="text-[#FFB703] fill-[#FFB703] animate-bounce" />
                  <Star size={46} className="text-[#FFD95A] fill-[#FFD95A] -mt-3 animate-pulse" />
                  <Star size={34} className="text-[#FFB703] fill-[#FFB703] animate-bounce" />
                </div>

                <span className="mt-3 inline-block rounded-full bg-[#8BC34A]/20 px-3.5 py-1 text-xs font-black text-[#2E7D32]">
                  🎉 VICTORY! ชนะเลิศ 3 ดาวเต็ม!
                </span>

                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-black text-[#2D4125]">
                  คุณคือเซียน Snack Crush! 🍓🧸
                </h2>
                <p className="mt-1 text-xs text-stone-600">
                  ทำคะแนนทะลุเป้าสำเร็จ รับรางวัลใหญ่ส่วนลด 30% ไปช้อปขนมคลีนให้จุใจเลยค่า!
                </p>

                {/* Big Coupon Card */}
                <div className="mt-5 rounded-3xl border-2 border-dashed border-[#FF718D] bg-[#FFF0F4] p-4 sm:p-5">
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
                      className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
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
                <div className="mt-5 flex flex-col gap-2.5">
                  <Link
                    href="/shop"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2D4125] py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#FF718D] hover:scale-[1.02]"
                  >
                    <ShoppingBag size={17} />
                    <span>นำโค้ดไปช้อปขนมเลย 🛒</span>
                  </Link>

                  <button
                    onClick={initGrid}
                    className="inline-flex items-center justify-center gap-1 text-xs font-bold text-stone-500 hover:text-stone-800 py-1 cursor-pointer"
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
                className="w-full max-w-sm rounded-[32px] border-2 border-stone-200 bg-white p-6 sm:p-7 text-center shadow-2xl"
              >
                <span className="text-5xl">🥺</span>
                <h2 className="mt-3 font-display text-2xl font-black text-[#2D4125]">
                  หมดจำนวนครั้งสลับแล้วน้า!
                </h2>
                <p className="mt-1 text-xs text-stone-600">
                  คุณทำได้ <b>{score} คะแนน</b> อีกนิดเดียวจะถึงเป้า {TARGET_SCORE} แล้ว สู้ๆ นะคะ!
                </p>

                <div className="mt-5 flex flex-col gap-2">
                  <button
                    onClick={initGrid}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FF718D] py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#D81159] cursor-pointer"
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
