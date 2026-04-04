import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
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
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} id="main-nav">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand" id="nav-logo">
          <img className="navbar__logo-img" src="/logo.png" alt="Lal Ded logo" />
          <span className="navbar__logo-text logo-text">Lal Ded</span>
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

        <div className="navbar__actions" style={{display: 'flex', alignItems: 'center', gap: '0.8rem'}}>
          <button onClick={toggleTheme} className="navbar__theme-toggle" aria-label="Toggle Theme">
            {theme === 'dark' ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
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
  );
}