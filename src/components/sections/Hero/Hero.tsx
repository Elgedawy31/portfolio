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
      {/* <IntroSpotlight
        backgroundImage={heroBgV2}
        words={["GET", "WHAT", "YOU", "NEED"]}
        positions={[
          { x: 50, y: 35 },
          { x: 50, y: 45 },
          { x: 50, y: 55 },
          { x: 50, y: 65 }
        ]}
        spotlightSize={130}
        runOnce={true}
      /> */}
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
