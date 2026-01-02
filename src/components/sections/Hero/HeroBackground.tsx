
import { Motion } from "../../../motion/Motion";

function HeroBackground() {


  return (
    <Motion show={true} variant="fadeUp" className="absolute bottom-0 left-0 right-0">
      <div className="w-full h-[70vh] overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('/src/assets/backgrounds/hero-bg.svg')]"></div>
    </Motion>
  )
}

export default HeroBackground
