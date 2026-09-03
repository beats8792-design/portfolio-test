import { ArrowUpRight, Code, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

interface Props {
  project: Project;
  className?: string;
}

export default function ProjectSmallCard({ project, className }: Props) {
  return (
    <div className={`project_card ${className}`}>
      <div className="button_box">
        <div className="content_wrapper">
          {project.view_link && (
            <Link
              href={project.view_link}
              className="icon_box"
              data-toggle="tooltip"
              data-placement="top"
              title="View"
            >
              <Eye />
            </Link>
          )}
          {project.code_link && (
            <Link
              href={project.code_link}
              className="icon_box"
              data-toggle="tooltip"
              data-placement="top"
              title="Code"
            >
              <Code />
            </Link>
          )}

          <Link
            href={`/projects/${project.id} `}
            className="icon_box"
            data-toggle="tooltip"
            data-placement="top"
            title="Details"
          >
            <ArrowUpRight />
          </Link>
        </div>
      </div>
      <div className="head">
        <div className="img_desk">
          <div className="imgbox_full">
            <Image
              src={project.desk_image}
              alt="image"
              width={500}
              height={500}
            />
          </div>
        </div>

        <div className="img_tab">
          <div className="imgbox_full">
            <Image
              src={project.mobile_image}
              alt="image"
              width={200}
              height={200}
            />
          </div>
        </div>

        <div className="img_mobile">
          <div className="imgbox_full">
            <Image
              src={project.mobile_image}
              alt="image"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
      <div className="body">
        <h2 className="title">{project.title}</h2>

        <div className="more_content_wrapper">
          <div className="more_content">
            <p className="description">{project.description}</p>
            <ul className="tags">
              {project.tags &&
                project.tags.map((tag, index) => <li key={index}>{tag}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
