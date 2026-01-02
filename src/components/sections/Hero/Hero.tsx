import CreateYour from "./CreateYour"
import HeroBackground from "./HeroBackground"

function Hero() {
  return (
    <div className="relative h-screen overflow-hidden pt-44 px-4">
      <CreateYour />
      <HeroBackground />
    </div>
  )
}

export default Hero
