import React from 'react';
import './Button.scss';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  icon,
  iconPosition = 'right',
  type = 'button',
  disabled = false,
  className = '',
  target,
  rel,
  download
}) => {
  const buttonClasses = `btn btn--${variant} btn--${size} ${className}`.trim();

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="btn__icon btn__icon--left">{icon}</span>}
      <span className="btn__text">{children}</span>
      {icon && iconPosition === 'right' && <span className="btn__icon btn__icon--right">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        download={download}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
};

export default Button;
