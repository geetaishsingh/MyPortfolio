import React from "react";
import {
  Award,
  Code2,
  HeartHandshake,
  MapPin,
  Rocket,
  Sparkles,
} from "lucide-react";
import { personalData } from "../../data/personal.js";
import SectionTitle from "../common/SectionTitle/SectionTitle.jsx";
import heroWebp from "../../assets/images/hero2.webp";
import "./About.scss";

const bio = [
  <>
    I am a dedicated Web Developer based in India with a strong focus on modern
    frontend technologies, particularly <strong>React</strong>,{" "}
    <strong>JavaScript (ES6+)</strong>, and <strong>SCSS/Sass</strong>. I take
    pride in translating complex concepts into elegant, performant, and
    intuitive user interfaces.
  </>,
  <>
    My approach blends technical precision with modern design sensibilities:
    modular folder structures, strict separation of responsive styles,
    accessibility-first semantics, and tasteful interactive animations.
  </>,
  <>
    Whether building full single-page applications, architecting responsive
    component design systems, or coding interactive mini-games, I am committed
    to continuous growth, clean codebase maintainability, and delivering value
    through software.
  </>,
];

const principles = [
  {
    icon: <Code2 size={24} />,
    title: "Component Architecture",
    description:
      "Designing modular, reusable, and maintainable component hierarchies with single responsibility.",
  },
  {
    icon: <Rocket size={24} />,
    title: "Responsive & Accessible",
    description:
      "Building mobile-first, semantic interfaces that feel fluid across screens from 320px to 4K.",
  },
  {
    icon: <Award size={24} />,
    title: "Performance & Styling",
    description:
      "Structuring clean Sass/SCSS with zero runtime bloat, minimal repaints, and smooth GSAP choreography.",
  },
  {
    icon: <HeartHandshake size={24} />,
    title: "Continuous Innovation",
    description:
      "Staying curious, exploring bleeding-edge web standards, and building interactive web experiences.",
  },
];

const About = ({ sectionId = "about" }) => (
  <section className="about section" id={sectionId}>
    <div className="container">
      <SectionTitle
        badge="About Me"
        title="Driven by Quality & Modern Web Architecture"
        subtitle="A developer passionate about crafting seamless digital experiences with clean code and thoughtful design."
      />

      <div className="about__story-grid">
        <div className="about__photo-card">
          <div className="about__photo-frame">
            <img
              src={heroWebp}
              alt={personalData.name}
              className="about__photo-img"
              width="1254"
              height="1254"
              loading="lazy"
              decoding="async"
            />
            <div className="about__photo-badge">
              <Sparkles size={16} />
              <span>2+ Years of Coding Passion</span>
            </div>
          </div>

          <div className="about__photo-info">
            <h3 className="about__photo-name">{personalData.name}</h3>
            <p className="about__photo-role">
              <MapPin size={15} />
              <span>Web Developer &bull; Based in {personalData.location}</span>
            </p>
          </div>
        </div>

        <div className="about__bio-card">
          <div className="about__bio-header">
            <span className="about__bio-tag">Hello, I’m Geetaish Singh</span>
            <h3 className="about__bio-title">About Me</h3>
          </div>

          <div className="about__bio-paragraphs">
            {bio.map((paragraph, index) => (
              <p key={index} className="about__bio-text">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="about__cta-row">
            <a href="#contact" className="about__cta-btn">
              Let&apos;s Work Together
            </a>
            <a
              href="/Geetaish.pdf"
              download="Geetaish.pdf"
              className="hero__btn-primary"
            >
              View My Resume (PDF) →
            </a>
          </div>
        </div>
      </div>

      <div className="about__metrics-strip">
        {personalData.stats.map((stat) => (
          <div key={stat.label} className="about__metric-item">
            <span className="about__metric-value">{stat.value}</span>
            <span className="about__metric-label">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="about__pillars">
        <div className="about__pillars-header">
          <h4 className="about__pillars-title">Core Engineering Principles</h4>
          <div className="about__pillars-line" />
        </div>
        <div className="about__pillars-grid">
          {principles.map((principle) => (
            <div key={principle.title} className="about__pillar-card">
              <div className="about__pillar-icon">{principle.icon}</div>
              <div className="about__pillar-body">
                <h5 className="about__pillar-heading">{principle.title}</h5>
                <p className="about__pillar-desc">{principle.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default About;
