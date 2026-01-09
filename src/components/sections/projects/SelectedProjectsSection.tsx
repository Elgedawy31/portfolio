import React from 'react';
import { SectionHeader } from '@/components/ui';
import ProjectCard from './ProjectCard';
import type { Project } from '@/api/Api';

interface SelectedProjectsSectionProps {
  projects?: Project[];
}

const SelectedProjectsSection: React.FC<SelectedProjectsSectionProps> = ({ projects }) => {
  // Default projects if no projects provided
  const defaultProjects = [
    {
      title: 'PROJECT NAME 1',
      date: '1 - 1 - 2025',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      image: undefined,
      url: undefined,
    },
    {
      title: 'PROJECT NAME 2',
      date: '1 - 1 - 2025',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      image: undefined,
      url: undefined,
    },
    {
      title: 'PROJECT NAME 3',
      date: '1 - 1 - 2025',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      image: undefined,
      url: undefined,
    },
    {
      title: 'PROJECT NAME 4',
      date: '1 - 1 - 2025',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      image: undefined,
      url: undefined,
    },
  ];

  // Use projects from API if available, otherwise use default projects
  const displayProjects = projects && projects.length > 0
    ? projects
        .sort((a, b) => a.order - b.order) // Sort by order
        .map((project) => ({
          title: project.name.toUpperCase(),
          date: new Date(project.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'numeric', 
            day: 'numeric' 
          }),
          description: project.description,
          image: project.image?.url || project.image?.secureUrl,
          url: project.url,
        }))
    : defaultProjects;

  return (
    <section className="relative py-8 px-4">
      <SectionHeader
        title="SELECTED PROJECTS"
        description="A showcase of my recent work and projects, demonstrating my skills and expertise in software development."
      />
      <div className="mt-8">
        {displayProjects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            date={project.date}
            description={project.description}
            image={project.image}
            url={project.url}
          />
        ))}
      </div>
    </section>
  );
};

export default SelectedProjectsSection;

