import React from 'react';
import { SectionHeader } from '@/components/ui';
import SkillCard from './SkillCard';
import { LightbulbIcon } from '@/components/icons';

const MySkillsSection: React.FC = () => {
  return (
    <section className="relative py-8 px-4">
      <SectionHeader
        title="MY SKILLS"
        description="A VERSATILE SET OF TECHNICAL AND CREATIVE SKILLS DEVELOPED THROUGH HANDS-ON EXPERIENCE AND CONTINUOUS LEARNING."
      />
      <div className="grid grid-cols-2 gap-2 mt-4">
        <SkillCard
          icon={<LightbulbIcon className="w-3 h-3 text-white" />}
          title="MANAGEMENT"
          description="MY MANAGEMENT SKILLS FOCUS ON ORGANIZATION, LEADERSHIP, AND ADAPTABILITY, HELPING TASKS RUN SMOOTHLY AND EFFICIENTLY WHILE CONSTANTLY IMPROVING"
        />
        <SkillCard
          icon={<LightbulbIcon className="w-3 h-3 text-white" />}
          title="DEVELOPMENT"
          description="MY DEVELOPMENT SKILLS ENCOMPASS FULL-STACK EXPERTISE, FROM FRONTEND TO BACKEND, WITH A STRONG FOCUS ON CLEAN CODE AND BEST PRACTICES"
        />
        <SkillCard
          icon={<LightbulbIcon className="w-3 h-3 text-white" />}
          title="DESIGN"
          description="MY DESIGN SKILLS COMBINE CREATIVITY WITH FUNCTIONALITY, CREATING INTUITIVE AND VISUALLY APPEALING USER EXPERIENCES THAT ENGAGE AND DELIGHT"
        />
        <SkillCard
          icon={<LightbulbIcon className="w-3 h-3 text-white" />}
          title="COLLABORATION"
          description="MY COLLABORATION SKILLS ENABLE EFFECTIVE TEAMWORK, CLEAR COMMUNICATION, AND SEAMLESS COORDINATION TO DELIVER EXCEPTIONAL RESULTS TOGETHER"
        />
      </div>
    </section>
  );
};

export default MySkillsSection;

