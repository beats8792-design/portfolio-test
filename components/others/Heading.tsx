import { Star } from "lucide-react";
import Link from "next/link";
import StarIcon from "../icons/StarIcon";
// import StarIcon from "../icons/StarIcon";

interface Props {
  title: string;
  link?: string;
}

export default function Heading({ title, link }: Props) {
  return (
    <div className="heading_box">
      <div className="left_box" data-cursor-type="heading">
        <div className="icon_box">
          <StarIcon />
        </div>
        <h2 className="heading overflow-hidden">{title}</h2>
      </div>

      {link && (
        <div className="right_box">
          <Link href={link} className="link" data-cursor-type="link">
            <span className="first">View All</span>
            <span className="second">View All</span>
          </Link>
        </div>
      )}
    </div>
  );
}
