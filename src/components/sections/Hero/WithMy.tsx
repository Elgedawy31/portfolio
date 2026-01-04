
import { useEffect, useState } from "react";
import { Motion } from "@/motion/Motion";
import WithMeSVG from "@/assets/banner/me.svg";

interface WithMeProps {
  leftText?: string;
  leftTextPosition?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    transform?: string;
    marginRight?: string;
  };
}

function WithMe({ leftText = "anything", leftTextPosition }: WithMeProps) {
  const [animateImage, setAnimateImage] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [showLeftText, setShowLeftText] = useState(false);

  useEffect(() => {
    const initialImageTimer = setTimeout(() => {
      setAnimateImage(true);
    }, 600); // Delay for the initial image animation

    const hideContentTimer = setTimeout(() => {
      setShowContent(false);
    }, 1200); // Delay to hide content and show big image after 1200ms

    const showLeftTextTimer = setTimeout(() => {
      setShowLeftText(true);
    }, 1700); // After image animation completes (1200ms + 500ms transition)

    return () => {
      clearTimeout(initialImageTimer);
      clearTimeout(hideContentTimer);
      clearTimeout(showLeftTextTimer);
    };
  }, []);

  const defaultPosition = {
    right: "100%",
    top: "50%",
    transform: "translateY(-50%)",
    marginRight: "16px",
    ...leftTextPosition,
  };

  return (
    <Motion animateOnMount={true} variant="fadeUp">
        <h1 className={`text-[40px] font-bold uppercase flex items-start relative `}>
          <span className={`${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-500`}>With</span>
          <div className="relative inline-block">
            {leftText && showLeftText && (
              <span
                className="absolute text-[40px] font-bold uppercase whitespace-nowrap transition-all duration-500"
                style={{
                  top: defaultPosition.top,
                  left: defaultPosition.left,
                  right: defaultPosition.right,
                  bottom: defaultPosition.bottom,
                  transform: defaultPosition.transform,
                  marginRight: defaultPosition.marginRight,
                  opacity: showLeftText ? 1 : 0,
                }}
              >
                {leftText}
              </span>
            )}
            <img src={WithMeSVG} alt="create your" className={`inline-block ml-4 mr-4 object-cover rounded-lg transition-all duration-500 ${showContent ? (animateImage ? 'h-[53px] w-[153px] opacity-100' : 'h-[53px] w-0 opacity-0') : 'h-[216px] w-[163px] opacity-100 translate-x-24 -translate-y-16'}`} />
          </div>
          <span className={`${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-500`}>Me</span>
        </h1>
      
    </Motion> 
  )
}

export default WithMe
