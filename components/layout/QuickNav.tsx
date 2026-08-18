/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import gsap from "gsap";
import { Code, HomeIcon, MailIcon, UserIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "./../../styles/components/quick-nav.scss";
import { useTheme } from "@/context/use-theme";

const urls = ["/", "/contact", "/projects", "/about"];

export default function QuickNav() {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const { startNavigating } = useTheme();

  const pathname = usePathname();

  const outerRef = useRef<HTMLDivElement | null>(null);

  const getValidIndex = (index: number, length: number) =>
    ((index % length) + length) % length;

  const getIndexFromPathname = (path: string) => {
    const index = urls.indexOf(path);
    return index === -1 ? 0 : index;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Control") {
        setIsActive(true);
      }

      if (!isActive) return;

      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => prev + 1);
      }

      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => prev - 1);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Control") {
        setIsActive(false);

        const index = getValidIndex(activeIndexRef.current, urls.length);
        const targetUrl = urls[index];

        if (targetUrl !== pathname) {
          startNavigating(targetUrl);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isActive]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
    if (!outerRef.current) return;

    gsap.to(outerRef.current, {
      rotate: activeIndex * 90,
      duration: 0.5,
      ease: "power3.out",
    });
  }, [activeIndex]);

  useEffect(() => {
    const index = getIndexFromPathname(pathname);
    // setActiveIndex(index);
    activeIndexRef.current = index;
  }, [pathname]);

  return (
    <div className={`jb_quick_nav ${isActive ? "active" : ""}`}>
      <div className="circle_active"></div>

      <div className="outer_circle" ref={outerRef}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="inner_circle"></div>

        <ul className="menu">
          <li>
            <HomeIcon />
          </li>
          <li>
            <UserIcon />
          </li>
          <li>
            <Code />
          </li>
          <li>
            <MailIcon />
          </li>
        </ul>
      </div>
    </div>
  );
}
