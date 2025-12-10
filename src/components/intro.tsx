import { useRef, useState } from "react";


import "./intro.css";

interface IntroProps {
  onFinish: () => void;
}

const Intro: React.FC<IntroProps> = ({ onFinish }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    if (isExiting) return;
    setIsExiting(true);

    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.volume = 1;
      audio.play().catch(() => {}).finally(() => {
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
        className="intro-video"
        src="/video/Rolls_Royce.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="intro-overlay" />

      <div className="intro-content">
        <p className="intro-tag">WELCOME TO MY PORTFOLIO</p>

        <h1 className="intro-heading">
          <span className="intro-heading-main">SAI HARSHITH</span>
          <span className="intro-heading-last">MOLUGURI</span>
        </h1>

        <p className="intro-role">
          Web Developer · AI/ML Engineer · Creator
        </p>

        <button
          className="intro-cta"
          onClick={handleEnter}
          disabled={isExiting}
        >
          {isExiting ? "Loading..." : "Enter Portfolio"}
        </button>
      </div>

      <audio ref={audioRef} preload="auto" src="/audio/netflix-sound.mp3" />
    </div>
  );
};

export default Intro;
