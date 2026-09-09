"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

const FLAP_CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$()-+&=;:'\"%,./?°";

const BOARD_ROWS = 6;
const BOARD_COLS = 22;

const BASE_COL_DELAY = 30;
const BASE_ROW_DELAY = 20;
const BASE_STEP_MS = 55;
const BASE_FLIP_S = 0.35;
const BASE_TOTAL_S =
  ((BOARD_COLS - 1) * BASE_COL_DELAY +
    (BOARD_ROWS - 1) * BASE_ROW_DELAY +
    8 * BASE_STEP_MS) /
  1000;

type AccentColor = { top: string; bottom: string; text: string };

const ACCENT_COLORS: AccentColor[] = [
  { top: "bg-red-600", bottom: "bg-red-700", text: "text-white" },
  { top: "bg-orange-500", bottom: "bg-orange-600", text: "text-white" },
  { top: "bg-yellow-400", bottom: "bg-yellow-500", text: "text-neutral-900" },
  { top: "bg-green-600", bottom: "bg-green-700", text: "text-white" },
  { top: "bg-blue-600", bottom: "bg-blue-700", text: "text-white" },
  { top: "bg-violet-600", bottom: "bg-violet-700", text: "text-white" },
  { top: "bg-white", bottom: "bg-neutral-100", text: "text-neutral-900" },
];

const CELL_TEXT_STYLE: React.CSSProperties = {
  fontSize: "clamp(6px, 2vw, 22px)",
  lineHeight: 1,
};

const DEFAULT_TOP_BG = "bg-neutral-200/80 dark:bg-neutral-900";
const DEFAULT_BOTTOM_BG = "bg-neutral-200/80 dark:bg-neutral-900";
const DEFAULT_TEXT = "text-neutral-800 dark:text-white";
const DEFAULT_FLAP_TOP_BG = "bg-neutral-100 dark:bg-neutral-800";

// Stable structural classes for each layer. Background color and text color
// classes are appended on top of these at write-time — the structural part
// must NEVER be dropped, or the layer loses its position/size.
const BG_INSET0 = "absolute inset-0";
const TEXT_TOP_CX =
  "absolute inset-x-0 flex select-none items-center justify-center font-mono font-bold tracking-wide top-0 h-[200%]";
const TEXT_BOTTOM_CX =
  "absolute inset-x-0 flex select-none items-center justify-center font-mono font-bold tracking-wide bottom-0 h-[200%]";

