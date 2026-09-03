import About from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Experience from "@/components/sections/Experience";
import MorphBanner from "@/components/sections/MorphBanner";
import { Suspense } from "react";

export default function page() {
  return (
    <>
      <MorphBanner />
      <About />
      <Suspense fallback={<div>Loading...</div>}>
        <Education />
      </Suspense>
      <Experience />
    </>
  );
}
