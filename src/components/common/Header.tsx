import { Motion } from "@/motion/Motion";
import { DotsGridSVG } from '../ui';
import { useProfile } from "@/stores/ProfileContext";

function Header() {
  const { profile } = useProfile();
  const profileImageUrl = profile?.profileImage?.url || profile?.profileImage?.secureUrl;

  return (
    <Motion animateOnMount={true} variant="fadeDown" className="">
      <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-background/70 flex justify-between items-center  shadow-sm shadow-foreground/10">
        {profileImageUrl ? (
          <img 
            src={profileImageUrl} 
            alt={`${profile?.firstName} ${profile?.lastName}`}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-foreground rounded-full"></div>
        )}
        
        <div className="flex items-center">
          <DotsGridSVG />
        </div>
      </header>
    </Motion>
  );
}

export default Header;
