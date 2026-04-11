import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Soft background blobs */}
          <div className="blob absolute left-1/4 top-1/3 h-64 w-64 bg-primary-light" />
          <div className="blob absolute bottom-1/3 right-1/4 h-48 w-48 bg-secondary-light" />

          {/* Pulsing heart */}
          <motion.div
            className="relative z-10 text-6xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            💖
          </motion.div>

          {/* Loading text */}
          <motion.p
            className="relative z-10 mt-6 text-lg tracking-widest text-primary"
            style={{ fontFamily: "var(--font-heading)" }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Love Loading...
          </motion.p>

          {/* Progress bar with trailing heart */}
          <div className="relative z-10 mt-4 h-1.5 w-56 rounded-full bg-primary-light/30">
            <motion.div
              className="relative h-full overflow-visible rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
              style={{ boxShadow: "0 0 12px rgba(212,120,156,0.5)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              {/* Heart at the leading edge */}
              <motion.span
                className="absolute -top-2.5 right-0 translate-x-1/2 text-sm"
                style={{ filter: "drop-shadow(0 0 6px rgba(212,120,156,0.6))" }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
              >
                💗
              </motion.span>
            </motion.div>
            {/* Sparkle trail particles */}
            {[...Array(3)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute top-1/2 text-[8px]"
                style={{ left: `${20 + i * 25}%` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0], y: [0, -14, -22], scale: [0.5, 1, 0.3] }}
                transition={{ duration: 1.2, delay: 0.6 + i * 0.4, repeat: Infinity }}
              >
                ✨
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
