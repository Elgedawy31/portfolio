import React, { useEffect, useRef, useState } from "react";
import type { EmployeeProfile } from "@/api/Api";

interface StatisticItemProps {
  title: string;
  value: number;
  prefix?: string;
  description: string;
}

const StatisticItem: React.FC<StatisticItemProps> = ({
  title,
  value,
  prefix = "+",
  description,
}) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const nextValue = Math.min(Math.floor(increment * currentStep), value);
      setCount(nextValue);

      if (currentStep >= steps) {
        setCount(value);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [hasAnimated, value]);

  return (
    <>
      <div ref={ref} className="space-y-4 py-4 ">
        <div className="w-full h-px bg-white/30 "></div>

        <h3 className="text-[10px] font-light uppercase text-white ">
          {title}
        </h3>
        <div className="text-[96px]  font-bold text-white  leading-none">
          {prefix}
          {count.toString().padStart(2, "0")}
        </div>
        <p className="text-[10px] font-light text-white  leading-relaxed">
          {description}
        </p>
      </div>
      <div className="w-full h-px bg-white/30"></div>
    </>
  );
};

interface StatisticsSectionProps {
  profile?: EmployeeProfile | null;
}

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ profile }) => {
  // Calculate statistics from profile data
  const completedProjects = profile?.projects?.length || 0;
  
  // Default values if profile data is not available
  const clientsCount = 15; // Can be added to API later if needed

  const handleDownloadCV = () => {
    if (!profile?.cv) {
      console.error("CV not available");
      return;
    }

    const cvUrl = profile.cv.secureUrl || profile.cv.url || profile.cv.viewUrl;
    if (!cvUrl) {
      console.error("CV URL not available");
      return;
    }

    // Open CV in a new window
    window.open(cvUrl, "_blank");
  };

  return (
    <section className="relative py-12 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <StatisticItem
          title="WORLDWIDE CLIENTS IN 15 COUNTRIES"
          value={clientsCount}
          prefix="+"
          description="Covers the Arab world and extends across Europe"
        />

        <StatisticItem
          title="Successfully Completed Projects"
          value={completedProjects}
          prefix="+"
          description="Transforming an idea from nothing into a thriving launch is an incredible journey filled with challenges and triumphs."
        />

        {profile?.cv && (profile.cv.secureUrl || profile.cv.url || profile.cv.viewUrl) && (
          <div className="mt-12 flex justify-center">
            <div className="rounded-3xl p-px">
              <button
                onClick={handleDownloadCV}
                className="relative px-10 py-4 bg-white/5 rounded-2xl text-white font-normal transition-all duration-200 text-base border-l-2 border-r-2 border-white/30  w-full"
              >
                Download my CV/Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default StatisticsSection;
