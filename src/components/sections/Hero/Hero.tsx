import CreateYour from "./CreateYour"
import HeroBackground from "./HeroBackground"
import Feature from "./Feature"
import WithMe from "./WithMy"
import AnimatedBlurBackground from "./AnimatedBlurBackground"

function Hero() {
  return (
    <div className="relative h-screen overflow-hidden pt-44 px-4">
      <AnimatedBlurBackground />
      <CreateYour />
      <Feature />
      <WithMe />
      <HeroBackground />
    </div>
  )
}

export default Hero
