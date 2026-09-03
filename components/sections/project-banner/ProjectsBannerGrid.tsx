"use client";

import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";
import ProjectCardTwo from "../../card/ProjectCardTwo";
import "./../../../styles/components/projects_banner.scss";

gsap.registerPlugin(ScrollTrigger, SplitText);

const projects = [
  {
    media: [
      "/static/images/trail-image (1).jpg",
      "/static/images/trail-image (2).jpg",
    ],
    type: "image",
    path: "/",
  },
  {
    media: [
      "/static/images/trail-image (2).jpg",
      "/static/images/trail-image (3).jpg",
    ],
    type: "image",
    path: "/",
  },
  {
    media: [
      "/static/images/trail-image (3).jpg",
      "/static/images/trail-image (4).jpg",
    ],
    type: "image",
    path: "/",
  },
  {
    media: [
      "/static/images/trail-image (4).jpg",
      "/static/images/trail-image (5).jpg",
    ],
    type: "video",
    path: "/",
  },
  {
    media: [
      "/static/images/trail-image (5).jpg",
      "/static/images/trail-image (6).jpg",
    ],
    type: "image",
    path: "/",
  },
  {
    media: [
      "/static/images/trail-image (6).jpg",
      "/static/images/trail-image (1).jpg",
    ],
    type: "image",
    path: "/",
  },
  {
    media: [
      "/static/images/trail-image (1).jpg",
      "/static/images/trail-image (2).jpg",
    ],
    type: "image",
    path: "/",
  },
  {
    media: [
      "/static/images/trail-image (2).jpg",
      "/static/images/trail-image (3).jpg",
    ],
    type: "image",
    path: "/",
  },
  {
    media: [
      "/static/images/trail-image (3).jpg",
      "/static/images/trail-image (4).jpg",
    ],
    type: "image",
    path: "/",
  },
  {
    media: [
      "/static/images/trail-image (4).jpg",
      "/static/images/trail-image (5).jpg",
    ],
    type: "video",
    path: "/",
  },
  {
    media: [
      "/static/images/trail-image (5).jpg",
      "/static/images/trail-image (6).jpg",
    ],
    type: "image",
    path: "/",
  },
  {
    media: [
      "/static/images/trail-image (6).jpg",
      "/static/images/trail-image (1).jpg",
    ],
    type: "image",
    path: "/",
  },
];

export default function ProjectsBannerGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const projectsBanner = sectionRef.current;
      const projectsBannerGrid = projectsBanner.querySelector(
        ".grid_content",
      ) as HTMLElement;
      const projectsBannerGridWrapper = projectsBannerGrid?.querySelector(
        ".grid_wrapper",
      ) as HTMLElement;
      const heading = sectionRef.current.querySelector(
        ".text_box .title",
      ) as HTMLElement;

      const projectsBannerColumns = [
        projectsBannerGridWrapper?.querySelector(".banner_col_one"),
        projectsBannerGridWrapper?.querySelector(".banner_col_two"),
        projectsBannerGridWrapper?.querySelector(".banner_col_three"),
        projectsBannerGridWrapper?.querySelector(".banner_col_four"),
      ] as HTMLElement[];

      if (
        !projectsBanner ||
        !projectsBannerGrid ||
        !projectsBannerGridWrapper ||
        projectsBannerColumns.some((col) => !col)
      )
        return;

      const headingSplit = new SplitText(heading, {
        type: "words, lines",
        linesClass: "flex overflow-hidden",
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: projectsBanner,
          start: "top top",
          pin: true,
          scrub: 3,
          invalidateOnRefresh: true, // <-- re-run the from/to functions (incl. "auto" height) on refresh
        },
      });

      timeline
        .to(projectsBannerGrid, {
          height: "auto",
          width: "100%",
          marginRight: "0px",
          borderRadius: "0px",
          duration: 1,
          ease: "power1.out",
        })
        .fromTo(
          projectsBannerGridWrapper,
          { transform: "translateX(-15%) skew(-35deg, 10deg)" },
          {
            transform: "translateX(0%) skew(0deg, 0deg)",
            duration: 1,
            ease: "power1.out",
          },
          "<",
        )
        .to(
          headingSplit.words,
          { y: -100, stagger: 0.02, duration: 0.5, ease: "power1.out" },
          "<",
        );

      const columnAnimations = ["-10%", "-20%", "-5%", "-30%"];
      projectsBannerColumns.forEach((col, index) => {
        timeline.fromTo(
          col,
          { y: "0%" },
          { y: columnAnimations[index], duration: 1, ease: "power1.out" },
          0,
        );
      });

      // Force GSAP/ScrollTrigger to re-measure once every image in the grid is actually loaded
      const images = Array.from(projectsBannerGrid.querySelectorAll("img"));
      const pending = images.filter((img) => !img.complete);

      if (pending.length) {
        Promise.all(
          pending.map(
            (img) =>
              new Promise<void>((resolve) => {
                img.addEventListener("load", () => resolve(), { once: true });
                img.addEventListener("error", () => resolve(), { once: true });
              }),
          ),
        ).then(() => {
          ScrollTrigger.refresh();
        });
      }
    },
    { scope: sectionRef },
  );
  return (
    <section
      className="projects_banner_section projects_banner_section_grid"
      ref={sectionRef}
    >
      <div className="text_box">
        <h2 className="title">400+ projects. Shopify Themes</h2>
      </div>

      <div className="grid_content">
        <div className="grid_wrapper">
          <div className="grid_column banner_col_one">
            {projects &&
              projects.map((project, index) => (
                <ProjectCardTwo
                  key={index}
                  image_one={project.media[0]}
                  image_two={project.media[1]}
                />
              ))}
          </div>

          <div className="grid_column banner_col_two">
            {projects &&
              projects.map((project, index) => (
                <ProjectCardTwo
                  key={index}
                  image_one={project.media[0]}
                  image_two={project.media[1]}
                />
              ))}
          </div>

          <div className="grid_column banner_col_three">
            {projects &&
              projects.map((project, index) => (
                <ProjectCardTwo
                  key={index}
                  image_one={project.media[0]}
                  image_two={project.media[1]}
                />
              ))}
          </div>

          <div className="grid_column banner_col_four">
            {projects &&
              projects.map((project, index) => (
                <ProjectCardTwo
                  key={index}
                  image_one={project.media[0]}
                  image_two={project.media[1]}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
