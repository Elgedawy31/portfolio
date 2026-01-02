
import { useEffect, useState } from "react";
import { Motion } from "@/motion/Motion";
import FeatureSVG from "@/assets/banner/feature.svg";

function Feature() {
  const [animateImage, setAnimateImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateImage(true);
    }, 600); // Delay for the image animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <Motion animateOnMount={true} variant="fadeDown">
      <h1 className="text-[40px] font-bold uppercase flex items-center justify-end text-right">
        <span className={`${animateImage ? 'translate-0':'translate-x-8'} transition-transform relative`}>Feat</span>
        <img src={FeatureSVG} alt="create your" className={`inline-block ml-4 mr-4 h-[29px] transition-all duration-500 ${animateImage ? 'w-[140px] opacity-100' : 'w-0 opacity-0'}`} />
        <span >Ure</span>
      </h1>
    </Motion> 
  )
}

export default Feature
