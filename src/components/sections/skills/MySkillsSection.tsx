import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/ui';
import SkillCard from './SkillCard';
import { LightbulbIcon } from '@/components/icons';

const MySkillsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cardHeight, setCardHeight] = useState(200);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentSection = sectionRef.current;
    if (!currentSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(currentSection);

    return () => {
      observer.unobserve(currentSection);
    };
  }, []);

  useEffect(() => {
    if (firstCardRef.current) {
      const height = firstCardRef.current.offsetHeight;
      setCardHeight(height);
    }
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
      <div ref={containerRef} className="relative mt-4" style={{ minHeight: '400px' }}>
        {cards.map((card, index) => {
          const col = index % 2;
          const row = Math.floor(index / 2);
          
          // Calculate final grid position
          // Each card takes 50% width minus half the gap
          const cardWidth = 'calc(50% - 4px)';
          const finalLeft = col === 0 ? '0%' : 'calc(50% + 4px)';
          
          // Use measured card height for vertical positioning
          const finalTop = row === 0 ? '0px' : `${row * (cardHeight + 8)}px`;

          return (
            <motion.div
              key={index}
              ref={index === 0 ? firstCardRef : null}
              initial={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: cardWidth,
                opacity: 0,
                scale: 0.8,
              }}
              animate={
                isVisible
                  ? {
                      position: 'absolute',
                      top: finalTop,
                      left: finalLeft,
                      width: cardWidth,
                      opacity: 1,
                      scale: 1,
                    }
                  : {
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: cardWidth,
                      opacity: 0,
                      scale: 0.8,
                    }
              }
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.42, 0, 0.58, 1.0],
              }}
              className="absolute"
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

