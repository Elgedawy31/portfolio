import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Motion } from "@/motion/Motion"
import { useProfile } from "@/stores/ProfileContext"
import { useIntro } from "@/stores/IntroContext"
import { motionTokens } from "@/motion/tokens"
import meSvg from "@/assets/banner/me.svg"

function Hero() {
  const { profile } = useProfile()
  const { isIntroFinished, isHeroAnimationFinished, setHeroAnimationFinished } = useIntro()
  const [imageError, setImageError] = useState(false)
  const [showText, setShowText] = useState(true)
  const [startImageSlide, setStartImageSlide] = useState(false)
  const profileImageUrl = profile?.profileImage?.url || profile?.profileImage?.secureUrl
  const fullName = profile?.firstName && profile?.lastName 
    ? `${profile.firstName} ${profile.lastName}` 
    : ''
  
  // Determine which image to use
  const imageSrc = (profileImageUrl && !imageError) ? profileImageUrl : meSvg

  // First: Show hero text and image, then notify header can appear
  useEffect(() => {
    if (isIntroFinished) {
      // Wait for hero content to appear (fade in animation)
      const timer = setTimeout(() => {
        setHeroAnimationFinished(true)
      }, motionTokens.duration.normal * 1000) // Wait for fade in to complete
      
      return () => clearTimeout(timer)
    }
  }, [isIntroFinished, setHeroAnimationFinished])

  // Second: After header is fully visible, hide text and slide image
  useEffect(() => {
    if (isHeroAnimationFinished) {
      // Wait for header fadeDown animation to complete + buffer
      // Header uses fadeDown with normal duration (600ms) + 300ms buffer
      const timer = setTimeout(() => {
        setShowText(false)
        setStartImageSlide(true)
      }, motionTokens.duration.normal * 1000 + 300)
      
      return () => clearTimeout(timer)
    }
  }, [isHeroAnimationFinished])

  return (
    <div className="relative min-h-screen overflow-hidden pt-44 px-4">
      {/* Centered image and text - appears when intro finishes */}
      {isIntroFinished && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-40 pointer-events-none">
          {/* Text - fades down, then hides after 300ms */}
          {showText && (
            <Motion show={isIntroFinished} variant="fadeDown" className="mb-4">
              <h2 className="text-white text-2xl font-bold uppercase">
                GET WHAT YOU NEED
              </h2>
            </Motion>
          )}
          
          {/* Image - fades in, then slides right after 300ms */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: isIntroFinished ? 1 : 0,
              x: startImageSlide ? 200 : 0,
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
            }}
            className=""
          >
            <img
              src={imageSrc}
              alt={fullName || "Profile"}
              className="w-[163px] h-[216px] object-cover rounded-xl"
              onError={() => setImageError(true)}
            />
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Hero
