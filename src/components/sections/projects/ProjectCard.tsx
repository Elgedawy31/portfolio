import React from 'react';
import { CircleArrowRight } from 'lucide-react';
import projectSideSVG from '@/assets/proejct-side.svg';
import projectImgSVG from '@/assets/project-img.svg';

interface ProjectCardProps {
  title: string;
  date: string;
  description: string;
  image?: string;
  url?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, date, description, image, url }) => {
  return (
    <div className="relative flex items-start gap-4 ">
      {/* Left side - Vertical line with button */}
      <div className="relative shrink-0 w-[60px]">
        <img 
          src={projectSideSVG} 
          alt="Project timeline" 
          className="w-full h-full object-contain"
        />
        {/* Circular button on the line - positioned at center */}
        <img 
            src={image || projectImgSVG} 
            alt={title} 
            className=" object-cover rounded-full absolute top-1/2 left-1/2 transform -translate-x-8 -translate-y-1/2 w-12 h-12"
          />
      </div>

      {/* Right side - Project content */}
      <div className="flex-1 flex flex-col gap-2 h-full">
        {/* Top - Title and Date */}
        <div className="">
          <h3 className="text-[20px] font-bold uppercase text-white ">
            {title}
          </h3>
          <p className="text-xs font-normal text-[#8E8E93]">
            {date}
          </p>
        </div>

        {/* Center - Large project image/logo */}
        <div className="flex-1 flex items-center justify-center ">
          <img 
            src={image || projectImgSVG} 
            alt={title} 
            className="max-w-full max-h-80 object-contain"
          />
        </div>

        {/* Bottom - Description and navigation */}
        <div className="flex items-end justify-between mt-auto">
          <p className="text-xs font-normal text-[#8E8E93]  leading-relaxed">
            {description}
          </p>
        {url && (
          <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="border-white border  flex items-center justify-center rounded-full hover:opacity-80 transition-opacity"
          >
            <CircleArrowRight className="w-6 h-6 text-black" fill='white'  />
          </a>
        )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

