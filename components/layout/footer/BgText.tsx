"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function BgText() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const text = textRef.current;

      if (!text) return;

      const footer = text.closest(".footer_section");

      if (!footer) return;

      gsap.fromTo(
        text,
        {
          y: 0,
          scale: 0.96,
          rotation: -1,
        },
        {
          y: -200,
          scale: 1.02,
          rotation: 1,
          ease: "none",
          scrollTrigger: {
            trigger: footer,
            start: "top bottom",
            end: "bottom top",
            scrub: 5,
          },
        },
      );
    },
    {
      dependencies: [pathname],
      revertOnUpdate: true,
    },
  );

  return (
    <h2 ref={textRef} className="bg_text">
      JazBah
    </h2>
  );
}