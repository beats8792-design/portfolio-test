"use client";
import { useTheme } from "@/context/use-theme";
import StarIcon from "../icons/StarIcon";

interface Props {
  title: string;
  link?: string;
}

export default function Heading({ title, link }: Props) {
  const { startNavigating } = useTheme();
  return (
    <div className="heading_box">
      <div className="left_box">
        <div className="icon_box">
          <StarIcon />
        </div>
        <h2 className="heading overflow-hidden">{title}</h2>
      </div>

      {link && (
        <div className="right_box">
          <div onClick={() => startNavigating(link)} className="link">
            <span className="first">View All</span>
            <span className="second">View All</span>
          </div>
        </div>
      )}
    </div>
  );
}
