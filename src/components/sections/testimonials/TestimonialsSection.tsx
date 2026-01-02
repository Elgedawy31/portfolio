import React from 'react';
import { DecorativeTextBackground } from '../../ui';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background text-foreground overflow-hidden">
      <DecorativeTextBackground text="TESTIMONIALS" opacity={0.03} />
    </section>
  );
};

export default TestimonialsSection;

