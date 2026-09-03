/* eslint-disable react-hooks/set-state-in-render */
/* eslint-disable react-hooks/set-state-in-effect */
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

  // device type
  deviceType: "desktop" | "mobile";
  setDeviceType: (deviceType: "desktop" | "mobile") => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [scrolled, setScrolled] = useState(0);
  const [navState, setNavState] = useState<"open" | "close">("close");
  const [pageLoaded, setPageLoaded] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [deviceType, setDeviceType] = useState<"desktop" | "mobile">("desktop");

  // transition states
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
  }, [mode]);

  useLenis((lenis) => {
    const progress = Math.round(lenis.progress * 10);

    setScrolled((prev) => {
      if (prev === progress) return prev;
      return progress;
    });
  });

  // page load state
  const handleLoad = () => {
    setPageLoaded(true);
  };
  useEffect(() => {
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
    router.prefetch(url);

    if (navState === "open") {
      setNavState("close");
    }

    await sleep((DRAW_IN_DURATION + MAX_STAGGER_DELAY) * 1000);

    router.push(url);

    await sleep(PAUSE_DURATION * 1000);
    await sleep((DRAW_OUT_DURATION + MAX_STAGGER_DELAY) * 1000);

    setIsNavigating(false);
  };

  // device type
  const handleDeviceTypeChange = () => {
    const newDeviceType = window.innerWidth > 768 ? "desktop" : "mobile";

    setDeviceType((prev) => (prev === newDeviceType ? prev : newDeviceType));
  };

  useEffect(() => {
    handleDeviceTypeChange();

    window.addEventListener("resize", handleDeviceTypeChange);

    return () => {
      window.removeEventListener("resize", handleDeviceTypeChange);
    };
  }, []);

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
        deviceType,
        setDeviceType,
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
