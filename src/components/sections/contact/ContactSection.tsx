import React from 'react';
import ContactForm from './ContactForm';
import { Users } from '../../icons';

const ContactSection: React.FC = () => {
  return (
    <section className="relative bg-section-background py-16 px-4 overflow-hidden bg-[url('/src/assets/backgrounds/contact-bg.svg')] bg-repeat">
      {/* Decorative Background Text */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute -top-1/4 left-0 text-gray-300 opacity-20 text-9xl font-bold uppercase rotate-[-15deg] whitespace-nowrap">TESTIMONIALS</div>
        <div className="absolute top-1/4 right-0 text-gray-300 opacity-20 text-9xl font-bold uppercase rotate-[10deg] whitespace-nowrap">TESTIMONIALS</div>
        <div className="absolute bottom-1/4 left-1/4 text-gray-300 opacity-20 text-9xl font-bold uppercase rotate-[-5deg] whitespace-nowrap">TESTIMONIALS</div>
        <div className="absolute -bottom-1/4 right-1/4 text-gray-300 opacity-20 text-9xl font-bold uppercase rotate-[20deg] whitespace-nowrap">TESTIMONIALS</div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <h2 className="text-4xl font-bold text-section-text">READY TO COLLABORATE?</h2>
          <Users className="w-10 h-10 text-section-text" />
        </div>
        <p className="text-section-text mb-8">HAVE A PROJECT IN MIND? LET'S CREATE SOMETHING EXTRAORDINARY TOGETHER</p>
        
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactSection;

