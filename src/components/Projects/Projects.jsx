import React, { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { projectsData, projectCategories } from '../../data/projects.js';
import SectionTitle from '../common/SectionTitle/SectionTitle.jsx';
import Button from '../common/Button/Button.jsx';
import './Projects.scss';

const Projects = ({ sectionId = 'projects' }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects =
    selectedCategory === 'All'
      ? projectsData
      : projectsData.filter((proj) => proj.category === selectedCategory);

  return (
    <section className="projects section" id={sectionId}>
      <div className="container">
        <SectionTitle
          badge="Portfolio"
          title="Featured Projects"
          subtitle="A selection of client works, full-stack applications, and open-source software built with modern tech."
        />

        {/* Filter Tabs */}
        <div className="projects__filter-bar">
          {projectCategories.map((category) => (
            <button
              key={category}
              className={`projects__filter-btn ${
                selectedCategory === category ? 'projects__filter-btn--active' : ''
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="projects__grid">
          {filteredProjects.map((project) => (
            <article key={project.id} className="projects__card">
              <div className="projects__image-wrapper">
                <img
                  src={project.image}
                  alt={project.title}
                  className="projects__image"
                  width="800"
                  height="475"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="projects__body">
                <span className="projects__category-tag">{project.category}</span>
                <h3 className="projects__title">{project.title}</h3>
                <p className="projects__description">{project.description}</p>

                {/* Tech tags */}
                <div className="projects__tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="projects__tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card footer links */}
                <div className="projects__footer">
                  <Button
                    variant="outline"
                    size="sm"
                    href={project.liveUrl}
                    target={project.liveUrl.startsWith('http') ? '_blank' : '_self'}
                    icon={<ExternalLink size={14} />}
                  >
                    Live Demo
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    href={project.githubUrl}
                    target="_blank"
                    icon={<Github size={15} />}
                  >
                    Code
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
