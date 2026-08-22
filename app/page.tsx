import Experience from "@/components/sections/Experience";
import Expertise from "@/components/sections/Expertise";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import FeaturedSkills from "@/components/sections/FeaturedSkills";
import HomeBanner from "@/components/sections/HomeBanner";

export default function Home() {
  return (
    <div>
      <HomeBanner />
      <Expertise />
      <FeaturedProjects />
      <Experience />
      <FeaturedSkills />
    </div>
  );
}
