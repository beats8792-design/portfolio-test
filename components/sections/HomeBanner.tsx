"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import { useTheme } from "@/context/use-theme";
import CursorGrid from "../animations/CursorGrid";
import TrueFocus from "../animations/TrueFocus";

import "./../../styles/components/home-banner.scss";

const TEXTS = [
  { type: "text", value: "I'm" },
  { type: "text", value: "a" },
  { type: "image", value: "/static/images/banner-text-img-4.png" },
  { type: "text", value: "Front-End" },
  { type: "text", value: "Developer" },
  { type: "image", value: "/static/images/banner-text-img-3.png" },
  { type: "text", value: "Specialized" },
  { type: "text", value: "in" },
  { type: "text", value: "Shopify" },
  { type: "image", value: "/static/images/banner-text-img-2.png" },
  { type: "text", value: "Theme" },
  { type: "image", value: "/static/images/banner-text-img-1.png" },
  { type: "text", value: "&" },
  { type: "text", value: "App" },
  { type: "text", value: "Development" },
] as const;

export default function HomeBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const { animate } = useTheme();

  useGSAP(
    () => {
      if (!animate || !bannerRef.current) return;

      const bannerTexts = bannerRef.current.querySelectorAll(
        ".banner_text .banner_word",
      );
      const bannerTextImage = bannerRef.current.querySelectorAll(".text_image");

      gsap
        .timeline()
        .from(bannerTexts, {
          duration: 1,
          y: 100,
          ease: "power4.out",
          stagger: 0.1,
        })
        .fromTo(
          bannerTextImage,
          {
            height: "0px",
          },
          {
            height: "calc(100vw * var(--img-height-ratio))",
            duration: 0.5,
            ease: "power1.in",
          },
          "<0.5",
        );
    },
    {
      scope: bannerRef,
      dependencies: [animate],
    },
  );

  return (
    <section ref={bannerRef} className="fs_home_banner">
      <div className="background">
        <CursorGrid
          cellSize={40}
          color="#FE7F2D"
          radius={140}
          falloff="smooth"
          holdTime={200}
          fadeDuration={600}
          lineWidth={1.2}
          maxOpacity={0.4}
          fillOpacity={0}
          gridOpacity={0}
          cellRadius={0}
          clickPulse
          pulseSpeed={600}
        />
      </div>

      <div className="max-w-7xl mx-auto flex h-full items-center justify-center">
        <div className="content_wrapper">
          <div className="top_content">
            <h2 className="banner_text" data-cursor-type="heading">
              {TEXTS.map(({ type, value }, index) =>
                type === "text" ? (
                  <span
                    key={index}
                    className="overflow-hidden flex items-center justify-center"
                  >
                    <span className="banner_word">{value}</span>
                  </span>
                ) : (
                  <span
                    key={index}
                    className="text_image"
                    style={{ backgroundImage: `url(${value})` }}
                  />
                ),
              )}
            </h2>
          </div>
        </div>
      </div>

      <div className="bottom_content max-w-7xl var(--f-h-1)">
        <TrueFocus
          sentence="Nest.js Remix.js Next.js Shopify"
          manualMode={false}
          blurAmount={3}
          borderColor="#ff5c17"
          animationDuration={0.5}
          pauseBetweenAnimations={1}
        />
      </div>
    </section>
  );
}
