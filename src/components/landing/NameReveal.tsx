import { motion } from "framer-motion";

interface NameRevealProps {
  name: string;
}

export default function NameReveal({ name }: NameRevealProps) {
  return (
    <div className="relative z-20 flex flex-col items-center">
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <svg
          viewBox="0 0 500 120"
          className="h-auto w-[80vw] max-w-lg md:w-[50vw]"
        >
          {/* Stroke animation */}
          <motion.text
            x="250"
            y="80"
            textAnchor="middle"
            className="fill-none stroke-primary"
            style={{
              fontFamily: "Great Vibes, cursive",
              fontSize: "72px",
              fontWeight: 700,
              strokeWidth: 1.5,
            }}
            initial={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ delay: 0.8, duration: 2.5, ease: "easeInOut" }}
          >
            {name}
          </motion.text>

          {/* Fill reveal */}
          <motion.text
            x="250"
            y="80"
            textAnchor="middle"
            style={{
              fontFamily: "Great Vibes, cursive",
              fontSize: "72px",
              fontWeight: 700,
            }}
            className="fill-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 0.8 }}
          >
            {name}
          </motion.text>
        </svg>

        {/* Sparkle decorations */}
        <motion.span
          className="absolute -right-4 -top-2 text-2xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.2, type: "spring" as const }}
        >
          ✨
        </motion.span>
        <motion.span
          className="absolute -left-4 bottom-0 text-xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.5, type: "spring" as const }}
        >
          💖
        </motion.span>
      </motion.div>
    </div>
  );
}
