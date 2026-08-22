import { Marquee } from "@/components/animations/Marquee";
import StarIcon from "@/components/icons/StarIcon";
import React from "react";

const texts = [
  "Front-End",
  "Back-End",
  "Full-Stack",
  "E-commerce",
  "Shopify Theme & App",
  "Chrome Extension",
];

export default function TextMarque() {
  const repeatedTexts = [...texts, ...texts];
  return (
    <div className="footer_marque_wrapper text_marque_wrapper">
      <Marquee>
        {repeatedTexts.map((text, index) => (
          <span key={index + "m2"} className="item">
            <span className="text">{text}</span>
            <span className="icon">
              <StarIcon />
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
