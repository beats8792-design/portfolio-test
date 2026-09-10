"use client";

import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, SplitText } from "gsap/all";
import { useRef } from "react";
import ProjectCardTwo from "../../card/ProjectCardTwo";
import { shopifyProjects } from "../../../data/shopify-projects";
import "./../../../styles/components/projects_banner.scss";

export default function ProjectsBannerGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const rowOneProjects = [
    ...shopifyProjects.slice(0, 8),
    ...shopifyProjects.slice(0, 8),
  ];
  const rowTwoProjects = [
    ...shopifyProjects.slice(8, 16),
    ...shopifyProjects.slice(8, 16),
  ];
  const rowThreeProjects = [
    ...shopifyProjects.slice(16, 24),
    ...shopifyProjects.slice(16, 24),
  ];
  const rowFourProjects = [
    ...shopifyProjects.slice(24, 32),
    ...shopifyProjects.slice(24, 32),
  ];

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
            {rowOneProjects &&
              rowOneProjects.map((project, index) => (
                <ProjectCardTwo
                  key={index}
                  image_one={project.image_1}
                  image_two={project.image_2}
                  title={project.title}
                  link={project.link}
                />
              ))}
          </div>

          <div className="grid_column banner_col_two">
            {rowTwoProjects &&
              rowTwoProjects.map((project, index) => (
                <ProjectCardTwo
                  key={index}
                  image_one={project.image_1}
                  image_two={project.image_2}
                  title={project.title}
                  link={project.link}
                />
              ))}
          </div>

          <div className="grid_column banner_col_three">
            {rowThreeProjects &&
              rowThreeProjects.map((project, index) => (
                <ProjectCardTwo
                  key={index}
                  image_one={project.image_1}
                  image_two={project.image_2}
                  title={project.title}
                  link={project.link}
                />
              ))}
          </div>

          <div className="grid_column banner_col_four">
            {rowFourProjects &&
              rowFourProjects.map((project, index) => (
                <ProjectCardTwo
                  key={index}
                  image_one={project.image_1}
                  image_two={project.image_2}
                  title={project.title}
                  link={project.link}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
