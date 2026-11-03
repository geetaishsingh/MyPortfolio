import ContactForm from '../../components/ContactForm/ContactForm';
import { Github, Instagram, Linkedin } from 'lucide-react';
import './Contact.scss';
import './Contact.media.scss';

export default function Contact({ sectionId = 'contact' }) {
  return (
    <section className="contact section-wrapper" id={sectionId}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">Let's Build Something Exceptional</h2>
          <p className="section-subtitle">
            Have an opportunity, project proposal, or question? Feel free to reach out directly.
          </p>
        </div>

        <div className="contact__grid">
          {/* Contact Details (Left) */}
          <div className="contact__info-panel">
            <h3 className="contact__info-title">Contact Information</h3>
            <p className="contact__info-desc">
              I'm always open to discussing new projects, frontend engineering roles, freelance collaborations, or creative web ideas.
            </p>

            <div className="contact__items">
              <div className="contact__item">
                <div className="contact__item-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <span className="contact__item-label">Direct Email</span>
                  <a href="mailto:geetaishsinghrajput@gmail.com" className="contact__item-value">
                    geetaishsinghrajput@gmail.com
                  </a>
                </div>
              </div>

              <div className="contact__item">
                <div className="contact__item-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <span className="contact__item-label">Location</span>
                  <span className="contact__item-value">India (Available Globally & Remotely)</span>
                </div>
              </div>

              <div className="contact__item">
                <div className="contact__item-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div>
                  <span className="contact__item-label">Status</span>
                  <span className="contact__item-value">Available for Projects & Hiring</span>
                </div>
              </div>
            </div>

            <div className="contact__social-wrap">
              <span className="contact__social-title">Follow & Connect</span>
              <div className="contact__social-icons">
                <a
                  href="https://github.com/geetaishsingh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-link"
                  aria-label="GitHub Profile"
                >
                  <Github size={18} aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/in/geetaishsingh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-link"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={18} aria-hidden="true" />
                </a>
                <a
                  href="https://www.instagram.com/geetaishsinghrajput?igsh=MW5sZGVnYTNsazF3bw%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-link"
                  aria-label="Instagram Profile"
                >
                  <Instagram size={18} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form (Right) */}
          <div className="contact__form-panel">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