const flipTopKeyframes: Keyframe[] = [
  { transform: "rotateX(0deg)" },
  { transform: "rotateX(-100deg)" },
];
const flipBottomKeyframes: Keyframe[] = [
  { transform: "rotateX(90deg)" },
  { transform: "rotateX(0deg)" },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// ── Individual Split-Flap Character ───────────────────────────────────
// Renders ONCE. Scrambling mutates refs directly (textContent + className)
// via the Web Animations API — no React state, no re-renders, no remounts.

const FlapCell = React.memo(
  function FlapCell({
    target,
    delay,
    stepMs,
    flipDuration,
  }: {
    target: string;
    delay: number;
    stepMs: number;
    flipDuration: number;
  }) {
    // Text nodes
    const topStaticTextRef = useRef<HTMLDivElement>(null);
    const bottomStaticTextRef = useRef<HTMLDivElement>(null);
    const topFlapTextRef = useRef<HTMLDivElement>(null);
    const bottomFlapTextRef = useRef<HTMLDivElement>(null);

    // Background nodes (absolute inset-0 children — safe to className-swap)
    const topBgRef = useRef<HTMLDivElement>(null);
    const bottomBgRef = useRef<HTMLDivElement>(null);
    const topFlapBgRef = useRef<HTMLDivElement>(null);
    const bottomFlapBgRef = useRef<HTMLDivElement>(null);

    // Animated wrapper nodes (structural classes never change)
    const topFlapRef = useRef<HTMLDivElement>(null);
    const bottomFlapRef = useRef<HTMLDivElement>(null);

    const displayed = useRef(" ");

    useEffect(() => {
      const normalized = FLAP_CHARS.includes(target.toUpperCase())
        ? target.toUpperCase()
        : " ";

      if (normalized === displayed.current) return;
      if (normalized === " " && displayed.current === " ") return;

      let cancelled = false;
      let startTimer: ReturnType<typeof setTimeout> | null = null;
      let stepTimer: ReturnType<typeof setTimeout> | null = null;

      const writeChar = (el: HTMLDivElement | null, ch: string) => {
        if (el) el.textContent = ch === " " ? "\u00A0" : ch;
      };

      // Background layers: keep the structural "absolute inset-0" base,
      // only append the accent/default bg class on top of it.
      const writeBg = (el: HTMLDivElement | null, bgClass: string) => {
        if (el) el.className = cn(BG_INSET0, bgClass);
      };

      // Text layers: keep the structural position/typography classes,
      // only swap the color class.
      const writeTopText = (el: HTMLDivElement | null, colorClass: string) => {
        if (el) el.className = cn(TEXT_TOP_CX, colorClass);
      };
      const writeBottomText = (
        el: HTMLDivElement | null,
        colorClass: string,
      ) => {
        if (el) el.className = cn(TEXT_BOTTOM_CX, colorClass);
      };

      const reduced = prefersReducedMotion();
      const scrambleCount = reduced
        ? 0
        : normalized === " "
          ? 5 + Math.floor(Math.random() * 5)
          : 10 + Math.floor(Math.random() * 8);

      const runStep = (i: number) => {
        if (cancelled) return;
        // i starts at 1 and only increases, so when scrambleCount is 0
        // (reduced-motion) i===scrambleCount would never be true and this
        // would loop forever without ever landing on the target character.
        const isLast = i >= scrambleCount;
        const ch = isLast
          ? normalized
          : FLAP_CHARS[
              1 + Math.floor(Math.random() * (FLAP_CHARS.length - 1))
            ];

        const prevCh = displayed.current;
        const accent =
          !isLast && Math.random() < 0.1
            ? ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)]
            : null;

        const topBg = accent?.top ?? DEFAULT_TOP_BG;
        const bottomBg = accent?.bottom ?? DEFAULT_BOTTOM_BG;
        const textColor = accent?.text ?? DEFAULT_TEXT;

        // New character, shown on the static layers immediately
        writeChar(topStaticTextRef.current, ch);
        writeChar(bottomStaticTextRef.current, ch);
        writeTopText(topStaticTextRef.current, textColor);
        writeBottomText(bottomStaticTextRef.current, textColor);
        writeBg(topBgRef.current, topBg);
        writeBg(bottomBgRef.current, bottomBg);

        // Flap layers: top flap shows the OLD char falling away,
        // bottom flap shows the NEW char rising in.
        writeChar(topFlapTextRef.current, prevCh);
        writeChar(bottomFlapTextRef.current, ch);
        writeTopText(topFlapTextRef.current, textColor);
        writeBottomText(bottomFlapTextRef.current, textColor);
        writeBg(topFlapBgRef.current, DEFAULT_FLAP_TOP_BG);
        writeBg(bottomFlapBgRef.current, bottomBg);

        displayed.current = ch;

        if (!reduced) {
          topFlapRef.current?.animate(flipTopKeyframes, {
            duration: flipDuration * 1000,
            easing: "cubic-bezier(.55,.055,.675,.19)",
            fill: "forwards",
          });
          bottomFlapRef.current?.animate(flipBottomKeyframes, {
            duration: flipDuration * 850,
            delay: flipDuration * 500,
            easing: "cubic-bezier(.33,1.55,.64,1)",
            fill: "forwards",
          });
        }

        if (!isLast) {
          stepTimer = setTimeout(() => runStep(i + 1), stepMs);
        }
      };

      startTimer = setTimeout(
        () => runStep(scrambleCount === 0 ? 0 : 1),
        delay,
      );

      return () => {
        cancelled = true;
        if (startTimer) clearTimeout(startTimer);
        if (stepTimer) clearTimeout(stepTimer);
      };
    }, [target, delay, stepMs, flipDuration]);

    return (
      <div className="flex aspect-3/6 flex-col overflow-hidden rounded-[2px] border border-neutral-300 [contain:layout_style_paint] md:rounded-[3px] md:border-2 dark:border-black">
        <div className="relative flex-1 [perspective:600px]">
          <div className="absolute inset-0 z-40 hidden flex-row items-center justify-center md:flex">
            <div className="h-1/2 w-px rounded-tr-sm rounded-br-sm bg-neutral-300 dark:bg-black" />
            <div className="flex h-px flex-1 bg-neutral-300 dark:bg-black" />
            <div className="h-1/2 w-px rounded-tl-sm rounded-bl-sm bg-neutral-300 dark:bg-black" />
          </div>

          {/* Static top — position/size classes fixed on the wrapper, bg swapped on the child */}
          <div className="absolute inset-x-0 top-0 h-[calc(50%-0.5px)] overflow-hidden rounded-t-[3px]">
            <div ref={topBgRef} className={cn(BG_INSET0, DEFAULT_TOP_BG)} />
            <div
              ref={topStaticTextRef}
              className={cn(TEXT_TOP_CX, DEFAULT_TEXT)}
              style={CELL_TEXT_STYLE}
            >
              {"\u00A0"}
            </div>
          </div>

          {/* Static bottom */}
          <div className="absolute inset-x-0 bottom-0 h-[calc(50%-0.5px)] overflow-hidden rounded-b-[3px]">
            <div ref={bottomBgRef} className={cn(BG_INSET0, DEFAULT_BOTTOM_BG)} />
            <div
              ref={bottomStaticTextRef}
              className={cn(TEXT_BOTTOM_CX, DEFAULT_TEXT)}
              style={CELL_TEXT_STYLE}
            >
              {"\u00A0"}
            </div>
          </div>

          {/* Flipping top flap */}
          <div
            ref={topFlapRef}
            className="absolute inset-x-0 top-0 z-10 h-[calc(50%-0.5px)] origin-bottom overflow-hidden rounded-t-[3px] [backface-visibility:hidden] [will-change:transform]"
          >
            <div ref={topFlapBgRef} className={cn(BG_INSET0, DEFAULT_FLAP_TOP_BG)} />
            <div
              ref={topFlapTextRef}
              className={cn(TEXT_TOP_CX, DEFAULT_TEXT)}
              style={CELL_TEXT_STYLE}
            >
              {"\u00A0"}
            </div>
          </div>

          {/* Flipping bottom flap */}
          <div
            ref={bottomFlapRef}
            className="absolute inset-x-0 bottom-0 z-10 h-[calc(50%-0.5px)] origin-top overflow-hidden rounded-b-[3px] [backface-visibility:hidden] [will-change:transform]"
          >
            <div ref={bottomFlapBgRef} className={cn(BG_INSET0, DEFAULT_BOTTOM_BG)} />
            <div
              ref={bottomFlapTextRef}
              className={cn(TEXT_BOTTOM_CX, DEFAULT_TEXT)}
              style={CELL_TEXT_STYLE}
            >
              {"\u00A0"}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 h-px -translate-y-[0.5px] bg-neutral-400/50 dark:bg-black/50" />
        </div>

        <div className="h-2 w-full bg-[repeating-linear-gradient(to_bottom,currentColor_0,currentColor_1px,transparent_1px,transparent_0.15rem)] mask-t-from-50% text-neutral-400 opacity-20 md:h-4 md:bg-[repeating-linear-gradient(to_bottom,currentColor_0,currentColor_1px,transparent_1px,transparent_0.2rem)] dark:text-black dark:opacity-100" />
      </div>
    );
  },
  (prevProps, nextProps) =>
    prevProps.target === nextProps.target &&
    prevProps.delay === nextProps.delay &&
    prevProps.stepMs === nextProps.stepMs &&
    prevProps.flipDuration === nextProps.flipDuration,
);

