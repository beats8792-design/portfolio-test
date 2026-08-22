"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Button from "../others/Button";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
export interface Project {
  title: string;
  description: string;
  tags: string[];
  image: string;
  live_url: string;
  git_url: string;
}
interface MagicBentoProps {
  projects: Project[];
  textAutoHide?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
  clickEffect?: boolean;
}
const DEFAULT_SPOTLIGHT_RADIUS = 400;
const DEFAULT_GLOW_COLOR = "255, 92, 23";
const updateCardGlowProperties = (
  card: HTMLElement,
  mouseX: number,
  mouseY: number,
  glow: number,
  radius: number,
) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;
  card.style.setProperty("--glow-x", `${relativeX}%`);
  card.style.setProperty("--glow-y", `${relativeY}%`);
  card.style.setProperty("--glow-intensity", glow.toString());
  card.style.setProperty("--glow-radius", `${radius}px`);
};
const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
  disabled?: boolean;
  radius?: number;
  glowColor?: string;
}> = ({
  gridRef,
  disabled = false,
  radius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (disabled || !gridRef.current) return;
    const grid = gridRef.current;
    const spotlight = document.createElement("div");
    spotlight.className = "global-spotlight";
    spotlight.style.cssText = ` position: fixed; width: 800px; height: 800px; border-radius: 50%; pointer-events: none; background: radial-gradient( circle, rgba(${glowColor}, 0.15) 0%, rgba(${glowColor}, 0.08) 15%, rgba(${glowColor}, 0.04) 25%, rgba(${glowColor}, 0.02) 40%, rgba(${glowColor}, 0.01) 65%, transparent 70% ); z-index: 200; opacity: 0; transform: translate(-50%, -50%); mix-blend-mode: screen; `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;
    const handleMouseMove = (event: MouseEvent) => {
      if (!spotlightRef.current) return;
      const rect = grid.getBoundingClientRect();
      const mouseInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      const cards = grid.querySelectorAll(".magic-bento-card");
      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
        cards.forEach((card) => {
          (card as HTMLElement).style.setProperty("--glow-intensity", "0");
        });
        return;
      }
      const proximity = radius * 0.5;
      const fadeDistance = radius * 0.75;
      let minDistance = Infinity;
      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(event.clientX - centerX, event.clientY - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);
        minDistance = Math.min(minDistance, effectiveDistance);
        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity =
            (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }
        updateCardGlowProperties(
          cardElement,
          event.clientX,
          event.clientY,
          glowIntensity,
          radius,
        );
      });
      gsap.to(spotlightRef.current, {
        left: event.clientX,
        top: event.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;
      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: 0.2,
        ease: "power2.out",
      });
    };
    const handleMouseLeave = () => {
      grid.querySelectorAll(".magic-bento-card").forEach((card) => {
        (card as HTMLElement).style.setProperty("--glow-intensity", "0");
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };
    document.addEventListener("mousemove", handleMouseMove);
    grid.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      grid.removeEventListener("mouseleave", handleMouseLeave);
      spotlightRef.current?.remove();
      spotlightRef.current = null;
    };
  }, [gridRef, disabled, radius, glowColor]);
  return null;
};
const MagicBento: React.FC<MagicBentoProps> = ({
  projects,
  textAutoHide = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const handleCardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!clickEffect || disableAnimations) return;
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const maxDistance = Math.max(
      Math.hypot(x, y),
      Math.hypot(x - rect.width, y),
      Math.hypot(x, y - rect.height),
      Math.hypot(x - rect.width, y - rect.height),
    );
    const ripple = document.createElement("div");
    ripple.style.cssText = ` position: absolute; width: ${maxDistance * 2}px; height: ${maxDistance * 2}px; left: ${x - maxDistance}px; top: ${y - maxDistance}px; border-radius: 50%; background: radial-gradient( circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70% ); pointer-events: none; z-index: 10; `;
    card.appendChild(ripple);
    gsap.fromTo(
      ripple,
      { scale: 0, opacity: 1 },
      {
        scale: 1,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
      },
    );
  };
  return (
    <>
      <style>
        {`
            .magic-bento-grid {
                --glow-x: 50%;
                --glow-y: 50%;
                --glow-intensity: 0;
                --glow-radius: ${spotlightRadius}px;
                --glow-color: ${glowColor};
            }

            .magic-bento-card::after {
                opacity: ${enableBorderGlow ? "1" : "0"};
            }
        `}
      </style>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disabled={disableAnimations}
          radius={spotlightRadius}
          glowColor={glowColor}
        />
      )}
      <div ref={gridRef} className="magic-bento-grid">
        {projects.map((project, index) => (
          <div
            key={`${project.title}-${index}`}
            className="magic-bento-card"
            onClick={handleCardClick}
          >
            <Image
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              width={800}
              height={800}
            />
            <div className="magic-bento-overlay" />
            <div className="magic-bento-content">
              <h3
                className={`magic-bento-title ${textAutoHide ? "text-clamp-1" : ""}`}
              >
                {project.title}
              </h3>
              <div className="magic-bento-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="magic-bento-tag">
                    {tag}
                  </span>
                ))}
              </div>
              <p
                className={`magic-bento-description ${textAutoHide ? "text-clamp-2" : ""}`}
              >
                {project.description}
              </p>
              <div className="magic-bento-actions">
                <Link href={project.git_url} target="_blank" className="w-fit block">
                  <div className="flex items-center justify-center gap-2 hover:underline !cursor-pointer">
                    View Project
                    <ArrowUpRight />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default MagicBento;
