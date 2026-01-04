import CreateYour from "./CreateYour"
import HeroBackground from "./HeroBackground"
import Feature from "./Feature"
import WithMe from "./WithMy"
import AnimatedBlurBackground from "./AnimatedBlurBackground"
import HeroMarquee from "./HeroMarquee"
import NameAnimation from "./NameAnimation"
import LocationInfo from "./LocationInfo"

function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden pt-44 px-4">
      <AnimatedBlurBackground />
      <CreateYour />
      <Feature />
      <WithMe />
      <NameAnimation />
      <HeroBackground />
      <HeroMarquee />
      <LocationInfo />
    </div>
  )
}

export default Hero
