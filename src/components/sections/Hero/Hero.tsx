import { useState, useEffect } from "react"
import { useProfile } from "@/stores/ProfileContext"
import { useIntro } from "@/stores/IntroContext"
import { motionTokens } from "@/motion/tokens"
import meSvg from "@/assets/banner/me.svg"
import HeroText from "./HeroText"
import HeroBio from "./HeroBio"
import HeroImage from "./HeroImage"
import HeroMarquee from "./HeroMarquee"
import NameAnimation from "./NameAnimation"
import AnimatedBlurBackground from "./AnimatedBlurBackground"
import LocationInfo from "./LocationInfo"

function Hero() {
  const { profile } = useProfile()
  const { isIntroFinished, isHeroAnimationFinished, setHeroAnimationFinished } = useIntro()
  const [imageError, setImageError] = useState(false)
  const [showText, setShowText] = useState(true)
  const [startImageSlide, setStartImageSlide] = useState(false)
  const [showBio, setShowBio] = useState(false)
  const profileImageUrl = profile?.profileImage?.url || profile?.profileImage?.secureUrl
  const fullName = profile?.firstName && profile?.lastName 
    ? `${profile.firstName} ${profile.lastName}` 
    : ''
  const bio = profile?.bio || ''
  
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

  // Third: After image slide completes, show bio
  useEffect(() => {
    if (startImageSlide && bio) {
      // Wait for image slide animation to complete
      const timer = setTimeout(() => {
        setShowBio(true)
      }, motionTokens.duration.normal * 1000)
      
      return () => clearTimeout(timer)
    }
  }, [startImageSlide, bio])

  return (
    <div className="relative min-h-[900px] overflow-hidden pt-0 px-4">
      {/* Centered image and text - appears when intro finishes */}
      {isIntroFinished && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-none">
          <AnimatedBlurBackground />
          <NameAnimation />
          {/* Text - fades down, then hides after 300ms */}
          <HeroText show={showText} isIntroFinished={isIntroFinished} />
          
          {/* Bio - appears after image slides, positioned absolutely at the left edge */}
          <HeroBio bio={bio} showBio={showBio} startImageSlide={startImageSlide} />

          {/* Image - moves */}
          <HeroImage
            imageSrc={imageSrc}
            alt={fullName || "Profile"}
            isIntroFinished={isIntroFinished}
            startImageSlide={startImageSlide}
            onImageError={() => setImageError(true)}
          />
          <HeroMarquee />
          <LocationInfo />
        </div>
      )}
    </div>
  )
}

export default Hero
