import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function NameAnimation() {
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    // Start animation after CreateYour, Feature, WithMe animations complete (1200ms)
    const timer = setTimeout(() => {
      setShowName(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const text = "I'M AHMED ROYALE";
  const letters = text.split("");

  return (
    <div 
      className="absolute left-4 top-[112px] sm:left-4 sm:top-[112px] md:left-4 md:top-[112px]"
    >
      <h1 
        className="text-3xl font-bold uppercase text-white leading-tight flex flex-wrap"
        style={{
          fontFamily: 'Montserrat, sans-serif',
          fontWeight: 800,
        }}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={showName ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{
              duration: 0.5,
              delay: index * 0.05, // 50ms delay between each letter
              ease: [0.42, 0, 0.58, 1.0],
            }}
            className="inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </h1>
    </div>
  );
}

export default NameAnimation;

