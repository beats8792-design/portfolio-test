"use client";
import { useTheme } from "@/context/use-theme";
import ProjectsBannerGrid from "./ProjectsBannerGrid";
import ProjectsBannerSlider from "./ProjectsBannerSlider";

export default function ProjectBanner() {
  const { deviceType } = useTheme();
  return (
    <>
      {deviceType == "mobile" ? (
        <ProjectsBannerSlider />
      ) : (
        <ProjectsBannerGrid />
      )}
    </>
  );
}
