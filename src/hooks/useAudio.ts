import { useState, useEffect, useRef, useCallback } from "react";
import { Howl } from "howler";

export function useAudio(src: string, autoplay = false) {
  const [isPlaying, setIsPlaying] = useState(false);
  const howlRef = useRef<Howl | null>(null);
  const hasAutoPlayed = useRef(false);
  const isLoaded = useRef(false);

  useEffect(() => {
    const howl = new Howl({
      src: [src],
      loop: true,
      volume: 0,
      preload: true,
      onload: () => {
        isLoaded.current = true;
      },
      onplayerror: () => {
        // Browser blocked playback — unlock and retry
        howl.once("unlock", () => {
          howl.play();
        });
      },
    });
    howlRef.current = howl;

    return () => {
      howl.unload();
    };
  }, [src]);

  // Autoplay: start music on first user gesture (click/touch)
  useEffect(() => {
    if (!autoplay) return;

    const tryPlay = () => {
      if (hasAutoPlayed.current || !howlRef.current) return;
      hasAutoPlayed.current = true;

      const howl = howlRef.current;
      howl.play();
      howl.fade(0, 0.5, 1500);
      setIsPlaying(true);

      // Remove all listeners
      cleanup();
    };

    const cleanup = () => {
      document.removeEventListener("click", tryPlay, true);
      document.removeEventListener("touchstart", tryPlay, true);
      document.removeEventListener("pointerdown", tryPlay, true);
    };

    // Use capturing phase to catch any click on the page
    document.addEventListener("click", tryPlay, true);
    document.addEventListener("touchstart", tryPlay, true);
    document.addEventListener("pointerdown", tryPlay, true);

    return cleanup;
  }, [autoplay]);

  const toggle = useCallback(() => {
    if (!howlRef.current) return;

    if (isPlaying) {
      howlRef.current.fade(0.5, 0, 500);
      setTimeout(() => howlRef.current?.pause(), 500);
      setIsPlaying(false);
    } else {
      howlRef.current.play();
      howlRef.current.fade(0, 0.5, 500);
      setIsPlaying(true);
    }
  }, [isPlaying]);

  return { isPlaying, toggle };
}
