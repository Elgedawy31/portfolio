import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Motion } from "@/motion/Motion";
import introBg from "@/assets/intro-bg.svg";
import coverSvg from "@/assets/cover.svg";

const words = ["GET", "WHAT", "YOU", "NEED"];

const WORD_DELAY = 500; // Delay before word appears after position change starts

function IntroSpotlight() {
  const [displayedWords, setDisplayedWords] = useState<string[]>([]);
  const [wordsToAnimate, setWordsToAnimate] = useState<Set<string>>(new Set());
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
    const wordTimeouts: ReturnType<typeof setTimeout>[] = [];

    // Process word with position change and animation
    const processWord = (currentIndex: number) => {
      // Change background position to the position for this word
      setBackgroundPosition(positions[currentIndex]);
      
      // Add word to state immediately (but keep it hidden)
      setDisplayedWords((prev) => {
        if (prev.length < words.length && !prev.includes(words[currentIndex])) {
          return [...prev, words[currentIndex]];
        }
        return prev;
      });
      
      // Trigger animation after WORD_DELAY
      const wordTimeout = setTimeout(() => {
        setWordsToAnimate((prev) => {
          const newSet = new Set(prev);
          newSet.add(words[currentIndex]);
          return newSet;
        });
      }, WORD_DELAY);
      
      wordTimeouts.push(wordTimeout);
    };

    // Start processing words after initial delay, starting from first position
    const interval = setInterval(() => {
      const currentIndex = index; // Capture current index
      processWord(currentIndex);
      
      // Check if this is the last position
      if (currentIndex === positions.length - 1) {
        // Hide component after showing the last position
        setTimeout(() => {
          setIsVisible(false);
        }, 1000); // Wait for the transition to complete
        clearInterval(interval);
      } else {
        index = index + 1;
      }
    }, 1000); // Interval between position changes

    return () => {
      clearInterval(interval);
      wordTimeouts.forEach((timeout) => clearTimeout(timeout));
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
      <div className="absolute top-32 left-1/2 transform -translate-x-1/2 z-50 pt-8 sm:pt-12 md:pt-16 pointer-events-none">
        <h1 className="text-white text-[20px] font-extrabold uppercase tracking-wide flex items-center justify-center flex-wrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {displayedWords.map((word, index) => (
            <Motion
              key={`${word}-${index}`}
              variant="fadeIn"
              show={wordsToAnimate.has(word)}
              duration="normal"
              className="inline-block whitespace-nowrap"
            >
              {word || "\u00A0"}
              {index < displayedWords.length - 1 && "\u00A0"}
            </Motion>
          ))}
        </h1>
      </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default IntroSpotlight;
