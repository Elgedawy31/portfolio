import { motion } from "framer-motion";
import starSvg from "@/assets/star.svg";

const marqueeTexts = [
  "Engineering with purpose",
  "Leading through code",
  "Scaling what matters",
  "Tech made reliable",
  "Solving the hard parts",
  "Building for impact",
  "Driving teams forward"
];

function HeroMarquee() {
  // Create the marquee content with stars between text items
  const marqueeContent: React.ReactNode[] = [];
  marqueeTexts.forEach((text, index) => {
    marqueeContent.push(
      <span key={`text-${index}`} className="text-white text-lg font-medium whitespace-nowrap">
        {text}
      </span>
    );
    if (index < marqueeTexts.length - 1) {
      marqueeContent.push(
        <img 
          key={`star-${index}`} 
          src={starSvg} 
          alt="star" 
          className="inline-block mx-4 shrink-0 w-[18px] h-[18px]"
        />
      );
    }
  });

  return (
    <div className="relative -top-10 overflow-hidden">
      {/* Marquee container */}
      <motion.div
        className="flex items-center whitespace-nowrap"
        animate={{
          x: ["0%", "-50%"]
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 3,
          ease: "linear",
        }}
      >
        {/* First set */}
        <div className="flex items-center gap-0">
          {marqueeContent}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex items-center gap-0">
          {marqueeContent}
        </div>
      </motion.div>
    </div>
  );
}

export default HeroMarquee;
