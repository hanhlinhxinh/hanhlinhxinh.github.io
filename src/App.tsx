import { useState, useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";
import LandingSection from "./components/landing/LandingSection";
import GallerySection from "./components/gallery/GallerySection";
import LetterSection from "./components/letter/LetterSection";
import TimelineSection from "./components/timeline/TimelineSection";
import FinaleSection from "./components/finale/FinaleSection";
import MusicToggle from "./components/MusicToggle";
import { useAudio } from "./hooks/useAudio";
import { photos } from "./data/photos";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { isPlaying, toggle } = useAudio("./audio/birthday-song.mp3", true);

  useEffect(() => {
    const promises = photos.map(
      (photo) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => resolve();
          img.src = photo.src;
        })
    );

    Promise.all(promises).then(() => {
      setTimeout(() => setIsLoading(false), 2000);
    });
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />

      {!isLoading && (
        <>
          <LandingSection />
          <GallerySection />
          <LetterSection />
          <TimelineSection />
          <FinaleSection />
          <MusicToggle isPlaying={isPlaying} onToggle={toggle} />
        </>
      )}
    </>
  );
}

export default App;
