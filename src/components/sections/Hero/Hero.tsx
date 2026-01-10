import { useState, useEffect } from "react"
import { Motion } from "@/motion/Motion"
import { useProfile } from "@/stores/ProfileContext"
import { useIntro } from "@/stores/IntroContext"
import meSvg from "@/assets/banner/me.svg"

function Hero() {
  const { profile } = useProfile()
  const { isIntroFinished, setHeroAnimationFinished } = useIntro()
  const [imageError, setImageError] = useState(false)
  const profileImageUrl = profile?.profileImage?.url || profile?.profileImage?.secureUrl
  const fullName = profile?.firstName && profile?.lastName 
    ? `${profile.firstName} ${profile.lastName}` 
    : ''
  
  // Determine which image to use
  const imageSrc = (profileImageUrl && !imageError) ? profileImageUrl : meSvg

  // Notify when Hero animation is finished (after both name and image animations)
  useEffect(() => {
    if (isIntroFinished) {
      // Wait for both animations to complete (fadeDown for name + fadeIn for image)
      // Assuming normal duration is around 0.5-0.6s, wait a bit longer to be safe
      const timer = setTimeout(() => {
        setHeroAnimationFinished(true)
      }, 1000) // 1 second should be enough for both animations
      
      return () => clearTimeout(timer)
    }
  }, [isIntroFinished, setHeroAnimationFinished])

  return (
    <div className="relative min-h-screen overflow-hidden pt-44 px-4">
      {/* Centered image and text - appears when intro finishes */}
      {isIntroFinished && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-40 pointer-events-none">
          {/* Text - fades down */}
          <Motion show={isIntroFinished} variant="fadeDown" className="mb-4">
            <h2 className="text-white text-2xl font-bold uppercase">
              GET WHAT YOU NEED
            </h2>
          </Motion>
          
          {/* Image - fades in */}
          <Motion show={isIntroFinished} variant="fadeIn" className="">
            <img
              src={imageSrc}
              alt={fullName || "Profile"}
              className="w-[163px] h-[216px] object-cover rounded-xl"
              onError={() => setImageError(true)}
            />
          </Motion>
        </div>
      )}
    </div>
  )
}

export default Hero
