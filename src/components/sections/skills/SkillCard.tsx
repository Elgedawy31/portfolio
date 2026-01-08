import React from 'react';

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white/10 rounded-lg p-2 flex flex-col h-full max-h-[250px] overflow-hidden">
      <div className="mb-2">
        {icon}
      </div>
      <h3 className="text-base font-bold uppercase text-white mb-2">
        {title}
      </h3>
      <div className="w-full h-px bg-white mb-2"></div>
      <p className="text-[10px] font-normal uppercase text-white leading-relaxed overflow-hidden">
        {description}
      </p>
    </div>
  );
};

export default SkillCard;