// ── Color Tile ────────────────────────────────────────────────────────

const COLOR_MAP: Record<string, string> = {
  "{R}": "#D32F2F",
  "{O}": "#F57C00",
  "{Y}": "#FBC02D",
  "{G}": "#43A047",
  "{B}": "#1E88E5",
  "{V}": "#8E24AA",
  "{W}": "#FAFAFA",
};

const ColorCell = React.memo(function ColorCell({ color }: { color: string }) {
  return (
    <div
      className="aspect-3/5 rounded-[3px] border-2 border-neutral-300 dark:border-black"
      style={{ backgroundColor: color }}
    />
  );
});

// ── Row Parser ────────────────────────────────────────────────────────

type ParsedCell = { type: "char"; value: string } | { type: "color"; hex: string };

function parseRow(row: string): ParsedCell[] {
  const cells: ParsedCell[] = [];
  let i = 0;
  while (i < row.length) {
    if (row[i] === "{" && i + 2 < row.length && row[i + 2] === "}") {
      const code = row.substring(i, i + 3);
      if (COLOR_MAP[code]) {
        cells.push({ type: "color", hex: COLOR_MAP[code] });
        i += 3;
        continue;
      }
    }
    cells.push({ type: "char", value: row[i] });
    i++;
  }
  return cells;
}

