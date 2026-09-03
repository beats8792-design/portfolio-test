import FeaturedSkills from "@/components/sections/FeaturedSkills";
import ProjectBanner from "@/components/sections/project-banner/ProjectBanner";
import ProjectGrid from "@/components/sections/ProjectGrid";
import { Suspense } from "react";

export default function page() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <ProjectBanner />
      </Suspense>
      <FeaturedSkills />
      <ProjectGrid />
    </>
  );
}
