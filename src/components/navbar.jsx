import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const whatsappUrl = 'https://wa.me/917006267930';
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/packages', label: 'Packages' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-nav">
        <div className="navbar__inner container">
          <Link to="/" className="navbar__brand" id="nav-logo">
            <img className="navbar__logo-img" src="/logo.png" alt="Lal Ded logo" />
            <span className="navbar__logo-text">Lal Ded</span>
          </Link>

          <div className="navbar__links" id="nav-links-desktop">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                id={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
                <span className="navbar__link-indicator" />
              </Link>
            ))}
          </div>

          <div className="navbar__actions" style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <button onClick={toggleTheme} className="navbar__theme-toggle" aria-label="Toggle Theme">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            
            <Link to="/contact" className="navbar__cta btn btn-primary btn-sm" id="nav-cta-book">
              Book Now
            </Link>
          </div>

          <button
            className={`navbar__hamburger ${isOpen ? 'navbar__hamburger--active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            id="nav-hamburger"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile Drawer */}
        <div className={`navbar__drawer ${isOpen ? 'navbar__drawer--open' : ''}`} id="nav-mobile-drawer">
          <div className="navbar__drawer-content">
            {navLinks.map((link, i) => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar__drawer-link ${location.pathname === link.path ? 'navbar__drawer-link--active' : ''}`}
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                id={`nav-mobile-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="btn btn-primary navbar__drawer-cta" id="nav-mobile-cta">
              Book Now
            </Link>
          </div>
        </div>
        {isOpen && <div className="navbar__overlay" onClick={() => setIsOpen(false)} />}
      </nav>

      {/* Bottom Navigation (Mobile) */}
      <nav className="bottom-nav">
        <div className="bottom-nav__inner">
          <Link 
            to="/" 
            className={`bottom-nav__item ${location.pathname === '/' ? 'bottom-nav__item--active' : ''}`}
          >
            <span className="bottom-nav__icon">🏠</span>
            <span className="bottom-nav__label">Home</span>
          </Link>
          <Link 
            to="/packages" 
            className={`bottom-nav__item ${location.pathname === '/packages' ? 'bottom-nav__item--active' : ''}`}
          >
            <span className="bottom-nav__icon">🧳</span>
            <span className="bottom-nav__label">Packages</span>
          </Link>
          <Link 
            to="/contact" 
            className={`bottom-nav__item ${location.pathname === '/contact' ? 'bottom-nav__item--active' : ''}`}
          >
            <span className="bottom-nav__icon">💬</span>
            <span className="bottom-nav__label">Contact</span>
          </Link>
          <Link 
            to="/about" 
            className={`bottom-nav__item ${location.pathname === '/about' ? 'bottom-nav__item--active' : ''}`}
          >
            <span className="bottom-nav__icon">👤</span>
            <span className="bottom-nav__label">About</span>
          </Link>
        </div>
      </nav>

      {/* FAB */}
      <a
        href={whatsappUrl}
        className="fab"
        aria-label="Open WhatsApp chat"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="fab__icon">💬</span>
      </a>
    </>
  );
}
