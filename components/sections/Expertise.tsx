import { Box } from "lucide-react";
import Heading from "../others/Heading";
import { TextAnimate } from "../animations/TextAnimate";
import SquareIcon from "../icons/SquareIcon";
import "./../../styles/components/expertise.scss";


const expertises = [
  {
    title: "Built for Shopify",
    description:
      "Apps that run sharp and scale smart—powered by Remix, GraphQL, and Polaris, developed with merchants in mind.",
  },
  {
    title: "Thinking in React(ive)",
    description:
      "Clean architecture. Scalable code. No clutter. Just smart, maintainable builds.",
  },
  {
    title: "Themes That Sell",
    description:
      "Built from scratch with performance and pixel-perfect precision. Fast-loading, clean designs that keep users hooked.",
  },
  {
    title: "Motion First",
    description:
      "From GSAP to Framer Motion, I turn static screens into responsive stories. Smooth, sharp, scroll-ready.",
  },
];

export default function Expertise() {
  return (
    <section className="home_expertise_section">
      <div className="w-full max-w-7xl mx-auto px-4">
        <Heading title="Core Skills" />

        <div className="expertise_wrapper">
          {expertises &&
            expertises.map((expertise, index) => (
              <div className="expertise_card" key={index}>
                <div className="title_box">
                  <div className="icon_box">
                    <SquareIcon />
                  </div>
                  <h3 className="title">
                    <TextAnimate animation="blurIn">
                      {expertise.title}
                    </TextAnimate>
                  </h3>
                </div>

                <div className="text_content">
                  <TextAnimate animation="blurIn">
                    {expertise.description}
                  </TextAnimate>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
