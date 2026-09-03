import { TextAnimate } from "../animations/TextAnimate";
import Button from "../others/Button";
import Heading from "../others/Heading";
import ImageShaderEffect from "../others/ImageShaderEffect";
import "./../../styles/components/about_details.scss";

export default function About() {
  return (
    <section className="about_deatils_section">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text_content">
            <Heading title="About" />

            <div className="description">
              <TextAnimate animation="blurIn">
                I’m JazBah, a frontend developer who treats the browser like a
                canvas. I work in the space where clean code meets bold
                design—turning ideas into smooth, responsive experiences using
                Next.js, Remix, React, and Shopify.
              </TextAnimate>
              <br />
              <TextAnimate animation="blurIn">
                I build with intention—starting with structure, diving into
                logic, and polishing with motion. Whether it’s translating Figma
                into code or wiring up APIs, everything I touch is designed to
                feel fast and flow right.
              </TextAnimate>
              <br />
              <TextAnimate animation="blurIn">
                I care about the craft. I code like it matters—because it does.
                No shortcuts. No bloated fluff. Just honest work, thoughtful
                execution, and projects that ship right.
              </TextAnimate>
            </div>

            <Button type="Link" url="/static/pdf/Jazbah-CV.pdf" target="_blank">
              Download CV
            </Button>
          </div>

          <div className="img_content">
            <div className="imgbox">
              <ImageShaderEffect imageSrc="/static/images/about.png" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
