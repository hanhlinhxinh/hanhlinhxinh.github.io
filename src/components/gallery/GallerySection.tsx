import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { photos } from "../../data/photos";
import { messages } from "../../data/messages";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import PhotoSphere from "./PhotoSphere";
import PhotoCard from "./PhotoCard";

export default function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section className="mesh-gradient-dark relative min-h-[100dvh] overflow-hidden py-16">
      {/* Decorative blobs */}
      <div className="blob absolute -left-10 top-20 h-80 w-80 bg-primary/15" />
      <div className="blob absolute -right-10 bottom-20 h-72 w-72 bg-secondary/12" />
      <div className="blob absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-accent/8" />

      {/* Section title */}
      <motion.h2
        className="text-shimmer relative z-10 mb-4 text-center text-4xl font-bold md:text-5xl"
        style={{ fontFamily: "var(--font-heading)" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Beautiful moments
      </motion.h2>

      <motion.p
        className="relative z-10 mb-6 text-center text-primary-light/70"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        {isMobile ? "Vuot de xem anh" : ""}
      </motion.p>

      {/* Gallery */}
      <div className="relative z-10 mx-auto h-[70vh] w-full">
        {isMobile ? (
          <PhotoCard
            photos={photos}
            messages={messages.photoMessages}
            onSelect={setSelectedPhoto}
          />
        ) : (
          <PhotoSphere
            photos={photos}
            selectedPhoto={selectedPhoto}
            onSelect={setSelectedPhoto}
          />
        )}
      </div>

      {/* Message below gallery */}
      <div className="relative z-10 mt-4 flex min-h-[3rem] items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {selectedPhoto !== null && (
            <motion.p
              key={selectedPhoto}
              className="text-center text-lg text-primary-light/80 md:text-xl"
              style={{ fontFamily: "var(--font-heading)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {messages.photoMessages[selectedPhoto]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Full-screen image overlay (image only, no message) */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.img
              src={photos[selectedPhoto].src}
              alt={photos[selectedPhoto].alt}
              className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring" as const, stiffness: 300, damping: 25 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
