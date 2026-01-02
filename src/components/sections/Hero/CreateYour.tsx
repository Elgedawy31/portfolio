
import { useEffect, useState } from "react";
import { Motion } from "@/motion/Motion";
import CreateYourSVG from "@/assets/banner/create-your.svg";

function CreateYour() {
  const [animateImage, setAnimateImage] = useState(false);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    const imageTimer = setTimeout(() => {
      setAnimateImage(true);
    }, 600); // Delay for the image animation

    const hideTimer = setTimeout(() => {
      setShowContent(false);
    }, 900); // Delay to hide everything after 900ms

    return () => {
      clearTimeout(imageTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <Motion animateOnMount={showContent} variant="fadeDown">
        <h1 className="text-[40px] font-bold uppercase flex items-center">
          <span className="">Create</span>
          <img src={CreateYourSVG} alt="create your" className={`inline-block ml-4 mr-4 h-[46px] transition-all duration-500 ${animateImage ? 'w-[52px] opacity-100' : 'w-0 opacity-0'}`} />
          <span >Your</span>
        </h1>
    </Motion> 
  )
}

export default CreateYour
