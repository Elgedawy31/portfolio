import React from 'react';
import ContactForm from './ContactForm';
import { Users } from '../../icons';

const ContactSection: React.FC = () => {
  return (
    <section className="relative py-4 px-4 overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto text-footer-text">
        <div className="flex items-center space-x-4 ">
          <h2 className="text-4xl font-extrabold text-footer-text">READY TO COLLABORATE?</h2>
          <Users className="w-10 h-10 text-footer-text" />
        </div>
        <p className="text-footer-text mb-4 mt-2 ">HAVE A PROJECT IN MIND? LET'S CREATE SOMETHING EXTRAORDINARY TOGETHER</p>
        
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactSection;

