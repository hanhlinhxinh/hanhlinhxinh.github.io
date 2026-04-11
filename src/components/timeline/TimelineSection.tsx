import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { photos } from "../../data/photos";
import { messages } from "../../data/messages";
import TimelineItem from "./TimelineItem";

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden py-20"
      style={{
        background: "linear-gradient(180deg, #FFFAFC 0%, #F8F0FF 30%, #FFF5F0 70%, #FFFAFC 100%)",
      }}
    >
      {/* Blobs */}
      <div className="blob absolute left-0 top-1/4 h-72 w-72 bg-sky" />
      <div className="blob absolute bottom-1/4 right-0 h-64 w-64 bg-peach-light" />

      {/* Title */}
      <motion.h2
        className="text-shimmer relative z-10 mb-16 text-center text-4xl font-bold md:text-5xl"
        style={{ fontFamily: "var(--font-heading)" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        From a little girl to my whole world.
      </motion.h2>

      <div className="relative mx-auto w-full max-w-7xl px-8 md:px-16 lg:px-24">
        {/* Vertical line (desktop only) */}
        <div className="absolute left-1/2 hidden h-full w-px -translate-x-1/2 bg-primary-light/40 md:block">
          <motion.div
            className="w-full bg-gradient-to-b from-primary via-secondary to-accent"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Timeline items */}
        <div className="flex flex-col gap-20 md:gap-28">
          {photos.map((photo, i) => (
            <TimelineItem
              key={photo.id}
              src={photo.src}
              alt={photo.alt}
              message={messages.photoMessages[i]}
              index={i}
              isLeft={i % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
