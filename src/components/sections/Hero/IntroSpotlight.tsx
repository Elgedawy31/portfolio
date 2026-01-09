import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import introBg from "@/assets/intro-bg.svg";
import coverSvg from "@/assets/cover.svg";

const words = ["GET", "WHAT", "YOU", "NEED"];

const WORD_DELAY = 800; // Increased from 500ms

function IntroSpotlight() {
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const [backgroundPosition, setBackgroundPosition] = useState("50% 50%");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Background positions as percentages - like a camera panning
    // These positions will show different parts of the larger background
    const positions = [
      "63% 108%",
      "30% 43%",
      "17% -48%",
      "31% 108%",
    ];

    let index = 0;

    const interval = setInterval(() => {
      setBackgroundPosition(positions[index]);
      
      // Check if this is the last position
      if (index === positions.length - 1) {
        // Hide component after showing the last position
        setTimeout(() => {
          setIsVisible(false);
        }, 1000); // Wait for the transition to complete
        clearInterval(interval);
      } else {
        index = index + 1;
      }
    }, 1000); // Increased from 500ms

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const wordTimers = words.map((word, index) => {
      return setTimeout(() => {
        setDisplayedWords((prev) => [...prev, word]);
      }, (index + 1) * WORD_DELAY); // Increased delay between each word
    });

    return () => {
      wordTimers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro-spotlight"
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.42, 0, 0.58, 1.0],
          }}
          className="absolute w-full h-screen max-h-screen overflow-hidden"
        >
      {/* Background layer - intro-bg.svg */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          willChange: "background-position",
          transform: "translateZ(0)", // GPU acceleration
        }}
      >
        <motion.div
          className="w-full h-full"
          animate={{
            backgroundPosition: backgroundPosition,
          }}
          transition={{
            duration: 0.9, // Increased from 0.45s
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `url(${introBg})`,
            backgroundSize: "1000px auto", // Large background, auto height to maintain aspect ratio
            backgroundRepeat: "no-repeat",
            backgroundPosition: backgroundPosition,
            scale:2 
          }}
        />
      </div>

      {/* Blurred overlay - covers everything except center circle */}
      <div
        className="absolute inset-0 w-full h-full z-5 backdrop-blur-xs"
        style={{
          willChange: "transform",
          transform: "translateZ(0)", // GPU acceleration
          maskImage:
            "radial-gradient(circle 103px at 50% 50%, transparent 0%, transparent 99.9%, black 100%)",
          WebkitMaskImage:
            "radial-gradient(circle 103px at 50% 50%, transparent 0%, transparent 99.9%, black 100%)",
        }}
      />

      {/* Foreground layer - cover.svg */}
      <div
        className="absolute inset-0 w-full h-full z-10"
        style={{
          willChange: "transform",
          transform: "translateZ(0)", // GPU acceleration
        }}
      >
        <img
          src={coverSvg}
          alt="Cover overlay"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Animated text - top center */}
      <div className="absolute top-32 left-1/2 transform -translate-x-1/2 z-20 pt-8 sm:pt-12 md:pt-16">
        <h1 className="text-white text-[20px] font-extrabold uppercase tracking-wide flex items-center justify-center flex-wrap">
          {displayedWords.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8, // Increased from 0.4s
                ease: [0.42, 0, 0.58, 1.0],
                layout: {
                  duration: 0.6, // Increased from 0.3s
                  ease: [0.42, 0, 0.58, 1.0],
                },
              }}
              className="inline-block whitespace-nowrap"
            >
              {word}
              {index < displayedWords.length - 1 && "\u00A0"}
            </motion.span>
          ))}
        </h1>
      </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default IntroSpotlight;
