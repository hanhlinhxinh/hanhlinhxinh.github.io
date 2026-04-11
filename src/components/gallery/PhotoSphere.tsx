import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import type { Photo } from "../../data/photos";

interface PhotoSphereProps {
  photos: Photo[];
  selectedPhoto: number | null;
  onSelect: (id: number | null) => void;
}

export default function PhotoSphere({ photos, onSelect }: PhotoSphereProps) {
  const [rotationY, setRotationY] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartRotation, setDragStartRotation] = useState(0);

  const total = photos.length;
  const angleStep = 360 / total;
  const radius = 460;

  // Auto-rotate with requestAnimationFrame
  useEffect(() => {
    if (isPaused || isDragging) return;
    let rafId: number;
    const tick = () => {
      setRotationY((r) => r + 0.15);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPaused, isDragging]);

  // Drag to rotate
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      setDragStartX(e.clientX);
      setDragStartRotation(rotationY);
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [rotationY]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const delta = e.clientX - dragStartX;
      setRotationY(dragStartRotation + delta * 0.3);
    },
    [isDragging, dragStartX, dragStartRotation]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div
      className="relative flex h-full items-center justify-center"
      style={{ perspective: "1600px" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setIsDragging(false);
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Twinkling stars */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor:
                i % 3 === 0
                  ? "var(--color-primary-light)"
                  : i % 3 === 1
                    ? "var(--color-secondary-light)"
                    : "var(--color-accent-light)",
            }}
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* 3D Carousel — outer div rotates, each child is positioned via rotateY+translateZ */}
      <div
        style={{
          width: "320px",
          height: "420px",
          position: "relative",
          transformStyle: "preserve-3d",
          transform: `rotateY(${rotationY}deg)`,
        }}
      >
        {photos.map((photo, i) => {
          // Calculate facing angle for opacity
          const itemAngle =
            (((rotationY + i * angleStep) % 360) + 360) % 360;
          const facingAngle = itemAngle > 180 ? 360 - itemAngle : itemAngle;
          const opacity =
            facingAngle < 100 ? 1 : Math.max(0.05, 1 - (facingAngle - 100) / 60);

          return (
            // OUTER div: handles 3D position — regular div, NOT motion.div
            <div
              key={photo.id}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                transform: `rotateY(${i * angleStep}deg) translateZ(${radius}px)`,
                opacity,
                cursor: "pointer",
              }}
            >
              {/* INNER motion.div: handles hover animation only */}
              <motion.div
                className="h-full w-full overflow-hidden rounded-2xl"
                style={{
                  boxShadow:
                    "0 8px 32px rgba(212, 120, 156, 0.2), 0 2px 12px rgba(184, 160, 216, 0.12), 0 0 0 0.5px rgba(255, 255, 255, 0.08) inset",
                }}
                whileHover={{
                  scale: 1.08,
                  boxShadow:
                    "0 16px 48px rgba(212, 120, 156, 0.4), 0 4px 20px rgba(184, 160, 216, 0.3), 0 0 80px rgba(212, 120, 156, 0.15)",
                }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
                onClick={(e) => {
                  if (!isDragging) {
                    e.stopPropagation();
                    onSelect(i);
                  }
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
                {/* Soft gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
