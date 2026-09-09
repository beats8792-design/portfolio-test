import Experience from "@/components/sections/Experience";
import Expertise from "@/components/sections/Expertise";
import FeaturedProjectTwo from "@/components/sections/FeaturedProjectTwo";
import HomeBanner from "@/components/sections/HomeBanner";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <HomeBanner />
      <Expertise />
      <FeaturedProjectTwo />
      <Skills />
      <Experience />
    </>
  );
}
