import CreateYour from "./CreateYour"
import HeroBackground from "./HeroBackground"
import Feature from "./Feature"

function Hero() {
  return (
    <div className="relative h-screen overflow-hidden pt-44 px-4">
      <CreateYour />
      <Feature />
      <HeroBackground />
    </div>
  )
}

export default Hero
