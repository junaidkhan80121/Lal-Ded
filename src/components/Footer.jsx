import { Link } from 'react-router-dom';
import './FooterNew.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id="site-footer">
      <div className="footer__glow" />
      <div className="container">
        <div className="footer__grid">
          {/* Brand Column */}
          <div className="footer__col footer__brand-col">
            <Link to="/" className="footer__brand">
              <img className="footer__logo-img" src="/logo.png" alt="Lal Ded" />
              <span className="footer__logo-text logo-text">Lal Ded</span>
            </Link>
            <p className="footer__description">
              Your trusted travel partner for exploring the breathtaking beauty of Kashmir.
              Creating unforgettable journeys since 2022.
            </p>
            <div className="footer__socials">
              <a href="https://www.instagram.com/wani_handicrafts" target="_blank" rel="noopener noreferrer" className="footer__social-link" id="footer-instagram" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.facebook.com/ahsan.wani.982" target="_blank" rel="noopener noreferrer" className="footer__social-link" id="footer-facebook" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="mailto:ahsanamin1994@gmail.com" className="footer__social-link" id="footer-email" aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__col-title">Quick Links</h4>
            <div className="footer__links">
              <Link to="/" className="footer__link" id="footer-link-home">Home</Link>
              <Link to="/packages" className="footer__link" id="footer-link-packages">Packages</Link>
              <Link to="/about" className="footer__link" id="footer-link-about">About Us</Link>
              <Link to="/contact" className="footer__link" id="footer-link-contact">Contact</Link>
            </div>
          </div>

          {/* Destinations */}
          <div className="footer__col">
            <h4 className="footer__col-title">Destinations</h4>
            <div className="footer__links">
              <Link to="/packages" className="footer__link">Gulmarg</Link>
              <Link to="/packages" className="footer__link">Sonamarg</Link>
              <Link to="/packages" className="footer__link">Pahalgam</Link>
              <Link to="/packages" className="footer__link">Dal Lake</Link>
              <Link to="/packages" className="footer__link">Yusmarg</Link>
              <Link to="/packages" className="footer__link">Doodhpathri</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer__col">
            <h4 className="footer__col-title">Get in Touch</h4>
            <div className="footer__contact-items">
              <a href="mailto:ahsanamin1994@gmail.com" className="footer__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>AhsanAmin1994@gmail.com</span>
              </a>
              <a href="tel:+917006267930" className="footer__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>+91 7006267930</span>
              </a>
              <div className="footer__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Bhagwanpora, Noorbagh,<br/>Srinagar, J&K — 190001</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {currentYear} Lal Ded Tour & Travels. All rights reserved.</p>
          <p className="footer__tagline">Crafted with ❤️ in Kashmir</p>
        </div>
      </div>
    </footer>
  );
}
