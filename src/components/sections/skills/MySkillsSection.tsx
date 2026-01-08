import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui';
import SkillCard from './SkillCard';
import { LightbulbIcon } from '@/components/icons';

const MySkillsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fixed card height - all cards will have the same height
  const cardHeight = 180;
  const gap = 16; // Gap between cards

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add a small delay before starting animation
            setTimeout(() => {
              setIsVisible(true);
            }, 200);
          }
        });
      },
      { 
        threshold: 0.5, // Require 50% of section to be visible
        rootMargin: '0px 0px -100px 0px' // Trigger when section is 100px into viewport
      }
    );

    observer.observe(currentSection);

    return () => {
      observer.unobserve(currentSection);
    };
  }, []);

  const cards = [
    {
      icon: <LightbulbIcon className="w-3 h-3 text-white" />,
      title: 'MANAGEMENT',
      description: 'MY MANAGEMENT SKILLS FOCUS ON ORGANIZATION, LEADERSHIP, AND ADAPTABILITY, HELPING TASKS RUN SMOOTHLY AND EFFICIENTLY WHILE CONSTANTLY IMPROVING',
    },
    {
      icon: <LightbulbIcon className="w-3 h-3 text-white" />,
      title: 'DEVELOPMENT',
      description: 'MY DEVELOPMENT SKILLS ENCOMPASS FULL-STACK EXPERTISE, FROM FRONTEND TO BACKEND, WITH A STRONG FOCUS ON CLEAN CODE AND BEST PRACTICES',
    },
    {
      icon: <LightbulbIcon className="w-3 h-3 text-white" />,
      title: 'DESIGN',
      description: 'MY DESIGN SKILLS COMBINE CREATIVITY WITH FUNCTIONALITY, CREATING INTUITIVE AND VISUALLY APPEALING USER EXPERIENCES THAT ENGAGE AND DELIGHT',
    },
    {
      icon: <LightbulbIcon className="w-3 h-3 text-white" />,
      title: 'COLLABORATION',
      description: 'MY COLLABORATION SKILLS ENABLE EFFECTIVE TEAMWORK, CLEAR COMMUNICATION, AND SEAMLESS COORDINATION TO DELIVER EXCEPTIONAL RESULTS TOGETHER',
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-8 px-4">
      <SectionHeader
        title="MY SKILLS"
        description="A VERSATILE SET OF TECHNICAL AND CREATIVE SKILLS DEVELOPED THROUGH HANDS-ON EXPERIENCE AND CONTINUOUS LEARNING."
      />
      <div ref={containerRef} className="relative mt-4" style={{ minHeight: `${(cardHeight + gap) * 2}px` }}>
        {cards.map((card, index) => {
          const col = index % 2;
          const row = Math.floor(index / 2);
          
          // Calculate final grid position
          // Each card takes 50% width minus half the gap
          const cardWidth = `calc(50% - ${gap / 2}px)`;
          const finalLeft = col === 0 ? '0%' : `calc(50% + ${gap / 2}px)`;
          
          // Use fixed card height for vertical positioning with gap
          const finalTop = row === 0 ? '0px' : `${row * (cardHeight + gap)}px`;

          // First card stays in place, others animate
          const isFirstCard = index === 0;
          const shouldAnimate = !isFirstCard && isVisible;
          
          // Set z-index: top row (row 0) should be above bottom row (row 1)
          // Top row gets z-index 10, bottom row gets z-index 5
          const zIndex = row === 0 ? 10 : 5;

          return (
            <motion.div
              key={index}
              initial={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: cardWidth,
                opacity: 1, // All cards visible by default
                scale: 1, // All cards at full scale by default
                zIndex: zIndex,
              }}
              animate={
                shouldAnimate
                  ? {
                      position: 'absolute',
                      top: finalTop,
                      left: finalLeft,
                      width: cardWidth,
                      opacity: 1,
                      scale: 1,
                      zIndex: zIndex,
                    }
                  : {
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: cardWidth,
                      opacity: 1,
                      scale: 1,
                      zIndex: zIndex,
                    }
              }
              transition={
                shouldAnimate
                  ? {
                      duration: 0.6,
                      delay: 0.3 + ((index - 1) * 0.15), // Start with 0.3s base delay, then 0.15s between each card (excluding first)
                      ease: [0.42, 0, 0.58, 1.0],
                    }
                  : {}
              }
              className="absolute"
              style={{ zIndex }}
            >
              <SkillCard
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default MySkillsSection;

