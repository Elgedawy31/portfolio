import React, { useEffect, useRef, useState } from 'react';
import ContactForm from './ContactForm';
import { Users } from '../../icons';
import { Motion } from '@/motion/Motion';

const ContactSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-4 px-4 overflow-hidden">
      <Motion show={isVisible} variant="fadeUp">
        <div className="relative z-10 max-w-2xl mx-auto text-footer-text">
          <div className="flex items-center space-x-4 ">
            <h2 className="text-4xl font-extrabold text-footer-text">READY TO COLLABORATE?</h2>
            <Users className="w-10 h-10 text-footer-text" />
          </div>
          <p className="text-footer-text mb-4 mt-2 ">HAVE A PROJECT IN MIND? LET'S CREATE SOMETHING EXTRAORDINARY TOGETHER</p>
          
          <ContactForm />
        </div>
      </Motion>
    </section>
  );
};

export default ContactSection;

