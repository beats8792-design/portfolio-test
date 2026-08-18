"use client";

import Link from "next/link";
import "./../../styles/components/footer.scss";
import TextPressure from "../animations/TextPressure";
import { useTheme } from "@/context/use-theme";

const texts = [
  "Front-End",
  "Back-End",
  "Full-Stack",
  "Shopify",
  "Wordpress",
  "App",
];

const socials = [
  {
    name: "Facebook",
    path: "https://www.facebook.com/",
  },
  {
    name: "Twitter",
    path: "https://twitter.com/",
  },
  {
    name: "Instagram",
    path: "https://www.instagram.com/",
  },
  {
    name: "Linkedin",
    path: "https://www.linkedin.com/",
  },
];

export default function Footer() {
  const { startNavigating } = useTheme();
  return (
    <footer className="footer_section">
      <div className="middle_content" onClick={() => startNavigating("/contact")}>
        <TextPressure
          text="Contact"
          flex
          alpha={false}
          stroke={true}
          textColor="#ffffff"
          strokeColor="#ffffff"
          minFontSize={24}
        />
      </div>

      <div className="bottom_content">
        <p className="copyright">
          © JazBah -<span className="date">2023</span>
          <Link
            className="ml-2 cursor-pointer"
            href={"/admin"}
            data-cursor-type="link"
          >
            Admin
          </Link>
        </p>

        <ul className="social">
          {socials &&
            socials.map((social, index) => (
              <li key={index} data-cursor-type="link">
                <Link href={social.path}>{social.name}</Link>
              </li>
            ))}
        </ul>
      </div>
    </footer>
  );
}
