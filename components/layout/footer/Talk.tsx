"use client";
import TextPressure from "@/components/animations/TextPressure";
import { useTheme } from "@/context/use-theme";

export default function Talk() {
  const { startNavigating } = useTheme();
  return (
    <div className="" onClick={() => startNavigating("/contact")}>
      <TextPressure
        text="Let's Talk"
        flex
        alpha={false}
        stroke={true}
        textColor="#ffffff"
        strokeColor="#ffffff"
        minFontSize={24}
      />
    </div>
  );
}
