import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import heroBgV2 from "@/assets/hero-bg-v2.svg";
import coverSvg from "@/assets/cover.svg";

const words = ["GET", "WHAT", "YOU", "NEED"];

function IntroSpotlight() {
  const [visibleWords, setVisibleWords] = useState(0);

  useEffect(() => {
    const timers = words.map((_, index) => {
      return setTimeout(() => {
        setVisibleWords(index + 1);
      }, (index + 1) * 500); // 500ms delay between each word
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, []);

  return (
    <div className="absolute w-full h-screen max-h-screen overflow-hidden">
      {/* Background layer - hero-bg-v2.svg */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)', // GPU acceleration
        }}
      >
        <img 
          src={heroBgV2} 
          alt="Hero background" 
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      
      {/* Blurred overlay - covers everything except center circle */}
      <div 
        className="absolute inset-0 w-full h-full z-5 backdrop-blur-xs"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)', // GPU acceleration
          maskImage: 'radial-gradient(circle 103px at 50% 50%, transparent 0%, transparent 99.9%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle 103px at 50% 50%, transparent 0%, transparent 99.9%, black 100%)',
        }}
      />
      
      {/* Foreground layer - cover.svg */}
      <div 
        className="absolute inset-0 w-full h-full z-10"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)', // GPU acceleration
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
        <h1 className="text-white text-[20px]  font-bold uppercase text-center tracking-wide">
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: -20 }}
              animate={visibleWords > index ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{
                duration: 0.5,
                ease: [0.42, 0, 0.58, 1.0],
              }}
              className="inline-block"
            >
              {word}
              {index < words.length - 1 && "\u00A0"}
            </motion.span>
          ))}
        </h1>
      </div>
    </div>
  )
}

export default IntroSpotlight