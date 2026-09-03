"use client";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "gsap/all";
import { useRef } from "react";
import Heading from "../others/Heading";
import "./../../styles/components/about_education.scss";

const educations = [
  {
    name: "Bangladesh University (BU)",
    duration: "2023 – Present",
    subject: "BSc in Computer Science and Engineering",
    description:
      "Currently pursuing a Bachelor's in CSE with a focus on problem-solving, programming, and modern web technologies.",
  },
  {
    name: "Rangpur Polytechnic Institute (RPI)",
    duration: "2018 – 2022",
    subject: "Diploma in Computer Science",
    description:
      "Completed a 4-year diploma in Computer Science, gaining hands-on experience in software development and system fundamentals.",
  },
  {
    name: "PS Model High School",
    duration: "2018",
    subject: "Secondary School Certificate (SSC)",
    description:
      "Completed secondary education with a focus on science, laying the foundation for future studies in computing.",
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const rows = gsap.utils.toArray<HTMLElement>(
        ".education_row",
        sectionRef.current,
      );
      // const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const splitInstances: SplitText[] = [];

      rows.forEach((item) => {
        const bar = item.querySelector(".bar");
        const circle = item.querySelector(".circle");
        const circleInner = item.querySelector(".circle_inner");
        const mainTitle = item.querySelector(".left_box .title");
        const subTitle = item.querySelector(".left_box .sub_title");
        const title = item.querySelector(".right_box .title");
        const description = item.querySelector(".right_box .description");

        const splitMainTitle = new SplitText(mainTitle, {
          type: "lines, words",
          linesClass: "flex overflow-hidden",
        });
        const splitSubTitle = new SplitText(subTitle, {
          type: "lines, words",
          linesClass: "flex overflow-hidden",
        });
        const splitTitle = new SplitText(title, {
          type: "lines, words",
          linesClass: "flex overflow-hidden",
        });
        const splitDescription = new SplitText(description, { type: "lines" });
        splitInstances.push(
          splitMainTitle,
          splitSubTitle,
          splitTitle,
          splitDescription,
        );

        // if (prefersReducedMotion) {
        //   gsap.set(
        //     [
        //       circle,
        //       circleInner,
        //       splitMainTitle.words,
        //       splitSubTitle.words,
        //       splitTitle.words,
        //       splitDescription.lines,
        //       bar,
        //     ],
        //     { clearProps: "all" },
        //   );
        //   return;
        // }

        // Set a stable transform origin so the bar grows from the top, not the center
        gsap.set(bar, { transformOrigin: "top center" });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: item,
            start: "top bottom-=80",
            end: "top center",
            scrub: 0.8,
          },
        });

        tl.from(circle, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(2.2)",
        })
          .to(
            circleInner,
            {
              scale: 1.6,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
            },
            "<0.1",
          )
          .from(
            bar,
            {
              scaleY: 0,
              duration: 1,
            },
            "<",
          )
          .from(
            splitMainTitle.words,
            {
              y: "110%",
              opacity: 0,
              stagger: 0.05,
              duration: 0.7,
            },
            "-=0.75",
          )
          .from(
            splitSubTitle.words,
            {
              y: "110%",
              opacity: 0,
              stagger: 0.05,
              duration: 0.7,
            },
            "<0.05",
          )
          .from(
            splitTitle.words,
            {
              y: "110%",
              opacity: 0,
              stagger: 0.05,
              duration: 0.7,
            },
            "<",
          )
          .from(
            splitDescription.lines,
            {
              x: 40,
              opacity: 0,
              stagger: 0.08,
              duration: 0.7,
            },
            "-=0.5",
          );
      });

      return () => {
        splitInstances.forEach((s) => s.revert());
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="about_education_section">
      <div className="container mx-auto px-4">
        <Heading title="Education" />

        <div className="education_content">
          {educations &&
            educations.map((education, index) => (
              <div className="education_row" key={index}>
                <div className="left_box">
                  <h2 className="title">{education.name}</h2>
                  <h3 className="sub_title">{education.duration}</h3>
                </div>
                <div className="right_box">
                  <h2 className="title">{education.subject}</h2>
                  <p className="description">{education.description}</p>

                  <span className="bar"></span>
                  <span className="circle"></span>
                  <span className="circle_inner"></span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
