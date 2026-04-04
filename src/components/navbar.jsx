import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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

        <Link to="/contact" className="navbar__cta btn btn-primary btn-sm" id="nav-cta-book">
          Book Now
        </Link>

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