// ── Word Wrap ─────────────────────────────────────────────────────────

function wrapParagraph(paragraph: string, maxCols: number): string[] {
  const lines: string[] = [];
  const words = paragraph.split(/[ \t]+/).filter(Boolean);
  let currentLine = "";

  for (const word of words) {
    if (word.length > maxCols) {
      if (currentLine) {
        lines.push(currentLine);
        currentLine = "";
      }
      lines.push(word.slice(0, maxCols));
      continue;
    }
    if (!currentLine) {
      currentLine = word;
    } else if (currentLine.length + 1 + word.length <= maxCols) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

function wrapText(input: string, maxCols: number): string[] {
  return input
    .split("\n")
    .flatMap((paragraph) =>
      paragraph.trim() === "" ? [""] : wrapParagraph(paragraph, maxCols),
    );
}

// ── Main TextFlippingBoard Component ──────────────────────────────────

export interface TextFlippingBoardProps {
  rows?: string[];
  text?: string;
  className?: string;
  duration?: number;
}

export function TextFlippingBoard({
  rows,
  text,
  className,
  duration = BASE_TOTAL_S,
}: TextFlippingBoardProps) {
  const scale = duration / BASE_TOTAL_S;
  const colDelay = BASE_COL_DELAY * scale;
  const rowDelay = BASE_ROW_DELAY * scale;
  const stepMs = BASE_STEP_MS * scale;
  const flipDur = Math.min(0.6, Math.max(0.15, BASE_FLIP_S * scale));

  const board = useMemo(() => {
    const grid: ParsedCell[][] = Array.from({ length: BOARD_ROWS }, () =>
      Array.from({ length: BOARD_COLS }, () => ({
        type: "char" as const,
        value: " ",
      })),
    );

    if (text) {
      const lines = wrapText(text, BOARD_COLS).slice(0, BOARD_ROWS);
      const startRow = Math.max(0, Math.floor((BOARD_ROWS - lines.length) / 2));
      lines.forEach((line, i) => {
        const row = startRow + i;
        if (row >= BOARD_ROWS) return;
        const parsed = parseRow(line);
        const startCol = Math.max(0, Math.floor((BOARD_COLS - parsed.length) / 2));
        parsed.forEach((cell, c) => {
          if (startCol + c < BOARD_COLS) grid[row][startCol + c] = cell;
        });
      });
    } else if (rows) {
      rows.forEach((row, r) => {
        if (r >= BOARD_ROWS) return;
        const parsed = parseRow(row);
        parsed.forEach((cell, c) => {
          if (c < BOARD_COLS) grid[r][c] = cell;
        });
      });
    }

    return grid;
  }, [rows, text]);

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-3xl rounded-xl bg-neutral-100 p-2 shadow-xl md:rounded-2xl md:p-4 dark:bg-neutral-900 dark:shadow-[0_20px_70px_-15px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      <div
        className="grid gap-px md:gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${BOARD_COLS}, 1fr)` }}
      >
        {board.map((row, r) =>
          row.map((cell, c) =>
            cell.type === "color" ? (
              <ColorCell key={`${r}-${c}`} color={cell.hex} />
            ) : (
              <FlapCell
                key={`${r}-${c}`}
                target={cell.value}
                delay={c * colDelay + r * rowDelay}
                stepMs={stepMs}
                flipDuration={flipDur}
              />
            ),
          ),
        )}
      </div>
    </div>
  );
}