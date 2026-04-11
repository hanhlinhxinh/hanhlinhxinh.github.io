import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Photo } from "../../data/photos";

interface PhotoCardProps {
  photos: Photo[];
  messages: readonly string[];
  onSelect: (id: number) => void;
}

export default function PhotoCard({ photos, messages, onSelect }: PhotoCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) =>
    Math.abs(offset) * velocity;

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return photos.length - 1;
      if (next >= photos.length) return 0;
      return next;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      rotateZ: direction > 0 ? 15 : -15,
    }),
    center: { x: 0, opacity: 1, rotateZ: 0 },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      rotateZ: direction < 0 ? 15 : -15,
    }),
  };

  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <p className="mb-4 text-sm text-text-light">
        {currentIndex + 1} / {photos.length}
      </p>

      <div className="relative h-[45vh] w-72">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            className="glass-card-dark absolute inset-0 cursor-grab overflow-hidden rounded-2xl active:cursor-grabbing"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring" as const, stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) paginate(1);
              else if (swipe > swipeConfidenceThreshold) paginate(-1);
            }}
            onClick={() => onSelect(currentIndex)}
          >
            <img
              src={photos[currentIndex].src}
              alt={photos[currentIndex].alt}
              className="h-full w-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
              <p
                className="text-center text-lg text-white/90"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {messages[currentIndex]}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="mt-6 flex gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === currentIndex
                ? "w-6 bg-primary"
                : "w-2 bg-white/20 hover:bg-white/40"
            }`}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}
