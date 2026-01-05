import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroSpotlightProps {
  backgroundImage: string;
  words: string[];
  positions: Array<{ x: number; y: number }>;
  spotlightSize?: number;
  runOnce?: boolean;
  stepDuration?: number;
}

const DEFAULT_SPOTLIGHT_SIZE = 130;
const DEFAULT_STEP_DURATION = 1.0;
const FADE_OUT_DURATION = 0.8;

function IntroSpotlight({
  backgroundImage,
  words,
  positions,
  spotlightSize = DEFAULT_SPOTLIGHT_SIZE,
  runOnce = true,
  stepDuration = DEFAULT_STEP_DURATION,
}: IntroSpotlightProps) {
  const [shouldShow, setShouldShow] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check prefers-reduced-motion on mount
  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    // Always show on mount (removed sessionStorage check for refresh behavior)
    setShouldShow(true);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  // Animation sequence
  useEffect(() => {
    if (!shouldShow) {
      return;
    }

    // If reduced motion, skip animation immediately
    if (isReducedMotion) {
      setOverlayOpacity(0);
      setTimeout(() => {
        setShouldShow(false);
      }, 100);
      return;
    }

    // Ensure words and positions arrays match
    const totalSteps = Math.min(words.length, positions.length);
    if (totalSteps === 0) {
      setShouldShow(false);
      return;
    }

    let stepIndex = 0;
    setCurrentStep(0);

    const stepInterval = setInterval(() => {
      stepIndex++;
      
      if (stepIndex < totalSteps) {
        setCurrentStep(stepIndex);
      } else {
        // All steps complete, fade out
        clearInterval(stepInterval);
        setOverlayOpacity(0);
        
        // After fade-out completes, hide component
        setTimeout(() => {
          setShouldShow(false);
        }, FADE_OUT_DURATION * 1000);
      }
    }, stepDuration * 1000);

    return () => clearInterval(stepInterval);
  }, [shouldShow, isReducedMotion, words.length, positions.length, stepDuration, runOnce]);

  // Don't render if should not show
  if (!shouldShow) {
    return null;
  }

  const currentPosition = positions[currentStep] || positions[0];
  const currentWord = words[currentStep] || words[0];

  // Spotlight is always centered at 50%, 50%
  const spotlightX = 50;
  const spotlightY = 50;

  // Create mask gradient for spotlight effect - spotlight stays centered
  // The mask makes the spotlight area transparent (revealing background) and rest opaque (dark)
  const innerRadius = spotlightSize * 0.7;
  const outerRadius = spotlightSize;
  const maskGradient = `radial-gradient(circle ${outerRadius}px at ${spotlightX}% ${spotlightY}%, transparent ${innerRadius}px, black ${outerRadius}px)`;

  return (
    <motion.div
      className="absolute inset-0 z-50 pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: overlayOpacity }}
      transition={{ duration: FADE_OUT_DURATION, ease: "easeInOut" }}
    >
      {/* Background image layer - position animates smoothly */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        animate={{
          backgroundPosition: `${currentPosition.x}% ${currentPosition.y}%`,
        }}
        transition={{
          duration: stepDuration * 0.6,
          ease: "easeInOut",
        }}
      />

      {/* Blurred background layer outside spotlight */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          maskImage: maskGradient,
          WebkitMaskImage: maskGradient,
          maskSize: "cover",
          WebkitMaskSize: "cover",
        }}
      />

      {/* Dark overlay with mask - mask reveals spotlight area (always centered) */}
      <div
        className="absolute inset-0 bg-black/85"
        style={{
          maskImage: maskGradient,
          WebkitMaskImage: maskGradient,
          maskSize: "cover",
          WebkitMaskSize: "cover",
        }}
      />

      {/* Text overlay at spotlight center (always centered) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          className="absolute flex items-center justify-center"
          style={{
            left: `${spotlightX}%`,
            top: `${spotlightY}%`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
        >
          <h2 className="text-7xl font-bold text-white uppercase tracking-wider whitespace-nowrap drop-shadow-2xl">
            {currentWord}
          </h2>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default IntroSpotlight;

