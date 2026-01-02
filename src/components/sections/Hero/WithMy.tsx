
import { useEffect, useState } from "react";
import { Motion } from "@/motion/Motion";
import WithMeSVG from "@/assets/banner/me.svg";

function WithMe() {
  const [animateImage, setAnimateImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateImage(true);
    }, 600); // Delay for the image animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <Motion animateOnMount={true} variant="fadeUp">
      <h1 className="text-[40px] font-bold uppercase flex items-center">
        <span className="">With</span>
        <img src={WithMeSVG} alt="create your" className={`inline-block ml-4 mr-4 h-[53px] object-cover rounded-lg  transition-all duration-500 ${animateImage ? 'w-[153px] opacity-100' : 'w-0 opacity-0'}`} />
        <span >Me</span>
      </h1>
    </Motion> 
  )
}

export default WithMe
