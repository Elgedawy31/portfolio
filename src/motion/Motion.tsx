// motion/Motion.tsx
import { motion } from "framer-motion";
import * as fade from "./variants/fade";
import * as slide from "./variants/slide";
import { motionTokens } from "./tokens";

const variantMap = {
  fadeUp: fade.fadeUp,
  fadeIn: fade.fadeIn,
  fadeDown: fade.fadeDown,
  slideLeft: slide.slideLeft,
};

type MotionProps = {
  show?: boolean;
  animateOnMount?: boolean;
  variant: keyof typeof variantMap;
  offset?: number;
  duration?: keyof typeof motionTokens.duration;
  delay?: number;
  className?: string;
  children?: React.ReactNode;
};

export function Motion({
  show,
  variant,
  offset,
  duration = "normal",
  delay = 0,
  className,
  children,
  animateOnMount,
}: MotionProps) {
  const animateProp = animateOnMount ? "visible" : show ? "visible" : "hidden";

  return (
    <motion.div
      variants={variantMap[variant](offset)}
      initial="hidden"
      animate={animateProp}
      transition={{
        duration: motionTokens.duration[duration],
        delay,
        ease: [0.42, 0, 0.58, 1.0],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
