import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { messages } from "../../data/messages";
import FloatingPetals from "./FloatingPetals";

export default function LetterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const lines = messages.letterBody.split("\n").filter((l) => l.trim());

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] overflow-hidden bg-surface py-20"
    >
      {/* Parallax gradient bg */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          y: bgY,
          background: "linear-gradient(180deg, #FFF5F9 0%, #F3E8FF 50%, #FFFAFC 100%)",
        }}
      />

      {/* Decorative blobs */}
      <div className="blob absolute left-10 top-40 h-48 w-48 bg-peach-light" />
      <div className="blob absolute bottom-20 right-10 h-56 w-56 bg-secondary-light" />

      <FloatingPetals />

      <div className="relative z-10 mx-auto max-w-3xl px-4 md:px-8 lg:px-0">
        {/* Title */}
        <motion.h2
          className="mb-12 text-center text-4xl font-bold text-primary md:text-5xl"
          style={{ fontFamily: "var(--font-heading)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Letter to My Darling
        </motion.h2>

        {/* Letter card — glass morphism */}
        <motion.div
          className="glass-card rounded-3xl p-6 sm:p-8 md:p-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {lines.map((line, i) => (
            <motion.p
              key={i}
              className={`mb-5 leading-loose ${
                line.startsWith("Happy") || line.startsWith("Yeu")
                  ? "text-lg font-medium text-primary"
                  : "text-text"
              } ${line.startsWith("Anh cua") ? "text-right italic text-text-muted" : ""}`}
              style={{
                fontFamily: line.startsWith("Happy")
                  ? "var(--font-heading)"
                  : "var(--font-body)",
              }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
