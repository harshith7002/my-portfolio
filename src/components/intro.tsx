import { useRef, useState, useEffect } from "react";
import "./intro.css";

interface IntroProps {
  onFinish: () => void;
}

const Intro: React.FC<IntroProps> = ({ onFinish }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  // set CSS --vh for mobile fallback (1% of innerHeight)
  useEffect(() => {
    function setVh() {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    }
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  // try to play muted video on mount (safe because muted)
  useEffect(() => {
    const v = videoRef.current;
    if (v) {
      const p = v.play();
      if (p && typeof p.then === "function") {
        p.catch(() => {
          // ignore autoplay rejection; user will click Enter
        });
      }
    }
  }, []);

  const handleEnter = () => {
    if (isExiting) return;
    setIsExiting(true);

    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.volume = 1;
      audio
        .play()
        .catch(() => {})
        .finally(() => {
          setTimeout(onFinish, 900); // matches fade duration
        });
    } else {
      onFinish();
    }
  };

  return (
    <div className={`intro-root ${isExiting ? "fade-out" : ""}`}>
      {/* video */}
      <video
        ref={videoRef}
        className="intro-video"
        src="/video/Rolls_Royce.mp4"
        autoPlay
        muted
        loop
        playsInline
        // webkit-playsinline for older iOS webviews - React will pass it through
        webkit-playsinline="true"
        preload="metadata"
        poster="/video/poster.jpg"
        aria-hidden="true"
      />

      <div className="intro-overlay" />

      <div className="intro-content">
        <p className="intro-tag">WELCOME TO MY PORTFOLIO</p>

        <h1 className="intro-heading">
          <span className="intro-heading-main">SAI HARSHITH</span>
          <span className="intro-heading-last">MOLUGURI</span>
        </h1>

        <p className="intro-role"> Web Developer · APP Developer · AI-ML Enthusiast</p>

        <button className="intro-cta" onClick={handleEnter} disabled={isExiting}>
          {isExiting ? "Loading..." : "Enter Portfolio"}
        </button>
      </div>

      <audio ref={audioRef} preload="auto" src="/audio/netflix-sound.mp3" />
    </div>
  );
};

export default Intro;
