import {
  Code2,
  GraduationCap,
  Briefcase,
  Monitor,
  Palette,
  RotateCw,
  Database,
  Settings,
  ArrowRight,
} from 'lucide-react';
import { servicesData } from '../../data/services';
import './Services.scss';
import './Services.media.scss';

const iconMap = {
  Code2,
  GraduationCap,
  Briefcase,
  Monitor,
  Palette,
  RotateCw,
  Database,
  Settings,
};

export default function Services({ sectionId = 'services' }) {
  const handleServiceClick = (service) => {
    // Smooth scroll to contact section
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      const headerOffset = 80;
      const top = contactEl.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }

    // Dispatch event to pre-populate subject in ContactForm
    window.dispatchEvent(
      new CustomEvent('service-selected', {
        detail: { serviceTitle: service.title },
      })
    );
  };

  return (
    <section className="services section-wrapper" id={sectionId}>
      <div className="container">
        {/* Section Header */}
        <div className="services__header">
          <span className="services__badge">MY SERVICES</span>
          <h2 className="services__title">
            What I Can Do <span className="services__title-accent">For You</span>
          </h2>
          <p className="services__subtitle">
            I provide complete web development solutions from simple websites to complex web
            applications, tailored to your needs.
          </p>
        </div>

        {/* Services 4x2 Grid */}
        <div className="services__grid">
          {servicesData.map((service) => {
            const IconComponent = iconMap[service.icon] || Code2;

            return (
              <div
                key={service.id}
                className={`services__card services__card--${service.color}`}
                onClick={() => handleServiceClick(service)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleServiceClick(service);
                  }
                }}
                aria-label={`${service.title} - Click to inquire`}
              >
                <div className="services__card-top">
                  <div
                    className={`services__icon-box services__icon-box--${service.color}`}
                    aria-hidden="true"
                  >
                    <IconComponent className="services__icon" size={22} strokeWidth={2.2} />
                  </div>
                  <h3 className="services__card-title">{service.title}</h3>
                </div>

                <div className="services__card-bottom">
                  <p className="services__card-description">{service.description}</p>
                  <div className="services__arrow-btn" aria-hidden="true">
                    <ArrowRight size={16} strokeWidth={2.2} className="services__arrow-icon" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
