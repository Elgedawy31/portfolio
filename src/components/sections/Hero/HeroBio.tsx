import { motion } from "framer-motion"
import { Motion } from "@/motion/Motion"
import { motionTokens } from "@/motion/tokens"

interface HeroBioProps {
  bio: string
  showBio: boolean
  startImageSlide: boolean
}

function HeroBio({ bio, showBio, startImageSlide }: HeroBioProps) {
  if (!showBio || !bio) return null

  return (
    <motion.div
      animate={{
        y: startImageSlide ? -100 : 0,
      }}
      transition={{
        y: {
          duration: motionTokens.duration.normal,
          ease: [0.42, 0, 0.58, 1.0],
          delay: startImageSlide ? 0 : 0,
        },
      }}
      className="absolute left-4 top-1/2 -translate-y-1/2"
    >
      <Motion show={showBio} variant="fadeIn">
        <p className="text-white text-[14px] font-light h-[216px] overflow-hidden capitalize z-10 w-[45%]">
          {bio}
        </p>
      </Motion>
    </motion.div>
  )
}

export default HeroBio

