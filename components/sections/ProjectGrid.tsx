import React from "react";
import ProjectSmallCard from "../card/ProjectSmallCard";
import "./../../styles/components/projects_tabs.scss";
import Heading from "../others/Heading";

export interface Project {
  id: number;
  title: string;
  tags: string[];
  desk_image: string;
  mobile_image: string;
  description: string;
  view_link: string;
  code_link: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Project 1",
    tags: ["React", "Next.js"],
    desk_image: "/static/images/trail-image (1).jpg",
    mobile_image: "/static/images/trail-image (2).jpg",
    description: "A project built with React and Next.js",
    view_link: "/project/1",
    code_link: "https://github.com/user/project-1",
  },
  {
    id: 2,
    title: "Project 2",
    tags: ["React", "Next.js"],
    desk_image: "/static/images/trail-image (3).jpg",
    mobile_image: "/static/images/trail-image (4).jpg",
    description: "A project built with React and Next.js",
    view_link: "/project/2",
    code_link: "https://github.com/user/project-2",
  },
  {
    id: 3,
    title: "Project 3",
    tags: ["React", "Next.js"],
    desk_image: "/static/images/trail-image (5).jpg",
    mobile_image: "/static/images/trail-image (6).jpg",
    description: "A project built with React and Next.js",
    view_link: "/project/3",
    code_link: "https://github.com/user/project-3",
  },
  {
    id: 4,
    title: "Project 4",
    tags: ["React", "Next.js"],
    desk_image: "/static/images/trail-image (7).jpg",
    mobile_image: "/static/images/trail-image (8).jpg",
    description: "A project built with React and Next.js",
    view_link: "/project/4",
    code_link: "https://github.com/user/project-4",
  },
  {
    id: 5,
    title: "Project 5",
    tags: ["React", "Next.js"],
    desk_image: "/static/images/trail-image (9).jpg",
    mobile_image: "/static/images/trail-image (10).jpg",
    description: "A project built with React and Next.js",
    view_link: "/project/5",
    code_link: "https://github.com/user/project-5",
  },
];

export default function ProjectGrid() {
  return (
    <div className="projects_tabs_section">
      <div className="px-4">
        <Heading title="Projects" />
        <div className="project_grid">
          {projects.map((project) => (
            <ProjectSmallCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
