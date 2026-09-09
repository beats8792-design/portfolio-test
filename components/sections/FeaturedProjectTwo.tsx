import { AnimatedSlides } from "../animations/AnimatedSlides";
import Heading from "../others/Heading";
import "./../../styles/components/featured_project_two.scss";

const projects = [
  {
    title: "Beats",
    description:
      "Built with HTML, SCSS & JS, Beats delivers slick, immersive layouts, a custom cursor, and a stylish, smooth experience that hooks users and sells with personality.",
    tags: ["HTML/SCSS", "Javascript"],
    image: "/static/images/beats-pc.png",
    live_url: "https://jaz-bah.github.io/beats/",
    git_url: "https://github.com/jaz-bah/beats",
  },
  {
    title: "Travela",
    description:
      "Travela, built with HTML, SCSS & JS, offers clean layouts, fresh visuals & smooth interactions, guiding visitors from curiosity to booking with effortless, modern style.",
    tags: ["HTML/SCSS", "Javascript"],
    image: "/static/images/travela-pc.png",
    live_url: "https://jaz-bah.github.io/travela/",
    git_url: "https://github.com/jaz-bah/travela",
  },
  {
    title: "L’Gran",
    description:
      "L’Gran, built with HTML, SCSS & JS, fuses fine dining aesthetics with modern design, rich visuals, elegant typography & smooth interactions, serving luxury on every scroll.",
    tags: ["HTML/SCSS", "Javascript"],
    image: "/static/images/lgran-pc.png",
    live_url: "https://jaz-bah.github.io/lgran/",
    git_url: "https://github.com/jaz-bah/lgran",
  },
];

export default function FeaturedProjectTwo() {
  return (
    <div className="jb_featured_project_two">
      <div className="container mx-auto px-4">
        <Heading title="Featured Projects" link="/projects" />
        <div className="pt-10 md:pt-20">
          <AnimatedSlides slides={projects} />
        </div>
      </div>
    </div>
  );
}
