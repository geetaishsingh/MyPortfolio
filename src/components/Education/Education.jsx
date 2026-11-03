import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { degrees, certificates } from '../../data/education.js';
import SectionTitle from '../common/SectionTitle/SectionTitle.jsx';
import Modal from '../common/Modal/Modal.jsx';
import Button from '../common/Button/Button.jsx';
import './Education.scss';

const Education = ({ sectionId = 'education' }) => {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'degrees' | 'certificates'
  const [selectedCert, setSelectedCert] = useState(null);

  const showDegrees = activeTab === 'all' || activeTab === 'degrees';
  const showCertificates = activeTab === 'all' || activeTab === 'certificates';

  return (
    <section className="education section" id={sectionId}>
      <div className="container">
        <SectionTitle
          badge="Credentials"
          title="Education & Certificates"
          subtitle="Academic milestones, formal computer science degrees, and industry-recognized certifications."
        />

        {/* Category Tabs */}
        <div className="education__tabs">
          <button
            className={`education__tab-btn ${activeTab === 'all' ? 'education__tab-btn--active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <Sparkles size={16} />
            <span>All Credentials</span>
          </button>
          <button
            className={`education__tab-btn ${activeTab === 'degrees' ? 'education__tab-btn--active' : ''}`}
            onClick={() => setActiveTab('degrees')}
          >
            <GraduationCap size={16} />
            <span>Academic Degrees ({degrees.length})</span>
          </button>
          <button
            className={`education__tab-btn ${activeTab === 'certificates' ? 'education__tab-btn--active' : ''}`}
            onClick={() => setActiveTab('certificates')}
          >
            <Award size={16} />
            <span>Certifications ({certificates.length})</span>
          </button>
        </div>

        <div className="education__layout">
          {/* Column 1: Degrees Timeline */}
          {showDegrees && (
            <div className="education__column education__column--degrees">
              <div className="education__column-header">
                <div className="education__column-icon">
                  <GraduationCap size={22} />
                </div>
                <div>
                  <h3 className="education__column-title">Academic Background</h3>
                  <p className="education__column-desc">Formal university education &amp; foundational studies</p>
                </div>
              </div>

              <div className="education__timeline">
                {degrees.map((item) => (
                  <div key={item.id} className="education__timeline-item">
                    <div className="education__timeline-dot" />
                    <div className="education__degree-card">
                      <div className="education__degree-top">
                        <span className="education__badge-period">
                          <Calendar size={13} />
                          <span>{item.period}</span>
                        </span>
                        <span className="education__badge-location">
                          <MapPin size={13} />
                          <span>{item.location}</span>
                        </span>
                      </div>

                      <h4 className="education__degree-title">{item.degree}</h4>
                      <p className="education__degree-institution">{item.institution}</p>
                      <p className="education__degree-desc">{item.description}</p>

                      {item.highlights && item.highlights.length > 0 && (
                        <ul className="education__highlights-list">
                          {item.highlights.map((hl, i) => (
                            <li key={i} className="education__highlight-bullet">
                              <CheckCircle2 size={14} className="education__check-icon" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Column 2: Certificates */}
          {showCertificates && (
            <div className="education__column education__column--certs">
              <div className="education__column-header">
                <div className="education__column-icon education__column-icon--cert">
                  <Award size={22} />
                </div>
                <div>
                  <h3 className="education__column-title">Certifications &amp; Licenses</h3>
                  <p className="education__column-desc">Verified technical specializations &amp; coursework</p>
                </div>
              </div>

              <div className="education__certs-container education__certs-container--grid">
                {certificates.map((cert) => (
                  <article
                    key={cert.id}
                    className="education__cert-card"
                  >
                    <div className="education__cert-preview-box">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="education__cert-image"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="education__cert-overlay">
                        <span>View credential below</span>
                      </div>
                    </div>

                    <div className="education__cert-info">
                      <div className="education__cert-header-row">
                        <span className="education__cert-id">
                          <ShieldCheck size={13} />
                          <span>{cert.credentialId}</span>
                        </span>
                        <span className="education__cert-date">{cert.issueDate}</span>
                      </div>

                      <h4 className="education__cert-title">{cert.title}</h4>
                      <p className="education__cert-issuer">{cert.issuer}</p>

                      <div className="education__cert-skills">
                        {cert.skills.map((skill) => (
                          <span key={skill} className="education__cert-pill">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="education__cert-action-bar">
                        <button
                          type="button"
                          className="education__cert-view-btn"
                          aria-label={`View full credential: ${cert.title}`}
                          onClick={() => setSelectedCert(cert)}
                        >
                          <span>View Full Credential</span>
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Certificate Inspection Modal */}
        <Modal
          isOpen={Boolean(selectedCert)}
          onClose={() => setSelectedCert(null)}
          title={selectedCert ? selectedCert.title : 'Certificate Preview'}
        >
          {selectedCert && (
            <div className="education__modal-inner">
              <div className="education__modal-image-wrapper">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="education__modal-image"
                />
              </div>

              <div className="education__modal-details">
                <div className="education__modal-badge-row">
                  <span className="education__modal-badge">
                    <ShieldCheck size={14} />
                    <span>Credential ID: {selectedCert.credentialId}</span>
                  </span>
                  <span className="education__modal-date">
                    Issued: {selectedCert.issueDate}
                  </span>
                </div>

                <p className="education__modal-desc">{selectedCert.description}</p>

                <div className="education__modal-tags">
                  {selectedCert.skills.map((skill) => (
                    <span key={skill} className="education__modal-skill">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="education__modal-actions">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => setSelectedCert(null)}
                  >
                    Close Preview
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
};

export default Education;
