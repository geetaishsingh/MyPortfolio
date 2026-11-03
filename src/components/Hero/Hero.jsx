import { ArrowRight, Github, Instagram, Linkedin } from 'lucide-react';
import heroWebp from '../../assets/images/hero.webp';
import { tickerSkills } from '../../data/tickerSkills';
import './Hero.scss';
import './Hero.media.scss';

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero__grid">
          {/* Profile Card (Left) */}
          <div className="hero__profile-card">
            <div className="hero__profile-img-wrap">
              <img
                src={heroWebp}
                alt="Geetaish Singh"
                className="hero__profile-img"
                width="1297"
                height="1213"
                fetchPriority="high"
                decoding="async"
              />
            </div>

            <h2 className="hero__profile-name">Geetaish Singh</h2>
            <p className="hero__profile-role">Web Developer based in India</p>

            <div className="hero__socials">
              <a
                href="https://github.com/geetaishsingh"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-link"
                aria-label="GitHub Profile"
              >
                <Github size={20} aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/in/geetaishsingh"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-link"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/geetaishsinghrajput?psln=MW5sZGVnYTNsazF3bw%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-link"
                aria-label="Instagram Profile"
              >
                <Instagram size={20} aria-hidden="true" />
              </a>
              <a
                href="mailto:geetaishsinghrajput@gmail.com"
                className="hero__social-link"
                aria-label="Email Geetaish Singh"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </div>
          </div>

          {/* Hero Content (Right) */}
          <div className="hero__content">
            <div className="hero__greeting-badge">
              <span className="hero__greeting-wave">👋</span>
              <span>Hello There!</span>
            </div>

            <h1 className="hero__heading">
              I’m <span className="stroke-text">Geetaish Singh</span>, a web developer crafting{' '}
              <span className="text-gradient">modern &amp; responsive</span> web experiences.
            </h1>

            <div className="hero__availability">
              <span className="hero__status-dot"></span>
              <span>Available for Freelancing & Full-Time Opportunities</span>
            </div>

            <p className="hero__lead">
              Specialized in modern React ecosystems, performance-optimized Sass architectures, and user-first digital products.
            </p>

            <div className="hero__actions">
              <a href="/Geetaish.pdf" download="Geetaish-CV.pdf" className="hero__btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Download CV</span>
              </a>

              <a href="#projects" className="hero__btn-secondary">
                <ArrowRight size={18} aria-hidden="true" />
                View Projects
              </a>
            </div>
          </div>
        </div>

        <div className="hero__ticker">
          <div className="hero__ticker-header">
            <span className="hero__ticker-pill">Continuous Stack</span>
            <span className="hero__ticker-title">Core Technologies &amp; Tools</span>
            <span className="hero__ticker-count">{tickerSkills.length} Technologies</span>
          </div>
          <div className="hero__ticker-viewport">
            <div className="hero__ticker-track">
              <div className="hero__ticker-group">
                {tickerSkills.map((tech, index) => (
                  <div
                    key={`track1-${tech.name}-${index}`}
                    className="hero__ticker-item"
                    style={{ '--brand-color': tech.color || '#2dd4bf' }}
                  >
                    <div className="hero__ticker-icon-box">
                      <img src={tech.icon} alt={tech.name} className="hero__ticker-icon" />
                    </div>
                    <span className="hero__ticker-label">{tech.name}</span>
                  </div>
                ))}
              </div>
              <div className="hero__ticker-group" aria-hidden="true">
                {tickerSkills.map((tech, index) => (
                  <div
                    key={`track2-${tech.name}-${index}`}
                    className="hero__ticker-item"
                    style={{ '--brand-color': tech.color || '#2dd4bf' }}
                  >
                    <div className="hero__ticker-icon-box">
                      <img src={tech.icon} alt="" className="hero__ticker-icon" />
                    </div>
                    <span className="hero__ticker-label">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
