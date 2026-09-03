import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/others/Accordion";
import Heading from "../others/Heading";
import "./../../styles/components/experience.scss";

const experiences = [
  {
    position: "Lead Frontend Developer",
    company: "Pointerflow",
    date: "Sep 2024 - Present",
    description: `
        <p>
            Promoted to lead frontend role with a team of <strong>3 interns</strong>. Guided them on service-related tasks, code quality, and development workflows. My focus shifted to <strong>Shopify app development</strong> using <strong>Remix</strong>, <strong>GraphQL</strong>, and <strong>Polaris</strong>—shipping tools that are fast, intuitive, and built with a reactive mindset.
        </p>
        <ul>
            <li><strong>Storecraft:</strong> Public app built with Remix and Polaris. A customizable Shopify section and landing page library for merchants.</li>
            <li><strong>Lightnr Swatch:</strong> Product bundling app with PJAX-powered smooth navigation and dynamic bundle creation.</li>
            <li><strong>Tradie:</strong> Middleware app that syncs data between a Magento backend and Shopify for product and order management.</li>
            <li><strong>Memorial:</strong> A profile system tied to QR codes, allowing visitors to scan and view memorial pages for loved ones. Built with Remix and Polaris.</li>
        </ul>
        `,
  },
  {
    position: "Frontend Developer",
    company: "Pointerflow",
    date: "Sep 2023 - Sep 2024",
    description: `
            <p>
                Focused on client-facing projects, developing over <strong>300+ custom Shopify themes</strong> using <strong>Liquid</strong> and best practices. Delivered pixel-perfect, high-performance storefronts aligned with each brand’s identity.
            </p>
        `,
  },
  {
    position: "Frontend Developer",
    company: "Analysis ACE",
    date: "Feb 2021 - Sep 2023",
    description: `
        <p>
            Kickstarted my career by turning high-fidelity <strong>Figma designs</strong> into responsive, production-ready interfaces using <strong>Next.js</strong>. Specialized in <strong>API integration</strong> with <strong>Axios</strong> and <strong>TanStack Query</strong>, focusing on performance and clean architecture.
        </p>
        <ul>
            <li><strong>Diagnostic ACE:</strong> Medical dashboard using Metronic theme, featuring charts, tables, and complex UI components built with Next.js.</li>
            <li><strong>Bestfluency:</strong> E-learning platform with live chat and video calling, fully built in Next.js.</li>
        </ul>
        `,
  },
];

export default function Experience() {
  return (
    <section className="jb_experience_section">
      <div className="container mx-auto px-4">
        <Heading title="Experience" />
        {/* <div className="experience_content" data-cursor-type="none">
                    <div className="experience_accordion" ref={accordionRef}>
                        <span className="notification">Click to <br /> expand</span>
                        {experiences.map((experience, index) => (
                            <div className="accordion_item" key={index}>
                                <div className="header">
                                    <div className="left_box">
                                        <h2 className="title">{experience.position}</h2>
                                    </div>
                                    <div className="right_box">
                                        <h2 className="title">{experience.company}</h2>
                                        <h3 className="date">{experience.date}</h3>
                                    </div>
                                </div>
                                <div className="content_wrapper">
                                    <div
                                        className="content"
                                        dangerouslySetInnerHTML={{ __html: experience.description }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}

        <Accordion
          className="experience_accordion"
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          variants={{
            expanded: {
              opacity: 1,
              scale: 1,
            },
            collapsed: {
              opacity: 0,
              scale: 0.7,
            },
          }}
        >
          {experiences.map((experience, index) => (
            <AccordionItem
              value={`experience-${index}`}
              className="accordion_item"
              key={index}
            >
              <AccordionTrigger className="w-full">
                <div className="header">
                  <div className="left_box">
                    <h2 className="title">{experience.position}</h2>
                  </div>
                  <div className="right_box">
                    <h2 className="title">{experience.company}</h2>
                    <h3 className="date">{experience.date}</h3>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="origin-left">
                <div className="content_wrapper">
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: experience.description }}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
