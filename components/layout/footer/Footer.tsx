import Link from "next/link";
import "./../../../styles/components/footer.scss";
import Talk from "./Talk";
import BgText from "./BgText";
import TextMarque from "./TextMarque";

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
  return (
    <footer className="footer_section">
      <TextMarque />
      <div className="middle_content">
        <Talk />

        <Link
          className="mail w-fit mx-auto"
          href="mailto:jazbahulalam@gmail.com"
          data-cursor-type="link"
        >
          jazbahulalam@gmail.com
        </Link>

        <BgText />
      </div>

      <div className="bottom_content">
        <p className="copyright">
          © JazBah -<span className="date">2023</span>
          {/* <Link
            className="ml-2 cursor-pointer"
            href={"/admin"}
            data-cursor-type="link"
          >
            Admin
          </Link> */}
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
