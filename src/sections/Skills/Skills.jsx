import { useState } from 'react';
import SkillCard from '../../components/SkillCard/SkillCard';
import { skillsData, skillCategories } from '../../data/skills';
import './Skills.scss';
import './Skills.media.scss';

export default function Skills({ sectionId = 'skills' }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredSkills =
    activeCategory === 'all'
      ? skillsData
      : skillsData.filter((skill) => skill.category === activeCategory);

  return (
    <section className="skills section-wrapper" id={sectionId}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Technical Competencies</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            A comprehensive overview of my tech stack, engineering disciplines, and modern web development proficiencies.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="skills__tabs" role="tablist" aria-label="Skill categories">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={activeCategory === category.id}
              className={`skills__tab-btn ${activeCategory === category.id ? 'skills__tab-btn--active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="skills__grid">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
