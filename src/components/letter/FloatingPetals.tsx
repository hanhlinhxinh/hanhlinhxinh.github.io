import { useMemo } from "react";

export default function FloatingPetals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 8}s`,
        duration: `${7 + Math.random() * 6}s`,
        size: 14 + Math.random() * 10,
        emoji: ["🌸", "🩷", "💮", "🌷"][Math.floor(Math.random() * 4)],
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal absolute"
          style={{
            left: p.left,
            top: "-5%",
            fontSize: `${p.size}px`,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: 0.5,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
