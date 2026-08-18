import React from "react";
import SmoothScroll from "./SmoothScroll";
import ThemeProvider from "@/context/use-theme";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScroll>{children}</SmoothScroll>
    </ThemeProvider>
  );
}
