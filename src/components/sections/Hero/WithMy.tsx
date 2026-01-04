
import { useEffect, useState } from "react";
import { Motion } from "@/motion/Motion";
import WithMeSVG from "@/assets/banner/me.svg";

function WithMe() {
  const [animateImage, setAnimateImage] = useState(false);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    const initialImageTimer = setTimeout(() => {
      setAnimateImage(true);
    }, 600); // Delay for the initial image animation

    const hideContentTimer = setTimeout(() => {
      setShowContent(false);
    }, 1200); // Delay to hide content and show big image after 1200ms

    return () => {
      clearTimeout(initialImageTimer);
      clearTimeout(hideContentTimer);
    };
  }, []);

  return (
    <Motion animateOnMount={true} variant="fadeUp">
        <h1 className={`text-[40px] font-bold uppercase flex items-start relative `}>
          <span className={`${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-500`}>With</span>
          <img src={WithMeSVG} alt="create your" className={`inline-block ml-4 mr-4 object-cover rounded-lg transition-all duration-500 ${showContent ? (animateImage ? 'h-[53px] w-[153px] opacity-100' : 'h-[53px] w-0 opacity-0') : 'h-[216px] w-[163px] opacity-100 translate-x-24 -translate-y-16'}`} />
          <span className={`${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-500`}>Me</span>
        </h1>
      
    </Motion> 
  )
}

export default WithMe
