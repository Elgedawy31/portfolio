import { Motion } from "@/motion/Motion";
import { DotsGridSVG } from '../ui';

function Header() {
  return (
    <Motion animateOnMount={true} variant="fadeDown" className="">
      <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-background/70 flex justify-between items-center  shadow-sm shadow-foreground/10">
        <div className="w-8 h-8 bg-foreground rounded-full"></div>
        
        <div className="flex items-center">
          <DotsGridSVG />
        </div>
      </header>
    </Motion>
  );
}

export default Header;
