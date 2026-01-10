import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { motionTokens } from "@/motion/tokens"

interface HeroImageProps {
  imageSrc: string
  alt: string
  isIntroFinished: boolean
  startImageSlide: boolean
  onImageError: () => void
}

function HeroImage({
  imageSrc,
  alt,
  isIntroFinished,
  startImageSlide,
  onImageError,
}: HeroImageProps) {
  const imageRef = useRef<HTMLDivElement>(null)
  const [slideDistance, setSlideDistance] = useState(0)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  // Calculate slide distance and check screen size
  useEffect(() => {
    const calculateSlideDistance = () => {
      const imageWidth = 163 // Image width in pixels
      const padding = 16 // 1rem = 16px spacing from right
      const viewportWidth = window.innerWidth
      // Distance from center to right edge with padding
      const distance = (viewportWidth / 2) - (imageWidth / 2) - padding
      setSlideDistance(distance)
      
      // Check if screen width is less than 400px
      setIsSmallScreen(viewportWidth < 400)
    }

    calculateSlideDistance()
    window.addEventListener('resize', calculateSlideDistance)
    
    return () => window.removeEventListener('resize', calculateSlideDistance)
  }, [])

  return (
    <motion.div
      ref={imageRef}
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{
        opacity: isIntroFinished ? 1 : 0,
        x: startImageSlide ? slideDistance : 0,
        y: startImageSlide ? -100 : 0,
      }}
      transition={{
        opacity: {
          duration: motionTokens.duration.normal,
          ease: [0.42, 0, 0.58, 1.0],
        },
        x: {
          duration: motionTokens.duration.normal,
          ease: [0.42, 0, 0.58, 1.0],
          delay: startImageSlide ? 0 : 0,
        },
        y: {
          duration: motionTokens.duration.normal,
          ease: [0.42, 0, 0.58, 1.0],
          delay: startImageSlide ? 0 : 0,
        },
      }}
      className={`relative inline-block ${isSmallScreen ? 'mt-8' : 'mt-4'}`}
    >
      <img
        src={imageSrc}
        alt={alt}
        className="w-[163px] h-[216px] object-cover rounded-xl"
        onError={onImageError}
      />
    </motion.div>
  )
}

export default HeroImage

