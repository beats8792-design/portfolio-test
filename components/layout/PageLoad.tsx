/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useTheme } from "@/context/use-theme";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { Ripple } from "../animations/Ripple";
import "./../../styles/components/page-loader.scss";

export default function PageLoad() {
  const { pageLoaded, setAnimate } = useTheme();

  const loaderRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useGSAP(
    () => {
      if (!pageLoaded || !loaderRef.current || !visible) return;

      setAnimate(true);

      const tween = gsap.to(loaderRef.current, {
        yPercent: -100,
        duration: 0.5,
        ease: "power1.in",
        onComplete: () => {
          setVisible(false);
        },
      });

      return () => tween.kill();
    },
    {
      scope: loaderRef,
      dependencies: [pageLoaded, visible],
    }
  );

  if (!visible) return null;

  return (
    <div ref={loaderRef} className="fs_page_loader">
      <Ripple />
      <h2>Loading...</h2>
    </div>
  );
}