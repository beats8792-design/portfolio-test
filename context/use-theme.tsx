"use client";

import {
  DRAW_IN_DURATION,
  DRAW_OUT_DURATION,
  MAX_STAGGER_DELAY,
  PAUSE_DURATION,
} from "@/lib/transition-constants";
import { useLenis } from "lenis/react";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ThemeContextType = {
  // theme mode
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;

  // scroll position
  scrolled: number;
  setScrolled: (scrolled: number) => void;

  // navigation state
  navState: "open" | "close";
  setNavState: (navState: "open" | "close") => void;

  // page load state
  pageLoaded: boolean;
  setPageLoaded: (state: boolean) => void;

  // animation state
  animate: boolean;
  setAnimate: (state: boolean) => void;

  // transition state
  isNavigating: boolean;
  setIsNavigating: (state: boolean) => void;
  startNavigating: (url: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [scrolled, setScrolled] = useState<number>(0);
  const [navState, setNavState] = useState<"open" | "close">("close");
  const [pageLoaded, setPageLoaded] = useState(false);
  const [animate, setAnimate] = useState(false);

  // transition states
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
  }, [mode]);

  useLenis((lenis) => {
    setScrolled(lenis.progress * 100);
  });

  useEffect(() => {
    const handleLoad = () => {
      setPageLoaded(true);
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", handleLoad);
    } else {
      handleLoad();
    }

    return () => {
      document.removeEventListener("DOMContentLoaded", handleLoad);
    };
  }, []);

  // transtion
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const startNavigating = async (url: string) => {
    setIsNavigating(true);
    if(navState === "open"){
      setNavState("close");
    };

    await sleep((DRAW_IN_DURATION + MAX_STAGGER_DELAY) * 1000);

    router.prefetch(url);
    router.push(url);

    await sleep(PAUSE_DURATION * 1000);
    await sleep((DRAW_OUT_DURATION + MAX_STAGGER_DELAY) * 1000);
    
    setIsNavigating(false);
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        scrolled,
        setScrolled,
        navState,
        setNavState,
        pageLoaded,
        setPageLoaded,
        animate,
        setAnimate,
        isNavigating,
        setIsNavigating,
        startNavigating,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
