import React from 'react';
import { ArrowRight } from 'lucide-react';
import projectSideSVG from '@/assets/proejct-side.svg';
import projectImgSVG from '@/assets/project-img.svg';

interface ProjectCardProps {
  title: string;
  date: string;
  description: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, date, description }) => {
  return (
    <div className="relative flex items-start gap-4 h-[350px]">
      {/* Left side - Vertical line with button */}
      <div className="relative shrink-0 w-[60px]">
        <img 
          src={projectSideSVG} 
          alt="Project timeline" 
          className="w-full h-full object-contain"
        />
        {/* Circular button on the line - positioned at center */}
        {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#2A2A2A] rounded-full flex items-center justify-center border-2 border-white/30 shadow-lg backdrop-blur-sm">
          <div className="text-white text-xs font-bold">ED</div>
        </div> */}
      </div>

      {/* Right side - Project content */}
      <div className="flex-1 flex flex-col h-full">
        {/* Top - Title and Date */}
        <div className="">
          <h3 className="text-xl font-bold uppercase text-white mb-3">
            {title}
          </h3>
          <p className="text-base font-normal text-white">
            {date}
          </p>
        </div>

        {/* Center - Large project image/logo */}
        <div className="flex-1 flex items-center justify-center ">
          <img 
            src={projectImgSVG} 
            alt={title} 
            className="max-w-full max-h-80 object-contain"
          />
        </div>

        {/* Bottom - Description and navigation */}
        <div className="flex items-end justify-between mt-auto">
          <p className="text-sm font-normal text-white max-w-lg leading-relaxed">
            {description}
          </p>
          <button className="w-14 h-14 bg-white rounded-full flex items-center justify-center hover:bg-white/90 transition-colors flex-shrink-0 ml-6 shadow-lg">
            <ArrowRight className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

