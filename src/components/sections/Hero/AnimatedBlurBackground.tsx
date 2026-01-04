import { motion } from "framer-motion";

function AnimatedBlurBackground() {
  return (
    <motion.div
      className="absolute top-0 w-40 h-40 bg-white/50 left-[25%] z-50"
      style={{ filter: 'blur(5.375rem)' }}
      animate={{
        width: [160, 200, 160], // 160px -> 200px -> 160px (w-40 -> w-50 -> w-40)
        height: [160, 200, 160], // 160px -> 200px -> 160px (h-40 -> h-50 -> h-40)
        left: ["25%", "30%", "25%"], // Move slightly right and back
        top: [0, 20, 0], // Move down slightly and back
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: [0.42, 0, 0.58, 1.0], // Custom cubic-bezier ease
        times: [0, 0.5, 1], // Control timing of keyframes
      }}
    />
  );
}

export default AnimatedBlurBackground;
