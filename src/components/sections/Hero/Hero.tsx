import CreateYour from "./CreateYour"
import HeroBackground from "./HeroBackground"
import Feature from "./Feature"
import WithMe from "./WithMy"

function Hero() {
  return (
    <div className="relative h-screen overflow-hidden pt-44 px-4">
      <div 
        className="absolute top-0 w-40 h-40 bg-white/50 left-[25%] z-50"
        style={{ filter: 'blur(5.375rem)' }}
      ></div>
      <CreateYour />
      <Feature />
      <WithMe />
      <HeroBackground />
    </div>
  )
}

export default Hero
