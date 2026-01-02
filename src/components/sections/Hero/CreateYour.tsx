
import { useEffect, useState } from "react";
import { Motion } from "../../../motion/Motion";
import CreateYourSVG from "../../../assets/banner/create-your.svg";

function CreateYour() {
  const [showSVG, setShowSVG] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSVG(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Motion animateOnMount={true} variant="fadeDown">
      <h1 className="text-[40px] font-bold uppercase" >Create <img src={CreateYourSVG} alt="create your" className={`inline-block w-10 h-10 transition-opacity duration-500 ${showSVG ? 'opacity-100' : 'opacity-0'}`} /> Your</h1>
    </Motion>
  )
}

export default CreateYour
