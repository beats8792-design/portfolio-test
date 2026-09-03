import { Marquee } from "@/components/animations/Marquee";
import CodeIcon from "@/components/icons/CodeIcon";

const texts = [
  "Front-End",
  "Back-End",
  "Full-Stack",
  "E-commerce",
  "Shopify Theme & App",
  "Chrome Extension",
];

interface Props {
  reverse?: boolean;
}

export default function TextMarque({ reverse = false }: Props) {
  const repeatedTexts = [...texts, ...texts];
  return (
    <div className="footer_marque_wrapper text_marque_wrapper">
      <Marquee reverse={reverse}>
        {repeatedTexts.map((text, index) => (
          <span key={index + "m2"} className="item">
            <span className="text">{text}</span>
            <span className="icon">
              <CodeIcon />
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
