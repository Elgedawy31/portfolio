
import { useEffect, useState } from "react";
import { Motion } from "../../../motion/Motion";

function HeroBackground() {
  const [showBackground, setShowBackground] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBackground(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Motion show={showBackground} variant="fadeUp" className="absolute bottom-0 left-0 right-0">
      <div className="w-full h-[70vh] overflow-hidden bg-cover bg-center bg-no-repeat bg-[url('/src/assets/backgrounds/hero-bg.svg')]"></div>
    </Motion>
  )
}

export default HeroBackground
