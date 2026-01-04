import React from 'react';
import { SectionHeader } from '@/components/ui';
import ProjectCard from './ProjectCard';

const SelectedProjectsSection: React.FC = () => {
  const projects = [
    {
      title: 'PROJECT NAME 1',
      date: '1 - 1 - 2025',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    },{
      title: 'PROJECT NAME 1',
      date: '1 - 1 - 2025',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    },{
      title: 'PROJECT NAME 1',
      date: '1 - 1 - 2025',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    },{
      title: 'PROJECT NAME 1',
      date: '1 - 1 - 2025',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
    },
  ];

  return (
    <section className="relative py-8 px-4">
      <SectionHeader
        title="SELECTED PROJECTS"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
      />
      <div className="mt-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            date={project.date}
            description={project.description}
          />
        ))}
      </div>
    </section>
  );
};

export default SelectedProjectsSection;

