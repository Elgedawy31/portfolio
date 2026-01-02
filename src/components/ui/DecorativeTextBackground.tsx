import React from 'react';

interface DecorativeTextBackgroundProps {
  text: string;
  opacity?: number;
}

const DecorativeTextBackground: React.FC<DecorativeTextBackgroundProps> = ({
  text,
  opacity = 0.05,
}) => {
  const repetitions = 5; // Adjust as needed to fill the screen

  return (
    <div
      className="absolute inset-0 flex flex-col justify-evenly items-center overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{
        opacity,
        color: 'var(--color-section-text)',
        fontSize: 'clamp(8rem, 20vw, 20rem)',
        fontWeight: '800',
        textTransform: 'uppercase',
        lineHeight: '0.8',
      }}
    >
      {Array.from({ length: repetitions }).map((_, rowIndex) => (
        <React.Fragment key={rowIndex}>
          <span className="whitespace-nowrap -mr-[30vw]">
            {text}
          </span>
          <span className="whitespace-nowrap -ml-[30vw]">
            {text}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};

export default DecorativeTextBackground;

