import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "../animations/Terminal";
import Heading from "../others/Heading";
import "./../../styles/components/jb_skills.scss";

export default function Skills() {
  return (
    <div className="mx-auto px-4 jb_skills">
      <div className="container mx-auto px-4">
        <Heading title="Language Expertise" />
        <Terminal>
          <TypingAnimation>npm install frontend-skills</TypingAnimation>

          <AnimatedSpan className="text-green-500 flex">✔ HTML</AnimatedSpan>
          <AnimatedSpan className="text-green-500 flex">
            ✔ CSS
            <span className="text-gray-500"> --SCSS </span>
            <span className="text-gray-500">--Bootstrap </span>
            <span className="text-gray-500">--Tailwind </span>
          </AnimatedSpan>
          <AnimatedSpan className="text-green-500">✔ JavaScript</AnimatedSpan>
          <AnimatedSpan className="text-green-500">✔ TypeScript</AnimatedSpan>
          <AnimatedSpan className="text-green-500">✔ React.js</AnimatedSpan>
          <AnimatedSpan className="text-green-500">✔ Next.js</AnimatedSpan>
          <AnimatedSpan className="text-green-500">✔ Remix.js</AnimatedSpan>
          <AnimatedSpan className="text-green-500 flex">
            ✔ Shopify
            <span className="text-gray-500"> --theme </span>
            <span className="text-gray-500">--app </span>
          </AnimatedSpan>

          <TypingAnimation> </TypingAnimation>
          <TypingAnimation>npm install backend-skills</TypingAnimation>

          <AnimatedSpan className="text-green-500">✔ Node.js</AnimatedSpan>
          <AnimatedSpan className="text-green-500">✔ Express.js</AnimatedSpan>
          <AnimatedSpan className="text-green-500 flex">
            ✔ Nest.js <span className="text-gray-500">--in-progress </span>
          </AnimatedSpan>
          <AnimatedSpan className="text-green-500">✔ GraphQL</AnimatedSpan>
          <AnimatedSpan className="text-green-500">✔ REST API</AnimatedSpan>

          <TypingAnimation> </TypingAnimation>
          <TypingAnimation>npm install database-skills</TypingAnimation>

          <AnimatedSpan className="text-green-500">✔ MongoDB</AnimatedSpan>
          <AnimatedSpan className="text-green-500">✔ PostgreSQL</AnimatedSpan>

          <TypingAnimation> </TypingAnimation>
          <TypingAnimation>
            ✓ All required skills loaded successfully...
          </TypingAnimation>

          <TypingAnimation className="text-yellow-500">
            🚀 Ready to deploy in your team.
          </TypingAnimation>
        </Terminal>
      </div>
    </div>
  );
}
