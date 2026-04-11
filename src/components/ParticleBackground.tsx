import { useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { tsParticles } from "@tsparticles/engine";
import type { ISourceOptions } from "@tsparticles/engine";

const particleOptions: ISourceOptions = {
  fullScreen: false,
  particles: {
    number: { value: 25, density: { enable: true } },
    color: { value: ["#D4789C", "#B8A0D8", "#E8B87D", "#F9C6B0", "#C9F2FF"] },
    shape: {
      type: "char",
      options: {
        char: [
          { value: "\u2764", font: "serif", weight: "400" },
          { value: "\u2728", font: "serif", weight: "400" },
          { value: "\u2B50", font: "serif", weight: "400" },
        ],
      },
    },
    opacity: {
      value: { min: 0.3, max: 0.7 },
      animation: { enable: true, speed: 0.5, startValue: "random" },
    },
    size: {
      value: { min: 8, max: 14 },
    },
    move: {
      enable: true,
      speed: { min: 0.3, max: 1 },
      direction: "none",
      outModes: { default: "out" },
      drift: 0.3,
    },
    wobble: {
      enable: true,
      distance: 12,
      speed: 4,
    },
  },
  detectRetina: true,
};

export default function ParticleBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadSlim(tsParticles).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="heart-particles"
      className="pointer-events-none absolute inset-0 z-10"
      options={particleOptions}
    />
  );
}
