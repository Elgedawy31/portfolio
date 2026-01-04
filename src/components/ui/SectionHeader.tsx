import React from 'react';

interface SectionHeaderProps {
  title: string;
  description: string;
  titleClassName?: string;
  descriptionClassName?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  titleClassName = '',
  descriptionClassName = '',
  className = '',
}) => {
  // Split title into words for potential line breaks
  const titleWords = title.split(' ');

  return (
    <div className={`${className}`}>
      <h2 className={`text-4xl font-extrabold uppercase text-white leading-tight mb-4 ${titleClassName}`}>
        {titleWords.map((word, index) => (
          <React.Fragment key={index}>
            {index > 0 && <br />}
            {word}
          </React.Fragment>
        ))}
      </h2>
      <p className={`text-base font-normal uppercase text-white leading-relaxed tracking-wide ${descriptionClassName}`}>
        {description}
      </p>
    </div>
  );
};

export default SectionHeader;

