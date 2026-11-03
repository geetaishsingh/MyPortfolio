import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import logoImg from '../../assets/images/logo.png';
import logoWebp from '../../assets/images/logo.webp';
import darkLogoImg from '../../assets/images/logo-dark.png';
import darkLogoWebp from '../../assets/images/logo-dark.webp';
import './Header.scss';
import './Header.media.scss';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { label: 'Services', targetId: 'services' },
    { label: 'Skills', targetId: 'skills' },
    { label: 'Projects', targetId: 'projects' },
    { label: 'Education', targetId: 'education' },
    { label: 'Contact', targetId: 'contact' },
  ];

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${targetId}`);
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__container">
        <Link to="/" className="header__brand" aria-label="Geetaish Singh Portfolio">
          <picture className="header__logo-picture">
            <source srcSet={logoWebp} type="image/webp" />
            <img
              src={logoImg}
              alt="Geetaish Logo"
              className="header__logo"
              width="965"
              height="336"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
          <picture className="header__logo-picture header__logo-picture--dark">
            <source srcSet={darkLogoWebp} type="image/webp" />
            <img
              src={darkLogoImg}
              alt=""
              aria-hidden="true"
              className="header__logo"
              width="965"
              height="322"
              fetchPriority="high"
              decoding="async"
            />
          </picture>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header__nav" aria-label="Main Navigation">
          <ul className="header__list">
            <li>
              <Link
                to="/"
                className={`header__link ${location.pathname === '/' ? 'header__link--active' : ''}`}
                onClick={(e) => {
                  if (location.pathname === '/') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                Home
              </Link>
            </li>
            {navItems.map((item) => (
              <li key={item.targetId}>
                <a
                  href={`#${item.targetId}`}
                  className="header__link"
                  onClick={(e) => handleNavClick(e, item.targetId)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions (Games link, Theme toggle, CTA) */}
        <div className="header__actions">
          <Link
            to="/games"
            className={`header__games-btn ${location.pathname === '/games' ? 'header__games-btn--active' : ''}`}
            title="Play Interactive Games"
          >
            <span className="header__games-icon" aria-hidden="true"><Gamepad2 size={16} /></span>
            <span>Games Arcade</span>
          </Link>

          <ThemeToggle />

          <a
            href="#contact"
            className="header__cta-btn"
            onClick={(e) => handleNavClick(e, 'contact')}
          >
            Hire Me
          </a>

          {/* Mobile menu toggle button */}
          <button
            type="button"
            className={`header__hamburger ${isMobileMenuOpen ? 'header__hamburger--open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="header__hamburger-bar"></span>
            <span className="header__hamburger-bar"></span>
            <span className="header__hamburger-bar"></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`header__mobile-menu ${isMobileMenuOpen ? 'header__mobile-menu--open' : ''}`}>
        <ul className="header__mobile-list">
          <li>
            <Link
              to="/"
              className="header__mobile-link"
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Home
            </Link>
          </li>
          {navItems.map((item) => (
            <li key={item.targetId}>
              <a
                href={`#${item.targetId}`}
                className="header__mobile-link"
                onClick={(e) => handleNavClick(e, item.targetId)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/games"
              className="header__mobile-link header__mobile-link--games"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="header__games-icon" aria-hidden="true"><Gamepad2 size={16} /></span>
              <span>Games Arcade</span>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
