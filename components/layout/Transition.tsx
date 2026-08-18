"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import { useTheme } from "@/context/use-theme";
import "./../../styles/components/transition.scss";
import {
  DRAW_IN_DURATION,
  DRAW_OUT_DURATION,
  MAX_STAGGER_DELAY,
  PAUSE_DURATION,
} from "@/lib/transition-constants";

gsap.registerPlugin(useGSAP);

const COUNT = 20;
const STROKE = 40;
const GAP = STROKE - 1; // 2px gap between strokes
const OUTER_RADIUS = GAP * COUNT;
const SIZE = OUTER_RADIUS * 2 + STROKE + 40;
const CENTER = SIZE / 2;

export default function Transition() {
  const { isNavigating } = useTheme();
  const containerRef = useRef<SVGGElement>(null);

  useGSAP(
    () => {
      if (!isNavigating) return;

      const ellipses = gsap.utils.toArray<SVGEllipseElement>(
        containerRef.current?.querySelectorAll("ellipse") || [],
      );

      ellipses.forEach((ellipse) => {
        const length = ellipse.getTotalLength();
        const delay = gsap.utils.random(0, MAX_STAGGER_DELAY);

        gsap.set(ellipse, {
          stroke: gsap.utils.random(["var(--c-dark-light)", "var(--c-dark-light)"]),
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap
          .timeline({ delay }) // no repeat — plays exactly once
          .to(ellipse, {
            strokeDashoffset: 0,
            duration: DRAW_IN_DURATION,
            ease: "power2.inOut",
          })
          .to(
            ellipse,
            {
              strokeDashoffset: -length,
              duration: DRAW_OUT_DURATION,
              ease: "power2.inOut",
            },
            `+=${PAUSE_DURATION}`,
          );
      });
    },
    { dependencies: [isNavigating], scope: containerRef },
  );

  return (
    <div className={`jb_transition ${isNavigating ? "active" : ""}`}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width={5000} height={5000}>
        <g ref={containerRef}>
          {Array.from({ length: COUNT }).map((_, i) => (
            <ellipse
              key={i}
              cx={CENTER}
              cy={CENTER}
              rx={OUTER_RADIUS - i * GAP}
              ry={OUTER_RADIUS - i * GAP}
              fill="none"
              strokeWidth={STROKE}
              transform={`rotate(-90 ${CENTER} ${CENTER})`}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
