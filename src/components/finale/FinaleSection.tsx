import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import confetti from "canvas-confetti";
import { messages } from "../../data/messages";

const letterVariants = {
  hidden: { y: 60, opacity: 0, rotateX: -90 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      delay: i * 0.06,
      type: "spring" as const,
      stiffness: 150,
      damping: 12,
    },
  }),
};

function fireConfetti() {
  const duration = 4000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ["#D4789C", "#E8B87D", "#B8A0D8", "#F9C6B0", "#C9F2FF"],
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ["#D4789C", "#E8B87D", "#B8A0D8", "#F9C6B0", "#C9F2FF"],
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

function fireFireworks() {
  const count = 5;
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      confetti({
        particleCount: 80,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: 0.2 + Math.random() * 0.6,
          y: 0.3 + Math.random() * 0.3,
        },
        colors: ["#D4789C", "#E8B87D", "#B8A0D8", "#F9C6B0", "#C9F2FF", "#FFE7DE"],
        ticks: 60,
        gravity: 0.8,
        scalar: 1.2,
        shapes: ["circle", "square"],
      });
    }, i * 600);
  }
}

export default function FinaleSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [hasFired, setHasFired] = useState(false);

  useEffect(() => {
    if (isInView && !hasFired) {
      setHasFired(true);
      fireConfetti();
      setTimeout(fireFireworks, 2000);
    }
  }, [isInView, hasFired]);

  const title = messages.finalWish;

  return (
    <section
      ref={ref}
      className="mesh-gradient relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="blob absolute left-1/4 top-1/4 h-72 w-72 bg-accent-light" />
      <div className="blob absolute bottom-1/4 right-1/4 h-64 w-64 bg-primary-light" />
      <div className="blob absolute right-1/3 top-1/3 h-48 w-48 bg-peach-light" />

      {/* Warm glow behind text */}
      <motion.div
        className="absolute h-96 w-96 rounded-full bg-accent-light"
        style={{ filter: "blur(100px)" }}
        animate={
          isInView ? { scale: [0, 1.5], opacity: [0, 0.5] } : {}
        }
        transition={{ duration: 2 }}
      />

      {/* Main title */}
      <div className="relative z-10 flex flex-wrap justify-center gap-1 px-4">
        {title.split("").map((char, i) => (
          <motion.span
            key={i}
            className="text-4xl font-bold text-primary md:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-hero)" }}
            custom={i}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={letterVariants}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>

      {/* Subtitle */}
      <motion.p
        className="relative z-10 mt-8 max-w-lg px-6 text-center text-lg leading-relaxed text-text-muted md:text-xl"
        style={{ fontFamily: "var(--font-body)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 2, duration: 1 }}
      >
        {messages.finalMessage}
      </motion.p>

      {/* Big heart */}
      <motion.div
        className="relative z-10 mt-8 text-6xl"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: [0, 1.3, 1] } : {}}
        transition={{ delay: 2.5, type: "spring" as const, stiffness: 200 }}
      >
        💖
      </motion.div>

      {/* Replay button */}
      <motion.button
        className="glass-card relative z-10 mt-12 rounded-full px-8 py-3 text-sm tracking-widest text-text-muted transition-colors hover:text-primary"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 3.5 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        
        Back to HomePage
      </motion.button>
    </section>
  );
}
