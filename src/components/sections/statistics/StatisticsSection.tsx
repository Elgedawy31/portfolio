import React, { useEffect, useRef, useState } from 'react';

interface StatisticItemProps {
  title: string;
  value: number;
  prefix?: string;
  description: string;
  isLast?: boolean;
}

const StatisticItem: React.FC<StatisticItemProps> = ({ 
  title, 
  value, 
  prefix = '+', 
  description,
  isLast = false 
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
      <div ref={ref} className="py-10">
        <h3 className="text-base font-normal uppercase text-white mb-6">
          {title}
        </h3>
        <div className="text-7xl md:text-8xl font-bold text-white mb-6 leading-none">
          {prefix}{count.toString().padStart(2, '0')}
        </div>
        <p className="text-sm font-normal text-white max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>
      {!isLast && (
        <div className="w-full h-px bg-white/30"></div>
      )}
    </>
  );
};

const StatisticsSection: React.FC = () => {
  const handleDownloadCV = () => {
    // You can add your CV file path here
    const cvUrl = '/cv.pdf'; // Update with your actual CV path
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'CV_Resume.pdf';
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
          isLast={true}
        />

        <div className="mt-12 flex justify-center">
          <button
            onClick={handleDownloadCV}
            className="px-10 py-4 bg-[#2A2A2A] border border-white/40 rounded-lg text-white font-normal hover:bg-[#3A3A3A] transition-colors shadow-lg hover:border-white/60"
          >
            Download my CV/Resume
          </button>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;

