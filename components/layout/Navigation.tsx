"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { useTheme } from "@/context/use-theme";
import Button from "../others/Button";
import "./../../styles/components/navigation.scss";

const menus = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Projects", path: "/projects" },
  { title: "Contact", path: "/contact" },
];

const socials = [
  {
    title: "Facebook",
    href: "https://www.facebook.com/jazbah.ahmed.334",
  },
  {
    title: "Instagram",
    href: "https://www.instagram.com/jazbah.ahmed.334",
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/jazbah-ahmed-334/",
  },
];

export default function Navigation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline>(null);

  const { navState, setNavState, startNavigating } = useTheme();

  const isOpen = navState === "open";

  const closeNavigation = useCallback(() => {
    setNavState("close");
  }, [setNavState]);

  useGSAP(
    (context) => {
      const section = sectionRef.current;
      if (!section) return;

      const q = gsap.utils.selector(section);

      timelineRef.current = gsap
        .timeline({
          paused: true,
          defaults: {
            ease: "power3.out",
          },
          onReverseComplete: () => {
            gsap.set(section, { visibility: "hidden" });
            setNavState("close");
          },
        })
        .set(section, { visibility: "visible" })
        .fromTo(
          section,
          {
            yPercent: 100,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.5,
          },
        )
        .from(
          q(".content"),
          {
            y: -80,
            opacity: 0,
            duration: 0.3,
          },
          "<0.1",
        )
        .from(
          q(".main_menu li"),
          {
            y: 80,
            opacity: 0,
            stagger: 0.08,
            duration: 0.3,
          },
          "<",
        );

      return () => context.revert();
    },
    { scope: sectionRef },
  );

  useEffect(() => {
    const tl = timelineRef.current;
    const section = sectionRef.current;

    if (!tl || !section) return;

    if (isOpen) {
      gsap.set(section, { visibility: "visible" });
      tl.play(0);
    } else {
      tl.reverse();
    }
  }, [isOpen]);

  return (
    <div ref={sectionRef} className="jb_navigation">
      <div className="top_content">
        <div className="location content">
          Hold [Ctrl] To quick navigate - (Close it first)
        </div>

        <button
          type="button"
          className="close_btn content"
          aria-label="Close navigation"
          onClick={closeNavigation}
        >
          <X />
        </button>

        <div className="flex justify-end" onClick={() => startNavigating("/contact")}>
          <Button className="content">Message</Button>
        </div>
      </div>

      <div className="middle_content">
        <nav className="main_menu" aria-label="Main navigation">
          <ul>
            {menus.map(({ title, path }) => (
              <li key={path}>
                <div className="link" onClick={() => startNavigating(path)}>
                  <span>{title}</span>
                  <span>{title}</span>
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="bottom_content">
        <div className="copywrite content">
          © {new Date().getFullYear()} ALL RIGHTS RESERVED
        </div>

        <div className="social_media content">
          {socials.map(({ title, href }) => (
            <Link
              key={title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-type="link"
            >
              {title}
              <ArrowUpRight />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
