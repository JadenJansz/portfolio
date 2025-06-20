import { TypeAnimation } from "react-type-animation";

const description =
  "Hello! I am a Software Engineer based in Sri Lanka. Love to get my hands dirty building stunning User Interfaces and fullstack applications. Keen to work with experienced people and learn more each day. Wanna build something cool together?";

const sequence = description.split(" ").map((_, i) =>
  description
    .split(" ")
    .slice(0, i + 1)
    .join(" ")
);

export default function TypingIndicator() {
  return (
    <TypeAnimation
      sequence={sequence}
      className="font-light text-lg sm:text-xl md:text-2xl leading-8 md:leading-10 min-h-[200px]"
      speed={70}
    />
  );
}
