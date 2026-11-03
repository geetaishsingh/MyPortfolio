import './SkillCard.scss';
import './SkillCard.media.scss';

export default function SkillCard({ skill }) {
  const { name, icon, level, description } = skill;
  const levelClass = level.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="skill-card">
      <div className="skill-card__header">
        <div className="skill-card__icon-box">
          <img
            src={icon}
            alt={`${name} logo`}
            className="skill-card__icon"
            width="32"
            height="32"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="skill-card__title-wrap">
          <h3 className="skill-card__name">{name}</h3>
          <span className={`skill-card__level-badge skill-card__level-badge--${levelClass}`}>
            {level}
          </span>
        </div>
      </div>

      <p className="skill-card__description">{description}</p>

    </div>
  );
}
