import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Motion } from "@/motion/Motion";
import { useProfile } from "@/stores/ProfileContext";

function NameAnimation() {
  const { profile } = useProfile();
  const [showName, setShowName] = useState(false);
  const [showTitle, setShowTitle] = useState(false);

  const firstName = profile?.firstName || '';
  const lastName = profile?.lastName || '';
  const fullName = firstName && lastName ? `${firstName} ${lastName}` : '';
  const text = fullName ? `I'M ${fullName.toUpperCase()}` : "I'M";
  const letters = text.split("");

  // Split title by "&" for display
  const title = profile?.title || '';
  const titleParts = title ? title.split('&').map(part => part.trim()) : [];
  const titleFirstPart = titleParts[0] || '';
  const titleSecondPart = titleParts.length > 1 ? `& ${titleParts.slice(1).join(' & ')}` : '';

  useEffect(() => {
    // Start animation after CreateYour, Feature, WithMe animations complete (1200ms)
    const timer = setTimeout(() => {
      setShowName(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Show title after 1200ms
    const timer = setTimeout(() => {
      setShowTitle(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="absolute left-4 top-[112px] sm:left-4 sm:top-[112px] md:left-4 md:top-[112px]"
    >
      <h1 
        className="text-[36px] font-bold uppercase text-white leading-tight flex flex-wrap"
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
      
      {title && (
        <Motion show={showTitle} variant="fadeUp" className="">
          <div className="">
            {titleFirstPart && (
              <p className="text-[20px] text-[#8E8E93] uppercase tracking-wider leading-relaxed">
                {titleFirstPart}
              </p>
            )}
            {titleSecondPart && (
              <p className="text-[20px] text-[#8E8E93] uppercase tracking-wider">
                {titleSecondPart}
              </p>
            )}
          </div>
        </Motion>
      )}
    </div>
  );
}

export default NameAnimation;

