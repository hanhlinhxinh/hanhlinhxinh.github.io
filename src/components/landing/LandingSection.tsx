import { motion } from "framer-motion";
import { messages } from "../../data/messages";
import NameReveal from "./NameReveal";
import ParticleBackground from "../ParticleBackground";
import ScrollIndicator from "../ScrollIndicator";

const letterVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 3 + i * 0.08, type: "spring" as const, stiffness: 100 },
  }),
};

export default function LandingSection() {
  const subtitle = messages.landingSubtitle;

  return (
    <section className="mesh-gradient relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden">
      <ParticleBackground />

      {/* Soft decorative blobs */}
      <div className="blob absolute -left-32 -top-32 h-80 w-80 bg-primary-light" />
      <div className="blob absolute -bottom-32 -right-32 h-72 w-72 bg-secondary-light" />
      <div className="blob absolute right-1/4 top-1/4 h-48 w-48 bg-peach-light" />

      {/* Name reveal */}
      <NameReveal name={messages.heroName} />

      {/* Subtitle with staggered letters */}
      <div className="z-20 mt-8 flex flex-wrap justify-center gap-1 px-4">
        {subtitle.split("").map((char, i) => (
          <motion.span
            key={i}
            className="text-xl font-light tracking-wide text-text-muted md:text-2xl"
            style={{ fontFamily: "var(--font-body)" }}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={letterVariants}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>

      {/* Date */}
      <motion.p
        className="z-20 mt-4 text-lg text-accent"
        style={{ fontFamily: "var(--font-heading)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5, duration: 1 }}
      >
        {messages.birthday}
      </motion.p>

      <ScrollIndicator />
    </section>
  );
}
