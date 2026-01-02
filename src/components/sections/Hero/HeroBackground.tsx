import HeroBg from "@/assets/backgrounds/hero-bg.svg"

function HeroBackground() {
  return (
    <div className="  w-full h-[50vh] bg-cover bg-center bg-no-repeat"  style={{ backgroundImage: `url(${HeroBg})` }}>
      HeroBackground
    </div>
  )
}

export default HeroBackground
