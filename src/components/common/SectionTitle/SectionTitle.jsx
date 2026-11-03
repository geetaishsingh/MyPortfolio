import React from 'react';
import './SectionTitle.scss';

const SectionTitle = ({
  badge,
  title,
  subtitle,
  align = 'center',
  className = ''
}) => {
  return (
    <div className={`section-header section-header--${align} ${className}`}>
      {badge && <span className="section-header__badge">{badge}</span>}
      <h2 className="section-header__title">{title}</h2>
      {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
      <div className="section-header__line" />
    </div>
  );
};

export default SectionTitle;
