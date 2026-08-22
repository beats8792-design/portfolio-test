import React from "react";
import MagicBento from "../animations/MagicBento";
import Heading from "../others/Heading";
import "./../../styles/components/featured-products.scss"

const projects = [
  {
    title: "Beats",
    description:
      "Built with HTML, SCSS & JS, Beats delivers slick, immersive layouts, a custom cursor, and a stylish, smooth experience that hooks users and sells with personality.",
    tags: ["HTML/SCSS", "Javascript"],
    image:
      "https://res.cloudinary.com/dukal2ihk/image/upload/v1754748610/portfolio/hdpb8noaryifmu4oboxs.png",
    live_url: "https://jaz-bah.github.io/beats/",
    git_url: "https://github.com/jaz-bah/beats",
  },
  {
    title: "Travela",
    description:
      "Travela, built with HTML, SCSS & JS, offers clean layouts, fresh visuals & smooth interactions, guiding visitors from curiosity to booking with effortless, modern style.",
    tags: ["HTML/SCSS", "Javascript"],
    image:
      "https://res.cloudinary.com/dukal2ihk/image/upload/v1754748711/portfolio/mduc68qewpjkj3o9ff9v.png",
    live_url: "https://jaz-bah.github.io/travela/",
    git_url: "https://github.com/jaz-bah/travela",
  },
  {
    title: "L’Gran",
    description:
      "L’Gran, built with HTML, SCSS & JS, fuses fine dining aesthetics with modern design, rich visuals, elegant typography & smooth interactions, serving luxury on every scroll.",
    tags: ["HTML/SCSS", "Javascript"],
    image:
      "https://res.cloudinary.com/dukal2ihk/image/upload/v1754756367/portfolio/xatzrvyrpxrgnyh6eetb.png",
    live_url: "https://jaz-bah.github.io/lgran/",
    git_url: "https://github.com/jaz-bah/lgran",
  },
  {
    title: "Burger",
    description:
      "Burger House, built with HTML, SCSS & JS, serves bold visuals, mouth-watering layouts & clean UI, a hearty design that brings you closer to that first juicy bite with every scroll.",
    tags: ["HTML/SCSS", "Javascript"],
    image:
      "https://res.cloudinary.com/dukal2ihk/image/upload/v1754756530/portfolio/xxijga1yuo1dlf48a789.png",
    live_url: "https://jaz-bah.github.io/burger/",
    git_url: "https://github.com/jaz-bah/burger",
  },
  {
    title: "Number",
    description:
      "Number, built with raw JavaScript, is a no-frills math playground, convert, calculate & explore from binary to decimals, factorials to logs. Pure, hands-on tools for true number lovers.",
    tags: ["HTML/SCSS", "Javascript"],
    image:
      "https://res.cloudinary.com/dukal2ihk/image/upload/v1754756635/portfolio/abv1ebxg6ck2eusm5vgd.png",
    live_url: "https://jaz-bah.github.io/number/",
    git_url: "https://github.com/jaz-bah/number",
  },
  {
    title: "Epay",
    description:
      "E-Pay, built with HTML, SCSS & JS, pairs minimal design, modern typography & smooth animations for a clean fintech vibe that’s as secure as it looks.",
    tags: ["HTML/SCSS", "Javascript"],
    image:
      "https://res.cloudinary.com/dukal2ihk/image/upload/v1754756744/portfolio/hzlm2lvgcaecxwzhivbs.png",
    live_url: "https://jaz-bah.github.io/epay/",
    git_url: "https://github.com/jaz-bah/epay",
  },
  {
    title: "Finly",
    description:
      "Finly, built with Next.js, ShadCN & NextAuth, offers a sleek interface for tracking income, expenses & savings, with recurring transactions, real-time analytics & PWA support.",
    tags: ["Next.js", "Typescript"],
    image:
      "https://res.cloudinary.com/dukal2ihk/image/upload/v1754757127/portfolio/qk4ozgiwfxwaoghwrhuk.png",
    live_url: "https://finlyfinance.vercel.app/",
    git_url: "https://github.com/jaz-bah/finly",
  },
  {
    title: "Codebot",
    description:
      "CodeBot is a personal coding assistant that securely stores your code snippets, presets, and reusable components.",
    tags: ["Typescript", "Tailwind", "Mongodb", "Next.js"],
    image:
      "https://res.cloudinary.com/dukal2ihk/image/upload/v1762795105/portfolio/o7ozkwkbbqh2inalee48.png",
    live_url: "https://codebot-2-0.vercel.app/",
    git_url: "https://github.com/jaz-bah/codebot-2.0",
  },
  {
    title: "Todo App",
    description: "A todo app with order management.",
    tags: ["Tailwind", "Shadcn", "Mongodb", "Typescript", "Next.js"],
    image:
      "https://res.cloudinary.com/dukal2ihk/image/upload/v1762795337/portfolio/f0yiux2ujwo47hqng7y6.png",
    live_url: "https://jazbahtodo.vercel.app/",
    git_url: "https://github.com/jaz-bah/todo",
  },
];

export default function FeaturedProjects() {
  return (
    <div className="container mx-auto px-4 jb_featured_projects">
      <Heading title="Featured Projects" />

      <MagicBento
        projects={projects}
        textAutoHide
        enableBorderGlow
        clickEffect
        spotlightRadius={400}
        glowColor="255, 92, 23"
      />
    </div>
  );
}
