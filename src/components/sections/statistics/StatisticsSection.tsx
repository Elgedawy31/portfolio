import React, { useEffect, useRef, useState } from "react";

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

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
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

const StatisticsSection: React.FC = () => {
  const handleDownloadCV = () => {
    // You can add your CV file path here
    const cvUrl = "/cv.pdf"; // Update with your actual CV path
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "CV_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative py-12 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <StatisticItem
          title="WORLDWIDE CLIENTS IN 15 COUNTRIES"
          value={15}
          prefix="+"
          description="Covers the Arab world and extends across Europe"
        />

        <StatisticItem
          title="Successfully Completed Projects"
          value={20}
          prefix="+"
          description="Transforming an idea from nothing into a thriving launch is an incredible journey filled with challenges and triumphs."
        />

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
      </div>
    </section>
  );
};

export default StatisticsSection;
