
import React from 'react';
import { Facebook, Linkedin, Github } from '../icons';

function Footer() {
  return (
    <footer className="py-8 text-footer-text flex flex-col items-center justify-center space-y-4">
      <div className="flex space-x-6">
        <a href="#" aria-label="Facebook" className="hover:text-brand transition-colors duration-300">
          <Facebook className="w-6 h-6" />
        </a>
        <a href="#" aria-label="LinkedIn" className="hover:text-brand transition-colors duration-300">
          <Linkedin className="w-6 h-6" />
        </a>
        <a href="#" aria-label="GitHub" className="hover:text-brand transition-colors duration-300">
          <Github className="w-6 h-6" />
        </a>
      </div>
      <p className="text-sm">&copy; {new Date().getFullYear()} Fares Draz Designs</p>
    </footer>
  );
}

export default Footer;

