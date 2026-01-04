import { useEffect, useState } from "react";
import { Motion } from "@/motion/Motion";
import starSvg from "@/assets/star.svg";

const marqueeTexts = [
  "Engineering with purpose",
  "Leading through code",
  "Scaling what matters",
  "Tech made reliable",
  "Solving the hard parts",
  "Building for impact",
  "Driving teams forward"
];

function HeroMarquee() {
  const [showMarquee, setShowMarquee] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMarquee(true);
    }, 2100);
    return () => clearTimeout(timer);
  }, []);
  // Create the marquee content with stars between text items
  const marqueeContent: React.ReactNode[] = [];
  marqueeTexts.forEach((text, index) => {
    marqueeContent.push(
      <span key={`text-${index}`} className="text-[#8E8E93] text-lg font-medium whitespace-nowrap">
        {text}
      </span>
    );
    if (index < marqueeTexts.length - 1) {
      marqueeContent.push(
        <img 
          key={`star-${index}`} 
          src={starSvg} 
          alt="star" 
          className="inline-block mx-4 shrink-0 w-[18px] h-[18px]"
        />
      );
    }
  });

  return (
    <Motion show={showMarquee} variant="fadeIn">
      <style>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-25%);
          }
        }
        .marquee-wrapper {
          overflow: hidden;
          width: 100%;
          position: relative;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 80px,
            black calc(100% - 80px),
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 80px,
            black calc(100% - 80px),
            transparent 100%
          );
        }
        .marquee-container {
          display: flex;
          width: max-content;
        }
        .marquee-track {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .marquee-animation {
          animation: marquee 12s linear infinite;
          animation-delay: 300ms;
        }
      `}</style>
      <div className="relative -top-10 marquee-wrapper">
        <div className="marquee-container marquee-animation">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="marquee-track">
              {marqueeContent}
            </div>
          ))}
        </div>
      </div>
    </Motion>
  );
}

export default HeroMarquee;
