import heroBgV2 from "@/assets/hero-bg-v2.svg";
import coverSvg from "@/assets/cover.svg";

function IntroSpotlight() {
  return (
    <div className="relative w-full h-screen max-h-screen overflow-hidden">
      {/* Background layer - hero-bg-v2.svg */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)', // GPU acceleration
        }}
      >
        <img 
          src={heroBgV2} 
          alt="Hero background" 
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      
      {/* Blurred overlay - covers everything except center circle */}
      <div 
        className="absolute inset-0 w-full h-full z-5 backdrop-blur-xs"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)', // GPU acceleration
          maskImage: 'radial-gradient(circle 103px at 50% 50%, transparent 0%, transparent 99.9%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle 103px at 50% 50%, transparent 0%, transparent 99.9%, black 100%)',
        }}
      />
      
      {/* Foreground layer - cover.svg */}
      <div 
        className="absolute inset-0 w-full h-full z-10"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)', // GPU acceleration
        }}
      >
        <img 
          src={coverSvg} 
          alt="Cover overlay" 
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </div>
  )
}

export default IntroSpotlight