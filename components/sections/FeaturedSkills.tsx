import React from "react";
import { MorphingText } from "../animations/MorphingText";
import "./../../styles/components/featured-skills.scss";

export default function FeaturedSkills() {
  return (
    <div className="jb_featured_skills">
      <div className="w-full max-w-7xl mx-auto px-4">
        <MorphingText
          texts={[
            "Express.js",
            "Nest.js",
            "Remix.js",
            "Next.js",
            "Node.js",
            "Shopify",
          ]}
        />
      </div>
    </div>
  );
}
