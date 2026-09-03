import { TextAnimate } from "../animations/TextAnimate";
import TextMarque from "../layout/footer/TextMarque";
import "./../../styles/components/about_banner.scss";

export default function MorphBanner() {
  return (
    <section className="about_banner_section">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="profile_image"></div>
          <div className="content">
            <h2 className="heading">
              <TextAnimate animation="blurIn">Hi...</TextAnimate>
              <TextAnimate animation="blurIn">I&apos;m JazBah</TextAnimate>
            </h2>
            <h3 className="subheading">
              <TextAnimate animation="blurIn">Frontend Developer</TextAnimate>
              <TextAnimate animation="blurIn">
                Shopify Theme & App Developer
              </TextAnimate>
            </h3>
          </div>
        </div>
      </div>

      <div className="about_banner_marque_wrapper">
        <div className="about_banner_marque one">
          <TextMarque />
        </div>
        <div className="about_banner_marque tow">
          <TextMarque reverse />
        </div>
      </div>
    </section>
  );
}
